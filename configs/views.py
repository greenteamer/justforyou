# -*- coding: utf-8 -*-
import json
import requests
from django.shortcuts import render_to_response
from django.template import RequestContext
from configs.forms import SubscribeForm, CeilingForm, ContactForm
from django.http import HttpResponse
from django.core.mail import send_mail
from methods import get_site_config


def contacts(request, template_name="configs/contacts.html"):
	config = get_site_config(request)
	return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def subscribe_view(request, template_name="configs/success.html"):
	if request.method is "POST":
		form = SubscribeForm(request.POST)

		if form.is_valid():
			form.send_mail()

	return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def contact_form_view(request, template_name="configs/success.html"):
	if request.method == "POST":
		form = ContactForm(request.POST)

		if form.is_valid():
			form.send_email(request)
		else:
			template_name = "configs/fail.html"
	return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def ceiling_form_view(request, template_name="configs/success.html"):
	if request.method == "POST":
		form = CeilingForm(request.POST)

		if form.is_valid():
			form.send_email(request)
		else:
			template_name = "configs/fail.html"
	return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def ajax_zamer_view(request):
	# обработка ajax запроса на замер
	phone = request.POST["phone"]
	# создание лида в bitrix24
	lead = {
		'title':'Заявка на замер',
		"phone_work": str(phone),
		"lead_source": "Personal Contact",
		"lead_source_description": "Website Application",
	}
	print "........ lead: %s" % lead
	r = requests.post('https://api-2445581398133.apicast.io:443/v1/lead',
										headers={
											# 'Content-Type': 'application/json',
											'X-API2CRM-USERKEY': '010a999f67ec2ad7fbed9d44f43ceee4',
											'X-API2CRM-CRMKEY': 'a9fa9c0e8158f5d82247c38e88a8453166356876'
										},
										json = lead)
	print r.text
	# отправка письма на почту
	config = get_site_config(request)
	subject = u'Вызов замерщика'
	message = u'телефон: %s' % phone
	send_mail(subject, message, 'teamer777@gmail.com', [config.site_email], fail_silently=False)
	data = json.dumps({
		"phone": phone
	})
	return HttpResponse(data, content_type="application/json")


def ajax_calculator_view(request):
	# отправка данных калькулятор потолка
	phone = request.POST["phone"]
	square = request.POST["square"]
	angle = request.POST["angle"]
	tube = request.POST["tube"]
	perforation = request.POST["perforation"]
	zakladnaya = request.POST["zakladnaya"]
	strut = request.POST["strut"]
	tip_polotna = request.POST["tip_polotna"]
	brend_polotna = request.POST["brend_polotna"]
	# подготовка сообщения
	message = u'телефон: %s, площадь потолка: %s, Фактура полотна: %s, количество углов %s, Торговая марка потолка: %s, Трубы уходящие в потолок: %s, Закладная под потолочную люстру: %s, Отверстие под крючковую люстру: %s, Стойка под встраиваемый светильник: %s '% (phone, square, tip_polotna, angle, brend_polotna, tube, zakladnaya, perforation, strut)
	# создание лида в bitrix24
	lead = {
		'title':'Заявка калькулятор',
		"phone_work": str(phone),
		"lead_source": "Personal Contact",
		"lead_source_description": "Website Application",
		"description": message
	}
	print "........ lead: %s" % lead
	r = requests.post('https://api-2445581398133.apicast.io:443/v1/lead',
										headers={
											# 'Content-Type': 'application/json',
											'X-API2CRM-USERKEY': '010a999f67ec2ad7fbed9d44f43ceee4',
											'X-API2CRM-CRMKEY': 'a9fa9c0e8158f5d82247c38e88a8453166356876'
										},
										json = lead)
	# отправка данных на почту
	config = get_site_config(request)
	subject = u'Вызов замерщика'
	send_mail(subject, message, 'teamer777@gmail.com', [config.site_email], fail_silently=False)
	data = json.dumps({
		"phone": phone
	})
	return HttpResponse(data, content_type="application/json")


def yandex_confirm_view(request, template_name="configs/yandex_confirm.html"):

	return render_to_response(template_name, locals(), content_type='text/plain')
