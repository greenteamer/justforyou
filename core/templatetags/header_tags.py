# -*- coding: utf-8 -*-
from django import template
from core.models import Category, News
register = template.Library()


def top_menu(context, request):
    return {
        'user': request.user,
        'request': request,
    }


def category(context, request):
    return {'nodes': Category.objects.all()}


def header(context, request):
    return {
        'nodes': Category.objects.all(),
        'slides': News.objects.filter(is_slider=True)
    }


def footer(context, request):
    return {
        'user': request.user,
        'request': request,
    }


register.inclusion_tag('core/tags/top_menu.html', takes_context=True)(top_menu)
register.inclusion_tag('core/tags/category.html', takes_context=True)(category)
register.inclusion_tag('core/tags/header.html', takes_context=True)(header)
register.inclusion_tag('core/tags/footer.html', takes_context=True)(footer)
