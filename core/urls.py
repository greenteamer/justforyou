from django.conf.urls import url
import core.views as views


urlpatterns = [
    url(r'^$', views.index_view, name="home"),
    url(r'^catalog/(?P<slug>[-\w]+)/$', views.catalog_view, name="catalog"),
    url(r'^catalog/(?P<categorySlug>[-\w]+)/(?P<slug>[-\w]+)/$', views.product_view, name="product_view"),
]
