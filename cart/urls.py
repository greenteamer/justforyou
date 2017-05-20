from django.conf.urls import url
import cart.views as views


urlpatterns = [
    url(r'^cart/$', views.cart_view, name="cart_view"),
    url(r'^order/$', views.order_view, name="order_view"),
    url(r'^order-success/$', views.success_views, name="success_views"),
]
