from django.shortcuts import render, HttpResponse, get_object_or_404
from core import models
from django.views.decorators.csrf import csrf_exempt
from cart import utils as cartutils
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
