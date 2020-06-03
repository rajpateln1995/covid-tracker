from django.urls import path
from . import views

urlpatterns = [
	path('', views.index,name=''),
	path('<str:name>',views.getCountryData,name="getCountryData")

]


