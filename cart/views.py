# -*- coding: utf-8 -*-
from django.shortcuts import render
from cart import utils
from cart.models import CartItem, Delivery, Order
from robokassa.forms import RobokassaForm
from robokassa.signals import result_received


def cart_view(request, template_name='cart/cart.html'):
    request.breadcrumbs([(u'Корзина', '')])
    return render(request, template_name, {})


def order_view(request, template_name='cart/order.html'):
    request.breadcrumbs([(u'Корзина', '/cart/'), (u'Оформление заказа', '')])
    cart_id = utils.set_cart_id(request)
    cart_items = CartItem.objects.filter(cart_id=cart_id)
    items_price = 0
    for item in cart_items:
        items_price = items_price + item.total_price()
    delivery = None
    delivery_list = Delivery.objects.values()
    for item in delivery_list:
        if item["cart_id"] == cart_id:
            delivery = item
            unrestricted_address = Delivery.objects.get(cart_id=cart_id).get_unrestricted_address()
            items_price = items_price + delivery["price"]

    try:
        order = Order()
        order.price = items_price
        order.cart_id = cart_id
        order.save()
    except Exception:
        order = Order.objects.get(cart_id=cart_id)
        order.price = items_price
        order.cart_id = cart_id
        order.save()

    form = RobokassaForm(initial={
        'OutSum': order.price,
        'InvId': order.id,
        #  'Desc': order.name,
        #  'Email': request.user.email,
    })
    return render(request, template_name, {
        "cart_items": cart_items,
        "items_price": items_price,
        "delivery": delivery,
        "unrestricted_address": unrestricted_address,
        "form": form,
    })


def success_views(request, template_name="robokassa/success.html"):
    utils.del_session_cart_id(request)
    return render(request, template_name, {})


def fail_views(request, template_name="robokassa/fail.html"):

    return render(request, template_name, {})


def payment_received(sender, **kwargs):
    order = Order.objects.get(id=kwargs['InvId'])
    order.is_paid = True
    order.save()


result_received.connect(payment_received)
