from configs.models import Config
from core import models
from cart import models as cartmodels
from restapi.flatserializers import ProductObj, ProductImageObj, UserObj, PropertyTypeObj, PropertyValueObj, CategoryObj, CartItemObj, DeliveryObj, ConfigObj
from rest_framework.renderers import JSONRenderer
from django.utils.safestring import SafeString
#  from configs.methods import get_site_config


def get_initial_json_data(request):

    configs = Config.objects.all()
    images = models.ProductImage.objects.all()
    types = models.PropertyType.objects.all()
    properties = models.PropertyValue.objects.all()
    categories = models.Category.objects.all()
    products = models.Product.objects.all()
    cartitems = cartmodels.CartItem.objects.all()
    deliveries = cartmodels.Delivery.objects.all()

    if request.user.is_authenticated:
        s_user = UserObj(request.user, context={"request": request})
        user_data = s_user.data
    else:
        user_data = None
    configs_sz = ConfigObj(configs, many=True, context={"request": request})
    images_sz = ProductImageObj(images, many=True, context={"request": request})
    types_sz = PropertyTypeObj(types, many=True, context={"request": request})
    properties_sz = PropertyValueObj(properties, many=True, context={"request": request})
    categories_sz = CategoryObj(categories, many=True, context={"request": request})
    products_sz = ProductObj(products, many=True, context={"request": request})
    cartitems_sz = CartItemObj(cartitems, many=True, context={"request": request})
    deliveries_sz = DeliveryObj(deliveries, many=True, context={"request": request})
    initial_data = JSONRenderer().render({
        "configs": configs_sz.data,
        "user": user_data,
        "images": images_sz.data,
        "types": types_sz.data,
        "properties": properties_sz.data,
        "categories": categories_sz.data,
        "products": products_sz.data,
        "cartitems": cartitems_sz.data,
        "deliveries": deliveries_sz.data,
    })
    return SafeString(initial_data)
