from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('api/', views.test_home),
    path('api/signup/', views.signup),
    path('api/login/', views.login),
    path('api/addvehicle/', views.add_vehicle),
    path('api/getvehicle/', views.get_vehicle),
    path('api/update_balance/', views.update_balance),
    path('api/profile/', views.profile),
    path('api/logout/', views.logout),
    path('api/addroad/', views.add_road),
    path('api/getroads/', views.get_roads),
    path('api/addministry/', views.add_ministry),
    path('api/addauthority/', views.add_authority),
	path('api/addplaza/', views.add_plaza),
	path('api/addbooth/', views.add_booth),
    path('api/getauthority/', views.get_authorities),
    path('api/getplaza/', views.get_plazas),
    path('api/getbooth/', views.get_booths),
    path('api/assignauthority/', views.assign_authority),
    path('api/addrates/', views.rates),
    path('api/getrates/', views.get_rates),
    path('api/collect/', views.transaction),
    path('api/gettransactions/', views.get_transactions),
    path('api/getchain/', views.get_data_from_blockchain),
]