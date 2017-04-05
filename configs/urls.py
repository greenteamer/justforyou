# -*- coding: utf-8 -*-
# !/usr/bin/env python

from django.conf.urls import url
from configs.views import *

urlpatterns = [
	url(r'^contacts/$', contacts, name="contacts"),
	url(r"^subscribe/$", subscribe_view, name="subscribe"),
	url(r"^contact-form/$", contact_form_view, name="contact_form_view"),
	url(r"^ceiling-form/$", ceiling_form_view, name="ceiling_form_view"),
	url(r"^ajax/zamer/$", ajax_zamer_view, name="ajax_zamer_view"),
	url(r"^ajax/calculator/$", ajax_calculator_view, name="ajax_calculator_view"),
	url(r'^ab730baf57b8\.html$', yandex_confirm_view, name="yandex_confirm_view")
]
