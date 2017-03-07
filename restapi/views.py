from rest_framework import viewsets
from rest_framework.response import Response
from restapi import flatserializers
from core.models import Product, ProductImage, Category, PropertyType, PropertyValue
from cart.models import CartItem, Order, Delivery
from rest_framework.permissions import AllowAny
from restapi import permissions as restapi_permissions
#  from django.shortcuts import HttpResponse
from cart import utils as cartutils
#  import json
#  import ast


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = flatserializers.ProductObj


class ProductImagesViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = flatserializers.ProductImageObj


class PropertyTypeViewSet(viewsets.ModelViewSet):
    queryset = PropertyType.objects.all()
    serializer_class = flatserializers.PropertyTypeObj


class PropertiesViewSet(viewsets.ModelViewSet):
    queryset = PropertyValue.objects.all()
    serializer_class = flatserializers.PropertyValueObj
# class PropertyValueViewSet(viewsets.ModelViewSet):
#     queryset = PropertyValue.objects.all()
#     serializer_class = flatserializers.PropertyValueObj


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = flatserializers.CategoryObj


class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = CartItem.objects.all()
    serializer_class = flatserializers.CartItemObj

    def create(self, request):
        data = request.data
        # cartitem = CartItem.objects.get(product_id=data['product'])
        # cartitem.count = data.count
        # cartitem.save()
        try:
            cartitem = CartItem.objects.get(
                product_id=data['product'],
                property_id=data['property'],
                # cart_id=data['cart_id']
                cart_id=cartutils.set_cart_id(request)
            )
            cartitem.count = data['count']
            cartitem.save()
            data['id'] = cartitem.id
            data['cart_id'] = cartitem.cart_id
        except Exception:
            product = Product.objects.get(id=data['product'])
            try:
                property = PropertyValue.objects.get(id=data['property'])
                cartitem = CartItem(product=product, property=property, count=data['count'], cart_id=cartutils.set_cart_id(request))
            except Exception:
                cartitem = CartItem(product=product, count=data['count'], cart_id=cartutils.set_cart_id(request))
            cartitem.save()
            data['id'] = cartitem.id
            data['cart_id'] = cartitem.cart_id
        return Response({'data': data})


# def ajax_cart(request):
#     data = ast.literal_eval(request.body)
#     # cartitem = CartItem.objects.get(product_id=data['product'])
#     # cartitem.count = data.count
#     # cartitem.save()
#     try:
#         cartitem = CartItem.objects.get(
#             product_id=data['product'],
#             property_id=data['property'],
#             # cart_id=data['cart_id']
#             cart_id=cartutils.set_cart_id(request)
#         )
#         cartitem.count = data['count']
#         cartitem.save()
#         data['id'] = cartitem.id
#     except Exception:
#         product = Product.objects.get(id=data['product'])
#         try:
#             property = PropertyValue.objects.get(id=data['property'])
#             cartitem = CartItem(product=product, property=property, count=data['count'],
#                                 cart_id=cartutils.set_cart_id(request))
#         except Exception:
#             cartitem = CartItem(product=product, count=data['count'], cart_id=cartutils.set_cart_id(request))
#         cartitem.save()
#         data['id'] = cartitem.id
#         # data = json.dumps({
#         #     "count": u"%s" % product.name,
#         # })
#     return HttpResponse(data, content_type="application/json")


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = flatserializers.OrderObj


class DeliveryViewSet(viewsets.ModelViewSet):
    permission_classes = (restapi_permissions.IsCartIdOwnerOrReadOnly,)
    queryset = Delivery.objects.all()
    serializer_class = flatserializers.DeliveryObj

    def get_queryset(self):
        return Delivery.objects.filter(cart_id=cartutils.set_cart_id(self.request))
