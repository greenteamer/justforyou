# -*- coding: utf-8 -*-
from django.shortcuts import render, get_object_or_404
#  from cart import models


def cart_view(request, template_name='cart/cart.html'):
    request.breadcrumbs([(u'Корзина', '')])
    return render(request, template_name, {
    })
