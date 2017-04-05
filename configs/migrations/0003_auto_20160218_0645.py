# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('configs', '0002_config_site'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='aditionallink',
            options={'verbose_name': '\u0421\u0441\u044b\u043b\u043a\u0430', 'verbose_name_plural': '\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0430 \u0434\u043b\u044f \u0441\u0430\u0442\u0430'},
        ),
        migrations.AlterModelOptions(
            name='config',
            options={'verbose_name': '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0430\u0439\u0442\u0430', 'verbose_name_plural': '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u0430\u0439\u0442\u043e\u0432'},
        ),
        migrations.AddField(
            model_name='config',
            name='site_logo',
            field=models.ImageField(default='', upload_to=b'config'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='config',
            name='site_phone',
            field=models.CharField(help_text=b'\xd1\x80\xd0\xb0\xd0\xb7\xd0\xb4\xd0\xb5\xd0\xbb\xd0\xb8\xd1\x82\xd0\xb5 \xd1\x82\xd0\xb5\xd0\xbb\xd0\xb5\xd1\x84\xd0\xbe\xd0\xbd \xd0\xbd\xd0\xb0 2 \xd1\x87\xd0\xb0\xd1\x81\xd1\x82\xd0\xb8 \xd0\xbf\xd1\x80\xd0\xbe\xd0\xb1\xd0\xb5\xd0\xbb\xd0\xbe\xd0\xbc', max_length=200, verbose_name='\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0441\u0430\u0439\u0442\u0430'),
        ),
    ]
