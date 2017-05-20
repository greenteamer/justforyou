# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.sites.models import Site
from core.models import Category


class Config(models.Model):
    site = models.OneToOneField(Site, related_name="site")
    site_name = models.CharField(max_length=200, verbose_name=u"Название сайта")
    site_address = models.CharField(max_length=200, verbose_name=u"Адрес сайта")
    site_description = models.TextField(verbose_name=u"Описание сайта")
    site_logo = models.ImageField(upload_to="config")
    site_logo2 = models.ImageField(upload_to="config")
    site_email = models.CharField(max_length=200, verbose_name=u"Почта администратора")
    site_main_category = models.OneToOneField(Category, null=True, blank=True)

    class Meta:
        verbose_name = u"Настройки сайта"
        verbose_name_plural = u"Настройки сайтов"

    def get_main_phone(self):
        return SitePhone.objects.get(config=self, is_main=True)

    def get_all_phones(self):
        return SitePhone.objects.filter(config=self)

    def get_logo_url(self):
        return "/media/%s" % self.site_logo.name

    def get_logo2_url(self):
        return "/media/%s" % self.site_logo2.name

    def __unicode__(self):
        return self.site_name


class SitePhone(models.Model):
    config = models.ForeignKey(Config, related_name="phones")
    site_phone = models.CharField(max_length=200, verbose_name=u"Телефон сайта", help_text="вводите телефон в формате 8 (118) 716-20-19")
    is_main = models.BooleanField(default=False, verbose_name=u"Главный телефон")

    class Meta:
        verbose_name = u"Телефон сайта"
        verbose_name_plural = u"Телефоны сайта"

    def __unicode__(self):
        return self.site_phone

class AditionalLink(models.Model):
    config = models.ForeignKey(Config)
    name = models.CharField(max_length=200, verbose_name=u"Текст ссылки")
    machine_name = models.CharField(max_length=200, verbose_name=u"Машинное имя")
    link = models.CharField(max_length=200, verbose_name=u"Ссылка")

    class Meta:
        verbose_name = u"Ссылка"
        verbose_name_plural = u"Дополнительные ссылка для сата"

    def __unicode__(self):
        return self.name
