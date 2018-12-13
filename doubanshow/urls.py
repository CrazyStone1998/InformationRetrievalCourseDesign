# -*- coding: utf8 -*-
from django.urls import re_path,include
from doubanshow import views


app_name = 'doubanshow'

urlpatterns = [

    re_path(r'^initView/*$', views.initView, name='initView'),
    re_path(r'^movieDetail/*$', views.movieDetail, name='movieDeatil'),
    re_path(r'^search/*$', views.search, name='search'),


]