# -*- coding: utf-8 -*-
from django import template
# from core.models import Category
register = template.Library()


def top_menu(context, request):
    return {
        'user': request.user,
        'request': request,
    }
register.inclusion_tag('core/tags/top_menu.html', takes_context=True)(top_menu)


# def category(context, request):
#     return {'nodes': Category.objects.all()}
# register.inclusion_tag('core/tags/category.html', takes_context=True)(category)
