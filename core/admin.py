from django.contrib.admin import TabularInline, ModelAdmin, site
from core.models import Product, Article, Page, ProductImage, ArticleImage, PageImage, Category, PropertyType, PropertyValue
from super_inlines.admin import SuperInlineModelAdmin, SuperModelAdmin


class PropertyValueInline(SuperInlineModelAdmin, TabularInline):
    model = PropertyValue


class ProductAdmin(SuperModelAdmin):
    inlines = [PropertyValueInline, ]
    prepopulated_fields = {'slug': ('name',), }


class CategoryAdmin(ModelAdmin):
    prepopulated_fields = {'slug': ('name',), }


# Register your models here.
site.register(PropertyType)
site.register(Product, ProductAdmin)
site.register(Article)
site.register(Page)
site.register(ProductImage)
site.register(ArticleImage)
site.register(PageImage)
site.register(Category, CategoryAdmin)
