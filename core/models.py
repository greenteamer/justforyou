# -*- coding: utf-8 -*-
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from image_cropping import ImageRatioField
from image_cropping.utils import get_backend

# class Parent(models.Model):
#     name = models.CharField(max_length=40)
#     date = models.DateField(auto_now_add=True)


class Category(MPTTModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    parent = TreeForeignKey('self', related_name='children', blank=True, null=True)

    class Meta:
        verbose_name = u'Категории'
        verbose_name_plural = u'Категории'

    def __unicode__(self):
        return self.name

    @property
    def absoluteUrl(self):
        return "/catalog/{0}/".format(self.slug)


class Product(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True, blank=False)
    description = models.TextField()
    price = models.IntegerField()
    weight = models.IntegerField()
    category = models.ManyToManyField(Category)

    class Meta:
        verbose_name = u'Продукты'
        verbose_name_plural = u'Продукты'

    def __unicode__(self):
        return self.name

    def get_image(self):
        return ProductImage.objects.filter(product=self)[0]

    def get_properties(self):
        return PropertyValue.objects.filter(product=self)

    def absoluteUrl(self):
        return "{0}{1}/".format(self.category.all()[0].absoluteUrl, self.slug)


class ProductImage(models.Model):
    image = models.ImageField(upload_to="product")
    product = models.ForeignKey(Product, related_name='images')
    cropping = ImageRatioField('image', '262x377')

    class Meta:
        verbose_name = u'Изображение'
        verbose_name_plural = u'Изображения продуктов'

    def __unicode__(self):
        return self.product.name + "-" + self.image.name

    def get_url(self):
        return "/media/%s" % self.image

    @property
    def croppedImage(self):
        return get_backend().get_thumbnail_url(
            self.image,
            {
                'size': (262, 377),
                'box': self.cropping,
                'crop': True,
                'detail': True,
            }
        )


class PropertyType(models.Model):
    name = models.CharField(max_length=150, unique=True, blank=False)
    unit = models.CharField(max_length=3, unique=True, blank=False)

    class Meta:
        verbose_name = u'Тип'
        verbose_name_plural = u'Типы свойств'

    def __unicode__(self):
        return self.name


class PropertyValue(models.Model):
    type = models.ForeignKey(PropertyType, related_name='propTypes')
    product = models.ForeignKey(Product, related_name='properties')
    value = models.CharField(max_length=150, blank=False)
    price = models.IntegerField()

    class Meta:
        verbose_name = u'Свойство продукта'
        verbose_name_plural = u'Свойства продуктов'

    def __unicode__(self):
        return self.product.name + "-" + self.type.name + "-" + self.value


class Article(models.Model):
    name = models.CharField(max_length=200)
    text = models.TextField()
    date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = u'Статья'
        verbose_name_plural = u'Статьи'

    def __unicode__(self):
        return self.name


class ArticleImage(models.Model):
    url = models.ImageField(upload_to="article")
    article = models.ForeignKey(Article)

    class Meta:
        verbose_name = u'Фото статьи'
        verbose_name_plural = u'Фото статьи'

    def __unicode__(self):
        return self.name


class Page(models.Model):
    slug = models.SlugField(max_length=150, unique=False, blank=False)
    name = models.CharField(max_length=2000)
    page = models.TextField()

    class Meta:
        verbose_name = u'Страницы'
        verbose_name_plural = u'Страницы'

    def __unicode__(self):
        return self.name


class PageImage(models.Model):
    url = models.ImageField(upload_to="page")
    page = models.ForeignKey(Page)

    class Meta:
        verbose_name = u'Фото страницы'
        verbose_name_plural = u'Фото страницы'

    def __unicode__(self):
        return self.name
