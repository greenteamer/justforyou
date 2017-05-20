from django.conf.urls import url, include
from django.contrib import admin
from project import settings
from django.conf.urls.static import static
from cart import views as cartviews
from core import views as coreviews
from rest_framework import routers
from restapi import views as viewsets
from django.contrib.sitemaps.views import sitemap
from project.sitemap import ProductSitemap, CategorySitemap, IndexSitemap, PageSitemap, ArticleSitemap, NewsSitemap


sitemaps = {
    "products": ProductSitemap,
    "category": CategorySitemap,
    "index": IndexSitemap,
    "page": PageSitemap,
    "article": ArticleSitemap,
    "news": NewsSitemap,
}

handler404 = 'core.views.page_not_found_view'

admin.autodiscover()

router = routers.DefaultRouter()
router.register(r'configs', viewsets.ConfigViewSet)
#  router.register(r'site-phones', viewsets.SitePhoneViewSet)
router.register(r'users', viewsets.UserViewSet)
router.register(r'products', viewsets.ProductViewSet)
router.register(r'images', viewsets.ProductImagesViewSet)
router.register(r'categories', viewsets.CategoryViewSet)
router.register(r'cartitems', viewsets.CartItemViewSet)
router.register(r'orders', viewsets.OrderViewSet)
router.register(r'deliveries', viewsets.DeliveryViewSet)
router.register(r'property-types', viewsets.PropertyTypeViewSet)
router.register(r'properties', viewsets.PropertiesViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    # url(r'^api/v1/add-to-cart/$', viewsets.ajax_cart, name='add-to-cart'),
    url(r'^', include('core.urls')),
    url(r'^', include('cart.urls')),
    url(r'^pages/', include('django.contrib.flatpages.urls')),
    url(r'^robokassa/fail/$', cartviews.fail_views, name="fail"),
    url(r'^robokassa/success/$', cartviews.success_views, name="success"),
    url(r'^robokassa/', include('robokassa.urls')),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^robots.txt$', coreviews.robots_view),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
