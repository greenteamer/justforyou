# -*- coding: utf-8 -*-
from django.shortcuts import render
from cart import utils
from cart.models import CartItem, Delivery, Order
#  from robokassa.forms import RobokassaForm
from robokassa.signals import result_received
from django.views.decorators.csrf import csrf_exempt
from core.utils import get_initial_json_data
from project.settings import ADMIN_EMAIL
from configs.methods import get_site_config
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import redirect


def cart_view(request, template_name='cart/cart.html'):
    request.breadcrumbs([(u'Корзина', '')])
    initial_data = get_initial_json_data(request)
    return render(request, template_name, {
        "initial_data": initial_data,
    })


def order_view(request, template_name='cart/order.html'):
    request.breadcrumbs([(u'Корзина', '/cart/'), (u'Оформление заказа', '')])
    cart_id = utils.set_cart_id(request)
    print "**** cart_id: {}".format(cart_id)
    cart_items = CartItem.objects.filter(cart_id=cart_id)
    items_price = 0
    for item in cart_items:
        items_price = items_price + item.total_price()
    delivery = None
    delivery_list = Delivery.objects.values()
    print "**** delivery_list: {}".format(delivery_list)
    unrestricted_address = ''
    for delvery_item in delivery_list:
        if delvery_item["cart_id"] == cart_id:
            delivery = delvery_item
            print "**** delivery: {}".format(delivery)
            unrestricted_address = Delivery.objects.get(cart_id=cart_id).get_unrestricted_address()
            #  items_price = items_price + delivery["price"]

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

    #  form = RobokassaForm(initial={
    #      'OutSum': order.price,
    #      'InvId': order.id,
    #      #  'Desc': order.name,
    #      #  'Email': request.user.email,
    #  })
    if request.method == 'POST':
        config = get_site_config(request)
        context_dict = {
            'order': order,
            'config': config,
            'unrestricted_address': unrestricted_address,
            'delivery': delivery,
        }
        send_mail_func('cart/email_order_admin.html', context_dict, config.site_email)
        return redirect('success_views')

    initial_data = get_initial_json_data(request)
    return render(request, template_name, {
        "cart_items": cart_items,
        "items_price": items_price,
        "delivery": delivery,
        "unrestricted_address": unrestricted_address,
        #  "form": form,
        "initial_data": initial_data,
    })


def send_mail_func(template, context_dict, email):
    subject = u'Уведомление JustForYou70.ru'
    message = render_to_string(
        template,
        context_dict,
    )
    msg = EmailMultiAlternatives(subject, message, ADMIN_EMAIL, [email])
    msg.content_subtype = "html"
    msg.send()


def success_views(request, template_name="cart/success.html"):
    utils.del_session_cart_id(request)
    return render(request, template_name, {})

@csrf_exempt
def fail_views(request, template_name="robokassa/fail.html"):

    return render(request, template_name, {})


def payment_received(sender, **kwargs):
    order = Order.objects.get(id=kwargs['InvId'])
    order.is_paid = True
    order.save()


result_received.connect(payment_received)
