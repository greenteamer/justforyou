# -*- coding: utf-8 -*-
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from image_cropping import ImageRatioField
from image_cropping.utils import get_backend
from ckeditor.fields import RichTextField


"""Абстрактный базовый класс для моделей"""
class BaseModel(models.Model):
    class Meta:
        abstract = True

    name = models.CharField(u'Название', max_length=240, unique=False)
    slug = models.SlugField(max_length=240, unique=True, help_text=u'Ссылка формируется автоматически при заполнении.')
    meta_title = models.CharField(verbose_name=u'Мета title', max_length=80, blank=True)
    meta_description = models.CharField(verbose_name=u'Мета описание', max_length=255, help_text=u'Нужно для СЕО', blank=True)
    meta_keywords = models.CharField(verbose_name=u'Мета ключевые слова', max_length=255, blank=True)
    created_at = models.DateTimeField(verbose_name=u'Дата создания', null=True, auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=u'Дата обновления', null=True, auto_now=True)

    def __unicode__(self):
        return self.name


"""Абстрактный базовый класс для информационных моделей"""
class BaseInfoModel(BaseModel):
    class Meta:
        abstract = True

    description = RichTextField()


"""Абстрактный базовый класс для расширенных информационных моделей"""
class BaseInfoExtendedModel(BaseModel):
    class Meta:
        abstract = True

    description = RichTextField()
    preview_description = models.TextField(verbose_name=u"preview описание")


class Category(MPTTModel, BaseModel):
    parent = TreeForeignKey('self', related_name='children', blank=True, null=True)

    class Meta:
        verbose_name = u'Категории'
        verbose_name_plural = u'Категории'

    @property
    def absoluteUrl(self):
        return "/catalog/{0}/".format(self.slug)

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return "/catalog/{0}/".format(self.slug)


class Product(BaseInfoExtendedModel):
    price = models.IntegerField()
    weight = models.IntegerField()
    category = models.ManyToManyField(Category)
    certificate = models.ImageField(upload_to="certificate", blank=True, null=True)

    attached = models.ForeignKey('self', blank=True, null=True)
    isPopular = models.BooleanField(default=False)

    class Meta:
        verbose_name = u'Продукты'
        verbose_name_plural = u'Продукты'

    def get_image(self):
        return ProductImage.objects.filter(product=self)[0]

    def get_certificate_url(self):
        return "/media/%s" % self.certificate

    def get_properties(self):
        return PropertyValue.objects.filter(product=self)

    def absoluteUrl(self):
        return "{0}{1}/".format(self.category.all()[0].absoluteUrl, self.slug)

    def get_absolute_url(self):
        return "{0}{1}/".format(self.category.all()[0].absoluteUrl, self.slug)


class ProductImage(models.Model):
    image = models.ImageField(upload_to="product")
    product = models.ForeignKey(Product, related_name='images')
    cropping = ImageRatioField('image', '300x300')

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
                'size': (300, 300),
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
    value = models.IntegerField()
    price = models.IntegerField()

    class Meta:
        verbose_name = u'Свойство продукта'
        verbose_name_plural = u'Свойства продуктов'

    def __unicode__(self):
        return u"%s - %s - %s " % (self.product.name, self.type.name, self.value)


class Article(BaseInfoExtendedModel):
    image = models.ImageField(upload_to="article", null=True, blank=True)

    class Meta:
        verbose_name = u'Статья'
        verbose_name_plural = u'Статьи'

    def get_image_url(self):
        return "/media/%s" % self.image

    def get_absolute_url(self):
        return "/articles/%s/" % self.slug


class ArticleImage(models.Model):
    url = models.ImageField(upload_to="article")
    article = models.ForeignKey(Article)

    class Meta:
        verbose_name = u'Фото статьи'
        verbose_name_plural = u'Фото статьи'

    def __unicode__(self):
        return u"{} - {}".format(self.article.name, self.id)


class Page(BaseInfoExtendedModel):
    image = models.ImageField(upload_to="page", null=True, blank=True)

    class Meta:
        verbose_name = u'Страницы'
        verbose_name_plural = u'Страницы'

    def get_image_url(self):
        return "/media/%s" % self.image

    def get_absolute_url(self):
        return "/pages/%s/" % self.slug


class PageImage(models.Model):
    url = models.ImageField(upload_to="page")
    page = models.ForeignKey(Page)

    class Meta:
        verbose_name = u'Фото страницы'
        verbose_name_plural = u'Фото страницы'

    def __unicode__(self):
        return u"{} - {}".format(self.page.name, self.id)


class News(BaseInfoExtendedModel):
    image = models.ImageField(upload_to="page", null=True, blank=True)

    class Meta:
        verbose_name = u'Новость'
        verbose_name_plural = u'Новости'

    def get_image_url(self):
        return "/media/%s" % self.image

    def get_absolute_url(self):
        return "/news/%s/" % self.slug


class NewsImage(models.Model):
    url = models.ImageField(upload_to="news")
    news = models.ForeignKey(News)

    class Meta:
        verbose_name = u'Фото новости'
        verbose_name_plural = u'Фото новости'

    def __unicode__(self):
        return u"{} - {}".format(self.news.name, self.id)


class Review(BaseInfoModel):
    product = models.ForeignKey(Product)

    class Meta:
        verbose_name = u'Отзыв'
        verbose_name_plural = u'Отзывы'

    def get_absolute_url(self):
        return "/reviews/%s/" % self.slug
