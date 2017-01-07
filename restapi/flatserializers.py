# coding: utf8
from rest_framework import serializers
from core.models import Category, ProductImage, Product, PropertyType, PropertyValue
from cart.models import CartItem, Order


class CategoryObj(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'parent')


class ProductImageObj(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'product')


class PropertyTypeObj(serializers.ModelSerializer):

    class Meta:
        model = PropertyType
        fields = ('url', 'id', 'name', 'unit')


class PropertyValueObj(serializers.ModelSerializer):

    class Meta:
        model = PropertyValue
        fields = ('url', 'id', 'type', 'product', 'value', 'price')


class ProductObj(serializers.ModelSerializer):
    # images = ProductImageObj(read_only=True, many=True)
    # properties = PropertyValueObj(read_only=True, many=True)
    images = ProductImage.objects.all()
    properties = PropertyValue.objects.all()

    class Meta:
        model = Product
        fields = ('url', 'id', 'category', 'name', 'slug', 'description', 'price', 'images', 'properties')


class CartItemObj(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('url', 'id', 'product', 'property', 'count', 'cart_id')


class OrderObj(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('url', 'id', 'user', 'cart_id', 'is_paid')