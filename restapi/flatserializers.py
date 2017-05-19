# coding: utf8
from rest_framework import serializers
from core.models import Category, ProductImage, Product, PropertyType, PropertyValue
from cart.models import CartItem, Order, Delivery
from django.contrib.auth.models import User


class CategoryObj(serializers.ModelSerializer):
    absoluteUrl = serializers.CharField(max_length=200)

    class Meta:
        model = Category
        #  fields = ('id', 'absoluteUrl', 'name', 'slug', 'parent')
        fields = '__all__'


class ProductImageObj(serializers.ModelSerializer):
    croppedImage = serializers.CharField(max_length=200)

    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'product', 'mainCropper', 'cropping', 'croppedImage', 'croppingVertical', 'croppedVerticalImage')


class PropertyTypeObj(serializers.ModelSerializer):
    # url = serializers.CharField(read_only=True)

    class Meta:
        model = PropertyType
        fields = ('url', 'id', 'name', 'unit')


class PropertyValueObj(serializers.ModelSerializer):

    class Meta:
        model = PropertyValue
        fields = ('url', 'id', 'type', 'product', 'value', 'price')


class ProductObj(serializers.ModelSerializer):
    absoluteUrl = serializers.CharField(max_length=200)
    images = ProductImage.objects.all()
    properties = PropertyValue.objects.all()

    class Meta:
        model = Product
        fields = (
            'url', 'absoluteUrl', 'id', 'category', 'name', 'slug',
            'description', 'preview_description', 'price', 'weight', 'images', 'properties',
            'attached', 'isPopular', 'certificate'
        )


class CartItemObj(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('url', 'id', 'product', 'property', 'count', 'cart_id')


class OrderObj(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('url', 'id', 'price', 'cart_id', 'is_paid')


class DeliveryObj(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = '__all__'


class UserObj(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email')
        #  fields = '__all__'
