# -*- coding: utf-8 -*-
from django.shortcuts import render, get_object_or_404
from core import models
from django.core.mail import send_mail
from project.settings import ADMIN_EMAIL
# Create your views here.


def index_view(request, template_name='core/index.html'):
    products = models.Product.objects.all()
    popularProducts = models.Product.objects.filter(isPopular=True)
    about = get_object_or_404(models.Page, slug="about")
    return render(request, template_name, {
        "about": about,
        "products": products,
        "popularProducts": popularProducts,
    })


def catalog_view(request, slug, template_name='core/index.html'):
    category = get_object_or_404(models.Category, slug=slug)
    request.breadcrumbs([(category.name, category.absoluteUrl)])
    products = models.Product.objects.filter(category=category)
    return render(request, template_name, {
        "products": products,
    })


def product_view(request, categorySlug, slug, template_name='core/product.html'):
    category = get_object_or_404(models.Category, slug=categorySlug)
    product = get_object_or_404(models.Product, category=category, slug=slug)
    attachedProducts = models.Product.objects.filter(attached=product)
    popularProducts = models.Product.objects.filter(isPopular=True)
    request.breadcrumbs([(category.name, category.absoluteUrl), (product.name, product.absoluteUrl)])
    return render(request, template_name, {
        "category": category,
        "product": product,
        "attachedProducts": attachedProducts,
        "popularProducts": popularProducts,
    })


def contact_form(request, template_name='core/contact_form.html'):
    if request.method == 'POST':
        print "**** request.POST: %s" % request.POST
        send_mail(
            u'Заявка на звонок',
            u'Телефон: %s' % request.POST['phone'],
            'teamer777@example.com',
            [ADMIN_EMAIL, ],
            fail_silently=False,
        )
    return render(request, template_name, {})
