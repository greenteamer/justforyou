# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-23 14:54
from __future__ import unicode_literals

import ckeditor_uploader.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20170423_1417'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='description',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
    ]
