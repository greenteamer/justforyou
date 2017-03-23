# -*- coding: utf-8 -*-
from django.shortcuts import render
#  from cart import models


def cart_view(request, template_name='cart/cart.html'):
    request.breadcrumbs([(u'Корзина', '')])
    return render(request, template_name, {})


def order_view(request, template_name='cart/order.html'):
    request.breadcrumbs([(u'Оформление заказа', '')])
    return render(request, template_name, {})
