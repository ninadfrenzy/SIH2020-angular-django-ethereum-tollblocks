from django.db import models

class UserProfile(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    user_type = models.CharField(max_length = 20)
    mobile_number = models.CharField(max_length=12, unique=True, primary_key=True)
    password = models.CharField(max_length=350)
    token = models.CharField(max_length=300)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.token

class Vehicle(models.Model):
    vehicle_name = models.CharField(max_length=100)
    vehicle_id = models.CharField(max_length=100, unique=True)
    vehicle_type = models.CharField(max_length=100)
    mobile_number = models.ForeignKey(UserProfile, on_delete = models.CASCADE)
    balance = models.FloatField(default=0)

    def __str__(self):
        return self.vehicle_id



class Ministry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=350)
    token = models.CharField(max_length=300)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.token        

class Authority(models.Model):
    name = models.CharField(max_length=100)
    authority_id = models.CharField(max_length=100, unique=True, primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=350)
    token = models.CharField(max_length=300)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.token

class Road(models.Model):
    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100)
    contract_duration = models.CharField(max_length=100)
    contract_amount = models.FloatField(default=0)
    collected_amount = models.FloatField(default=0)
    road_id = models.CharField(max_length=100, unique=True, primary_key=True)
    authority_id = models.CharField(max_length=100, default="")
    
    def __str__(self):
        return self.road_id

class Plaza(models.Model):
    name = models.CharField(max_length=100)
    plaza_id = models.CharField(max_length=100, unique=True, primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=350)
    location = models.CharField(max_length=100)
    total_collection = models.CharField(max_length=100)
    road_id = models.ForeignKey(Road, on_delete = models.CASCADE, default="")
    authority_id = models.ForeignKey(Authority, on_delete = models.CASCADE, default="")
    token = models.CharField(max_length=300)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.token

class Booth(models.Model):
    name = models.CharField(max_length=100)
    booth_id = models.CharField(max_length=100, unique=True, primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=350)
    road_id = models.ForeignKey(Road, on_delete = models.CASCADE, default="")
    authority_id = models.ForeignKey(Authority, on_delete = models.CASCADE, default="")
    plaza_id = models.ForeignKey(Plaza, on_delete = models.CASCADE, default="")
    total_collection = models.CharField(max_length=100, default='0')
    token = models.CharField(max_length=300)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.token

class Rate(models.Model):
    plaza_id = models.OneToOneField(Plaza, on_delete = models.CASCADE,unique=True, default="")
    car_rate = models.FloatField(default=0)
    lcv_rate = models.FloatField(default=0)
    truck_rate = models.FloatField(default=0)
    bus_rate = models.FloatField(default=0)

    def __str__(self):
        return self.plaza_id

class Transaction(models.Model):
    transaction_id = models.AutoField(unique=True, primary_key=True)
    authority_id = models.ForeignKey(Authority, on_delete = models.CASCADE, default="")
    plaza_id = models.ForeignKey(Plaza, on_delete = models.CASCADE, default="")
    booth_id = models.ForeignKey(Booth, on_delete = models.CASCADE, default="")
    road_id = models.ForeignKey(Road, on_delete = models.CASCADE, default="")
    vehicle_id = models.CharField(max_length=100, default="")
    vehicle_type = models.CharField(max_length=100, default="")
    amount = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_return = models.BooleanField(default=False)
    is_two_way = models.BooleanField(default=False)
