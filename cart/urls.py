from django.conf.urls import url
import cart.views as views


urlpatterns = [
    url(r'^cart/$', views.cart_view, name="cart_view"),
]
