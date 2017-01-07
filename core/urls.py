from django.conf.urls import url
import core.views as views


urlpatterns = [
    url(r'^$', views.index_view, name="home"),
]
