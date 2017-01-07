from django.conf.urls import url,include
from django.contrib import admin

# rest
from rest_framework import routers
from restapi import views as viewsets
admin.autodiscover()
router = routers.DefaultRouter()
router.register(r'products', viewsets.ProductViewSet)
router.register(r'images', viewsets.ProductImagesViewSet)
router.register(r'categories', viewsets.CategoryViewSet)
router.register(r'cartitems', viewsets.CartItemViewSet)
router.register(r'orders', viewsets.OrderViewSet)
router.register(r'property-types', viewsets.PropertyTypeViewSet)
router.register(r'properties', viewsets.PropertiesViewSet)

# static
from project import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    # url(r'^api/v1/add-to-cart/$', viewsets.ajax_cart, name='add-to-cart'),
    url(r'^', include('core.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
