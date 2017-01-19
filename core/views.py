from django.shortcuts import render, get_object_or_404
from core import models
# Create your views here.


def index_view(request, template_name='core/index.html'):
    products = models.Product.objects.all()
    return render(request, template_name, {
        "products": products,
    })


def catalog_view(request, slug, template_name='core/index.html'):
    category = get_object_or_404(models.Category, slug=slug)
    products = models.Product.objects.filter(category=category)
    return render(request, template_name, {
        "products": products,
    })


def product_view(request, catalogSlug, slug, template_name='core/index.html'):
    category = get_object_or_404(models.Category, slug=catalogSlug)
    product = get_object_or_404(models.Product, category=category, slug=slug)
    return render(request, template_name, {
        "category": category,
        "product": product,
    })
