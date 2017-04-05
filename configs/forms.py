#-*- coding: utf-8 -*-
from django import forms
from django.core.mail import send_mail
from methods import get_site_config
from ceilings.models import FilterType, Filter



class ContactForm(forms.Form):
	def __init__(self, *args, **kwargs):
		super(ContactForm, self).__init__(*args, **kwargs)
		self.fields['name'].widget.attrs = {'placeholder':'Ваше имя', 'class':'form-control'}
		self.fields['phone'].widget.attrs = {'placeholder':'Ваш телефон', 'class':'form-control phone', 'id': 'phone'}
		self.fields['name'].label = ""
		self.fields['phone'].label = ""
	name = forms.CharField()
	phone = forms.CharField()

	class Meta:
		fields = [
			'name',
			'phone',
		]
		labels = {
			"name": u"",
			"phone": u""
		}

	def send_email(self, request):
		print "................start send_email"
		data = self.cleaned_data
		# получаем данные конфигурации сайта
		config = get_site_config(request)
		# отправка формы
		subject = u'Контактные данные пользователя %s' % config.site.domain
		message = u'Имя: %s \n телефон: %s' % (data['name'], data['phone'])
		send_mail(subject, message, 'teamer777@gmail.com', [config.site_email], fail_silently=False)


class RoundForm(forms.Form):
	def __init__(self, *args, **kwargs):
		super(RoundForm, self).__init__(*args, **kwargs)
		self.fields['phone'].widget.attrs = {'placeholder':'Ваш телефон', 'class':'phone border-round round-form-phone', 'id': ''}
		self.fields['phone'].label = ""

	phone = forms.CharField()

	class Meta:
		fields = [
			'phone',
		]
		labels = {
			"phone": u""
		}


class CeilingForm(forms.Form):
	def __init__(self, *args, **kwargs):
		super(CeilingForm, self).__init__(*args, **kwargs)
		self.fields['name'].widget.attrs = {'placeholder':'Ваше имя', 'class':'form-control phone'}
		self.fields['phone'].widget.attrs = {'placeholder':'Ваш телефон', 'class':'form-control'}
		self.fields['name'].label = ""
		self.fields['phone'].label = ""
	name = forms.CharField()
	phone = forms.CharField()
	ceiling = forms.IntegerField(widget=forms.HiddenInput)

	class Meta:
		fields = [
			'name',
			'phone',
			'ceiling'
		]
		labels = {
			"name": u"",
			"phone": u""
		}

	def send_email(self, request):
		print "................start send_email"
		data = self.cleaned_data
		# получаем данные конфигурации сайта
		config = get_site_config(request)
		# отправка формы
		subject = u'Контактные данные пользователя %s' % config.site.domain
		message = u'Имя: %s \n телефон: %s' % (data['name'], data['phone'])
		send_mail(subject, message, 'teamer777@gmail.com', [config.site_email], fail_silently=False)


class SubscribeForm(forms.Form):
	def __init__(self, *args, **kwargs):
		super(SubscribeForm, self).__init__(*args, **kwargs)
		self.fields['name'].widget.attrs = {'placeholder':'Ваше имя', 'class':'form-control'}
		self.fields['email'].widget.attrs = {'placeholder':'Ваш email', 'class':'form-control'}
		self.fields['text'].widget.attrs = {'placeholder':'Поле для вопроса', 'class':'form-control'}
		self.fields['name'].label = ""
		self.fields['email'].label = ""
		self.fields['text'].label = ""
	name = forms.CharField()
	phone = forms.CharField()

	class Meta:
		fields = [
			'name',
			'phone',
			'text'
		]
		labels = {
			"name": u"",
			"phone": u"",
			"text": u""
		}

	def send_email(self, request):
		data = self.cleaned_data
		# получаем данные конфигурации сайта
		config = get_site_config(request)
		# отправка формы
		subject = u'Подписка пользователя %s' % config.site.domain
		message = u'Имя: %s \n email: %s \n вопрос: %s' % (data['name'], data['email'], data['text'])
		send_mail(subject, message, 'teamer777@gmail.com', [config.site_email], fail_silently=False)


class CalculatorForm(forms.Form):
	def __init__(self, *args, **kwargs):
		super(CalculatorForm, self).__init__(*args, **kwargs)
		self.fields['square'].widget.attrs = {'placeholder':'Укажите полащадь', 'class':'form-control'}
		self.fields['angle'].widget.attrs = {'class':'form-control'}
		self.fields['tube'].widget.attrs = {'class':'form-control'}
		self.fields['perforation'].widget.attrs = {'class':'form-control'}
		self.fields['zakladnaya'].widget.attrs = {'class':'form-control'}
		self.fields['strut'].widget.attrs = {'class':'form-control'}
		self.fields['phone'].widget.attrs = {'placeholder':'Ваш телефон', 'class':'form-control phone phone-calculator'}
		self.fields['tip_polotna'].widget.attrs = {'class':'form-control'}
		CHOICES_TEXTURE = []
		filter_type =  FilterType.objects.get(slug="po-fakture")
		filters = Filter.objects.filter(type=filter_type)
		for filter in filters:
			CHOICES_TEXTURE.append([filter.id, filter.name])
		self.fields['brend_polotna'].widget.attrs = {'class':'form-control-radio'}
		CHOICES_BREND = []
		filter_type =  FilterType.objects.get(slug="po-brendam")
		filters = Filter.objects.filter(type=filter_type)
		for filter in filters:
			CHOICES_BREND.append([filter.id, filter.name])
		self.fields['tip_polotna'].choices = CHOICES_TEXTURE
		self.fields['brend_polotna'].choices = CHOICES_BREND
		self.fields['square'].label = ""
		self.fields['tube'].label = ""
		self.fields['perforation'].label = ""
		self.fields['zakladnaya'].label = ""
		self.fields['strut'].label = ""
		self.fields['phone'].label = ""
		self.fields['tip_polotna'].label = ""
		self.fields['brend_polotna'].label = ""

	square = forms.IntegerField()
	tube = forms.IntegerField()
	perforation = forms.IntegerField()
	strut = forms.IntegerField()
	zakladnaya = forms.IntegerField()
	angle = forms.IntegerField()
	tip_polotna = forms.ChoiceField()
	brend_polotna = forms.ChoiceField(widget=forms.RadioSelect)
	phone = forms.CharField()

	class Meta:
		fields = [
			'square',
			'tube',
			'perforation',
			'strut',
			'zakladnaya',
			'angle',
			'phone',
			'tip_polotna',
			'brend_polotna'

		]
		labels = {
			"angle": u"",
			"tube": u"",
			"perforation": u"",
			"strut": u"",
			"zakladnaya": u"",
			"square": u"",
			"tip_polotna": u"",
			"brend_polotna": u"",
			"phone": u""
		}

	def send_email(self, request):
		data = self.cleaned_data
		# получаем данные конфигурации сайта
		config = get_site_config(request)
		# отправка формы
		subject = u'Подписка пользователя %s' % config.site.domain
		message = u'Имя: %s \n email: %s \n вопрос: %s' % (data['name'], data['email'], data['text'])
		send_mail(subject, message, 'teamer777@gmail.com', [config.site_email], fail_silently=False)

