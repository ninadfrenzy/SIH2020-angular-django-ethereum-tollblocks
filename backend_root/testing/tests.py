from django.test import TestCase
from rest_framework.test import APIClient
from .seralizers import UserSerializer, VehicleSerializer, RoadSerializer, AuthoritySerializer, PlazaSerializer, BoothSerializer, MinistrySerializer, RateSerializer, TxSerializer
import json
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from .models import UserProfile, Vehicle, Road, Authority, Plaza, Booth, Ministry, Rate, Transaction
from rest_framework.authtoken.models import  Token

class SignUpTest(TestCase):

    def test_user_signup(self):
        client=APIClient()
        response = client.post('/test/api/signup/',{"first_name":"seven", "last_name":"hh","email":"seven@seven.com","user_type":"customer","mobile_number":"12345","password":"seven"}, format='json')
        required_fields = ["mobile_number","first_name","last_name","email","user_type","password","token","is_active"]      
        response_fields = list(dict(response.data).keys())
        self.assertEqual(required_fields, response_fields)


class StatusCodeTest(TestCase):

    

    def test_user_signup_login_statuscode(self):
        client=APIClient()
        response = client.post('/test/api/signup/',{"first_name":"seven", "last_name":"hh","email":"seven@seven.com","user_type":"customer","mobile_number":"12345","password":"seven"}, format='json')
        self.assertEqual(response.status_code,201)
        response = client.post('/test/api/login/',{"email_mobile": "seven@seven.com","password": "seven","user_type":"customer"}, format='json')
        self.assertEqual(response.status_code,200)
    
    def test_ministry_signup_login_statuscode(self):
        client=APIClient()
        response = client.post('/test/api/addministry/',{"name": "MHRD","email": "ministry@gmail.com","password": "ministry"}, format='json')
        self.assertEqual(response.status_code,201)
        StatusCodeTest.ministry_token=response.data["token"]
        response = client.post('/test/api/login/',{"email_mobile": "ministry@gmail.com","password": "ministry","user_type":"ministry"}, format='json')
        self.assertEqual(response.status_code,200)
    
    def test_authority_invalid_signup_statuscode(self):
        client=APIClient()
        response = client.post('/test/api/addauthority/',{"name": "road authority", "authority_id": "ATH11", "email": "roadauth11@gmail.com", "password": "temp123"}, format='json')
        self.assertEqual(response.status_code,403)
        response = client.post('/test/api/login/',{"email_mobile": "roadauth11@gmail.com","password": "temp123","user_type":"authority"}, format='json')
        self.assertEqual(response.status_code,401)

    def test_plaza_invalid_signup_statuscode(self):
        client=APIClient()
        response = client.post('/test/api/addplaza/',{"name": "plaza", "plaza_id": "PLZ11", "email": "plaza1@gmail.com", "password": "temp123"}, format='json')
        self.assertEqual(response.status_code,403)
        response = client.post('/test/api/login/',{"email_mobile": "plaza1@gmail.com","password": "temp123","user_type":"plaza"}, format='json')
        self.assertEqual(response.status_code,401)

    def test_booth_invalid_signup_statuscode(self):
        client=APIClient()
        response = client.post('/test/api/addbooth/',{"name": "booth", "booth_id": "BTH11", "email": "booth1@gmail.com", "password": "temp123"}, format='json')
        self.assertEqual(response.status_code,403)
        response = client.post('/test/api/login/',{"email_mobile": "booth1@gmail.com","password": "temp123","user_type":"booth"}, format='json')
        self.assertEqual(response.status_code,401)

    

