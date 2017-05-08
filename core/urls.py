from django.conf.urls import url
import core.views as views


urlpatterns = [
    url(r'^$', views.index_view, name="home"),
    url(r'^contact-form/$', views.contact_form, name="contact_form"),
    url(r'^catalog/(?P<slug>[-\w]+)/$', views.catalog_view, name="catalog"),
    url(r'^catalog/(?P<categorySlug>[-\w]+)/(?P<slug>[-\w]+)/$', views.product_view, name="product_view"),
    url(r'^pages/(?P<slug>[-\w]+)/?$', views.page_view, name="page_view"),
    url(r'^articles/(?P<slug>[-\w]+)/$', views.article_view, name="article_view"),
    url(r'^articles/$', views.article_list_view, name="article_list_view"),
    url(r'^news/(?P<slug>[-\w]+)/$', views.news_view, name="news_view"),
    url(r'^news/$', views.news_list_view, name="news_list_view"),
    url(r'^reviews/(?P<slug>[-\w]+)/$', views.reivew_view, name="reivew_view"),
    url(r'^reviews/$', views.review_list_view, name="review_list_view"),
]
