from rest_framework import viewsets
#  from rest_framework.views import APIView
from rest_framework.response import Response
from restapi import flatserializers
from core.models import Product, ProductImage, Category, PropertyType, PropertyValue
from cart.models import CartItem, Order, Delivery
from configs.models import Config
#  from configs.methods import get_site_config
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from restapi import permissions as restapi_permissions
from cart import utils as cartutils


class ConfigViewSet(viewsets.ModelViewSet):
    queryset = Config.objects.all()
    serializer_class = flatserializers.ConfigObj


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


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = flatserializers.CategoryObj


class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = CartItem.objects.all()
    serializer_class = flatserializers.CartItemObj

    def create(self, request):
        data = request.data
        try:
            cartitem = CartItem.objects.get(
                product_id=data['product'],
                property_id=data['property'],
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


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = flatserializers.OrderObj


class DeliveryViewSet(viewsets.ModelViewSet):
    permission_classes = (restapi_permissions.IsCartIdOwnerOrReadOnly,)
    queryset = Delivery.objects.all()
    serializer_class = flatserializers.DeliveryObj

    def get_queryset(self):
        return Delivery.objects.filter(cart_id=cartutils.set_cart_id(self.request))


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (restapi_permissions.IsUserOwner, )
    queryset = User.objects.all()
    serializer_class = flatserializers.UserObj

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
