# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AditionalLink',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200, verbose_name='\u0422\u0435\u043a\u0441\u0442 \u0441\u0441\u044b\u043b\u043a\u0438')),
                ('machine_name', models.CharField(max_length=200, verbose_name='\u041c\u0430\u0448\u0438\u043d\u043d\u043e\u0435 \u0438\u043c\u044f')),
                ('link', models.CharField(max_length=200, verbose_name='\u0421\u0441\u044b\u043b\u043a\u0430')),
            ],
        ),
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('site_name', models.CharField(max_length=200, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0430\u0439\u0442\u0430')),
                ('site_description', models.TextField(verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0441\u0430\u0439\u0442\u0430')),
                ('site_phone', models.CharField(max_length=200, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0441\u0430\u0439\u0442\u0430')),
            ],
        ),
        migrations.AddField(
            model_name='aditionallink',
            name='config',
            field=models.ForeignKey(to='configs.Config'),
        ),
    ]
