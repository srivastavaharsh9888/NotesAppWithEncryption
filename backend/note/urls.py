from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^user/$', views.Register.as_view(),name='register'),
    url(r'^user/auth/$', views.Login.as_view(),name='login'),
    url(r'sites/$', views.AddListNote.as_view(), name='note-add'),
    url(r'sites/list/$', views.AddListNote.as_view(), name='note-list'),
]
