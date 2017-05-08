# -*- coding: utf-8 -*-
import os
DIR = os.path.abspath(os.path.dirname(__file__))
STATICFILES_DIRS = (
    os.path.join(DIR, 'static', ),
)
MEDIA_ROOT = os.path.join(DIR, 'media', )

ADMIN_EMAIL = 'somemail@gmail.com'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'name_db',
        'USER': 'user_name',
        'PASSWORD': 'pass',
        'HOST': '',
        'PORT': '',
    }
}

ADMIN_EMAIL = 'someadmin@gmail.com'
AUTH_USER_EMAIL_UNIQUE = True
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'somehost@gmail.com'
EMAIL_HOST_PASSWORD = 'pass'
EMAIL_PORT = 587

