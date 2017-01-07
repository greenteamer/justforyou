from django.shortcuts import render, HttpResponse
from core import models
from django.views.decorators.csrf import csrf_exempt
from cart import utils as cartutils
# Create your views here.


def index_view(request, template_name='core/index.html'):
    products = models.Product.objects.all()
    return render(request, template_name, {
        "products": products,
    })
