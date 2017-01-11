from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^practice/$', views.practice, name='practice'),
    url(r'^registration/$', views.UserFormView.as_view(), name='registration'),
]