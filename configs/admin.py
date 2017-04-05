# -*- coding: utf-8 -*-
from django.contrib import admin
from configs.models import *


class AditionalLinksAdmin(admin.StackedInline):
    model = AditionalLink
    extra = 0

class SitePhoneAdmin(admin.StackedInline):
    model = SitePhone
    extra = 1

class ConfigAdmin(admin.ModelAdmin):
    inlines = [SitePhoneAdmin, AditionalLinksAdmin]


admin.site.register(Config, ConfigAdmin)
