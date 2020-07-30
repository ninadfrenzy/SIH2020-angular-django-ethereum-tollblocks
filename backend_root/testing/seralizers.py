from rest_framework import serializers
from .models import UserProfile, Vehicle, Road, Authority, Plaza, Booth, Ministry, Rate, Transaction

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        
    def create(self, validated_data):
        return UserProfile.objects.create(**validated_data)

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

        def create(self, validated_data):
            return Vehicle.objects.create(**validated_data)


class RoadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Road
        fields = '__all__'

        def create(self, validated_data):
            return Road.objects.create(**validated_data)

class MinistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ministry
        fields = '__all__'
        
    def create(self, validated_data):
        return Ministry.objects.create(**validated_data)
            
class AuthoritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Authority
        fields = '__all__'
        
    def create(self, validated_data):
        return Authority.objects.create(**validated_data)
        
class PlazaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plaza
        fields = '__all__'
        
    def create(self, validated_data):
        return Plaza.objects.create(**validated_data)

class BoothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booth
        fields = '__all__'
        
    def create(self, validated_data):
        return Booth.objects.create(**validated_data)

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'
       
    def create(self, validated_data):
        return Rate.objects.create(**validated_data)

class TxSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
       
    def create(self, validated_data):
        return Transaction.objects.create(**validated_data)