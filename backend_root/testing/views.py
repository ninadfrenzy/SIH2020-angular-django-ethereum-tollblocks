from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import jwt
import hashlib
from rest_framework.decorators import api_view
from rest_framework.response import Response
import traceback

from . import toll_blocks_web3_script
from .Module_Auth import is_logged_in
from .models import UserProfile, Vehicle, Road, Authority, Plaza, Booth, Ministry, Rate, Transaction
from .seralizers import UserSerializer, VehicleSerializer, RoadSerializer, AuthoritySerializer, PlazaSerializer, BoothSerializer, MinistrySerializer, RateSerializer, TxSerializer

# Create your views here.
#demo test view
def test_home(request):
    return HttpResponse('test root')

# views function for signup
@api_view(['POST'])  #defines the types of requests allowed in this view
def signup(request):
    if request.method == 'POST':
        # most of the form validation done in front end
        #create a JWT token based on user email address and type
        jwt_token = {'token': jwt.encode({'id':request.data['email'], 'user_type': request.data['user_type']}, "SECRET_KEY")}
        data = request.data
        #adding the token to user object
        password = request.data['password']
        password = str(hashlib.sha256(str(password).encode()).hexdigest())
        #hashing the password before storing in database
        data['password'] = password
        data['token'] = str(jwt_token['token'])
        #data['token'] = str(jwt_token)
        #serializing the input
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 201)
        else:
            print(serializer.errors)
            return Response(serializer.errors, 400)
    else:
        return Response("RequestError: Only POST request supported!", 403)
        
        
@api_view(['POST'])  #defines the types of requests allowed in this view
def login(request):
    if request.method == 'POST':
        #get the email_id, mobile_number and password
        data = request.data
        email_mobile = request.data['email_mobile']     
        password = request.data['password']
        #hash password so as to compare with hashed password from database
        password = str(hashlib.sha256(str(password).encode()).hexdigest())
        user_type = request.data['user_type']
        
        try:
            if user_type == 'ministry':
                attribute = 'email'
                user = Ministry.objects.get(email = email_mobile)                    
                serializer = MinistrySerializer(user, many = False)
            elif user_type == 'authority':
                attribute = 'email'
                user = Authority.objects.get(email = email_mobile)                    
                serializer = AuthoritySerializer(user, many = False)

            elif user_type == 'plaza':
                attribute = 'email'
                user = Plaza.objects.get(email = email_mobile)                    
                serializer = PlazaSerializer(user, many = False)   

            elif user_type == 'booth':
                attribute = 'email'
                user = Booth.objects.get(email = email_mobile)                    
                serializer = BoothSerializer(user, many = False)   

            else:
                if "@" in email_mobile:
                    attribute = 'email'
                    #get the user using email
                    user = UserProfile.objects.get(email = email_mobile)
                else:
                    attribute = 'mobile_number'
                    #get the user using mobile_number
                    user = UserProfile.objects.get(mobile_number = email_mobile)
                        
                serializer = UserSerializer(user, many = False)

            #validate password corresponding to the email or mobile number
            if serializer.data[attribute] == email_mobile and serializer.data['password'] == password:
                #create a new JWT token based on user mobile number/email and type
                jwt_token = {'token': jwt.encode({'id': serializer.data[attribute], 'user_type': request.data['user_type']}, "SECRET_KEY")}            
                #update token
                user.token = str(jwt_token['token']) 
                user.save()
                if user_type == 'ministry':
                    serializer = MinistrySerializer(user, many = False)
                elif user_type == 'authority':
                    serializer = AuthoritySerializer(user, many = False)
                elif user_type == 'plaza':
                    serializer = PlazaSerializer(user, many = False)  
                elif user_type == 'booth':
                    serializer = BoothSerializer(user, many = False)   
                else:
                    serializer = UserSerializer(user, many = False)
                return Response(serializer.data, 200)          
            else:
                return Response("Incorrect Password!", 401)
        except:
            return Response("Email Id/ Mobile Number doesn't exist!", 401)
    else:
        return Response("RequestError: Only POST request supported!", 403)


@api_view(['POST']) #defines the types of requests allowed in this view
def add_vehicle(request):
    
    if request.method == 'POST':
        mobile_number, user_type = is_logged_in(request)
        if mobile_number == str(request.data['mobile_number']):
            # print(request.data)
            # extract the vehicle details from request body
            serializer = VehicleSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, 201)
            else:
                print(serializer.errors)
                return Response(serializer.errors, 400)
        else:
            return Response("RequestError: Please login through required account and try again.", 403)
    else:
        return Response("RequestError: Only POST request supported!", 403)
    
@api_view(['GET'])
def get_vehicle(request):
    # check if the user is logged in or not
    login_info = is_logged_in(request)
    if(login_info != False):
        user_vehicles = Vehicle.objects.filter(mobile_number = login_info)
        serializer = VehicleSerializer(user_vehicles, many=True)
        return Response(serializer.data)
    else:
        return Response("RequestError: Please login and try again.", 403)
        

@api_view(['POST'])
def update_balance(request):
    # check if the user is logged in or not
    login_info, user_type = is_logged_in(request)
    if login_info != False:
        try:
            # vehicle = Vehicle.objects.get(mobile_number = login_info, vehicle_id = request.data['vehicle_id'])   #to restrict balance updation to respective users
            vehicle = Vehicle.objects.get(vehicle_id = request.data['vehicle_id'])
            vehicle.balance += request.data['amount']
            vehicle.save()
            serializer = VehicleSerializer(vehicle, many=False)
            return Response(serializer.data)
        except:
            return Response("RequestError: No such Vehicle registered.", 403)
    else:
        return Response("RequestError: Please login and try again.", 403)

        
@api_view(['GET']) #defines the types of requests allowed in this view
def profile(request):
    # check if the user is logged in or not
    login_info, user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False
    # and user_type has user type if successful otherwise none
    if(login_info != False):
        if user_type == 'ministry':
            user = Ministry.objects.get(email = login_info)
            serializer = MinistrySerializer(user, many=False)
            return Response(serializer.data)
        elif user_type == 'authority':
            user = Authority.objects.get(email = login_info)
            serializer = AuthoritySerializer(user, many=False)
            return Response(serializer.data)

        elif user_type == 'plaza':
            user = Plaza.objects.get(email = login_info)
            serializer = PlazaSerializer(user, many=False)
            return Response(serializer.data)

        elif user_type == 'booth':
            user = Booth.objects.get(email = login_info)
            serializer = BoothSerializer(user, many=False)
            return Response(serializer.data)

        else:
            user = UserProfile.objects.get(mobile_number = login_info)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)

    # if not logged in return error
    else:
        return Response("RequestError: Please login and try again.", 403)


@api_view(['POST']) #defines the types of requests allowed in this view
def logout(request):
    # check if the user is logged in or not
    login_info, user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False
    if login_info != False:
        # remove the token of user from db
        if user_type == 'ministry':
            user = Ministry.objects.get(email = login_info)
            user.token = ""
            user.save()
            serializer = MinistrySerializer(user, many=False)
        elif user_type == 'authority':
            user = Authority.objects.get(email = login_info)
            user.token = ""
            user.save()
            serializer = AuthoritySerializer(user, many=False)

        elif user_type == 'plaza':
            user = Plaza.objects.get(email = login_info)
            user.token = ""
            user.save()
            serializer = PlazaSerializer(user, many=False)

        elif user_type == 'booth':
            user = Booth.objects.get(email = login_info)
            user.token = ""
            user.save()
            serializer = BoothSerializer(user, many=False)

        else:
            user = UserProfile.objects.get(mobile_number = login_info)
            user.token = ""
            user.save()
            serializer = UserSerializer(user, many=False)
            
        return Response(serializer.data, 200)
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['POST']) #defines the types of requests allowed in this view
def add_road(request):
    # check if the user is logged in or not
    login_info, user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False
    if login_info != False:        
        # only authorized users can perform this operation
        if user_type == 'ministry':
            road = request.data
            road['road_id'] = 'RD' + str(Road.objects.all().count() + 10)
            toll_blocks_web3_script.add_road(str(request.data['road_id']), str(request.data['contract_amount']))

            serializer = RoadSerializer(data=road)
            if serializer.is_valid():
                serializer.save()
                print(serializer.data)
                return Response(serializer.data, 201)
            else:
                print(serializer.errors)
                return Response(serializer.errors, 400)

        else:
            return Response("UserError: You are not allowed for this action.", 403)
        
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['GET','POST']) #defines the types of requests allowed in this view
def get_roads(request):
    # check if the user is logged in or not
    login_info,user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False
    if login_info != False:
        if(request.method == 'POST'):
            recieved_authority_id = request.data['authority_id']
            roads = Road.objects.filter(authority_id = recieved_authority_id)
        else:
            # only authorized users can perform this operation
            if user_type == 'ministry':
                roads = Road.objects.all()
                serializer = RoadSerializer(roads, many=True)
            else:
                return Response("UserError: You are not allowed for this action.", 403)
        
        serializer = RoadSerializer(roads, many = True)
        for i in range(0, len(serializer.data)):
            road_data_from_blockchain = toll_blocks_web3_script.get_road(serializer.data[i]['road_id'])
            serializer.data[i]['is_active'] = road_data_from_blockchain[2]
        return Response(serializer.data)
        
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['GET']) #defines the types of requests allowed in this view
def get_authorities(request):
    # check if the user is logged in or not
    login_info,user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False
    if login_info != False:      
        authorities = Authority.objects.all()
        serializer = AuthoritySerializer(authorities, many=True)
        return Response(serializer.data)
       
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['GET', 'POST']) #defines the types of requests allowed in this view
def get_plazas(request):
    # check if the user is logged in or not
    login_info,user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False
    if login_info != False:
        #hacky way of getting filtered results, modify this to url params later. 
        if request.method == 'POST':
            data = request.data
            if(data['filter_by'] == 'road_id'):
                plazas = Plaza.objects.filter(road_id = data['filter_property'])
            elif(data['filter_by'] == 'authority_id'):
                plazas = Plaza.objects.filter(authority_id = data['filter_property'])
            serializer = PlazaSerializer(plazas, many=True)
            return Response(serializer.data)
        else:
            plazas = Plaza.objects.all()
            serializer = PlazaSerializer(plazas, many=True)
            return Response(serializer.data)
       
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['GET', 'POST']) #defines the types of requests allowed in this view
def get_booths(request):
    # check if the user is logged in or not
    login_info,user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False

    if login_info != False:
        #hacky way of getting filtered results, modify this to url params later. 
        if request.method == 'POST':
            data = request.data
            if(data['filter_by'] == 'plaza_id'):
                booths = Booth.objects.filter(plaza_id = data['filter_property'])
            serializer = BoothSerializer(booths, many=True)
            return Response(serializer.data)
        else:      
            booths = Booth.objects.all()
            serializer = BoothSerializer(booths, many=True)
            return Response(serializer.data)
       
    else:
        return Response("RequestError: You are not logged in.", 403)


@api_view(['POST'])
def add_ministry(request):
    # most of the form validation done in front end
    #create a JWT token based on user email address and type
    jwt_token = {'token': jwt.encode({'id':request.data['email'], 'user_type': 'ministry'}, "SECRET_KEY")}
    data = request.data
    #adding the token to user object
    password = request.data['password']
    password = str(hashlib.sha256(str(password).encode()).hexdigest())
    #hashing the password before storing in database
    data['password'] = password
    data['token'] = str(jwt_token['token'])
    #serializing the input
    serializer = MinistrySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, 201)
    else:
        print(serializer.errors)
        return Response(serializer.errors, 400)        
        
@api_view(['POST'])
def add_authority(request):
    # check if the user is logged in or not
    login_info, user = is_logged_in(request)
    if login_info!= False:
        # only authorized users can perform this operation
        if user == 'ministry':
            # most of the form validation done in front end
            #create a JWT token based on user email address and type
            jwt_token = {'token': jwt.encode({'id':request.data['email'], 'user_type': 'authority'}, "SECRET_KEY")}
            data = request.data
            #adding the token to user object
            password = request.data['password']
            password = str(hashlib.sha256(str(password).encode()).hexdigest())
            #hashing the password before storing in database
            data['password'] = password
            data['token'] = str(jwt_token['token'])
            data['authority_id'] = 'ATH' + str(Authority.objects.all().count() + 10)
            #serializing the input
            serializer = AuthoritySerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, 201)
            else:
                print(serializer.errors)
                return Response(serializer.errors, 400)
        else:
            return Response("UserError: You are not allowed for this action.", 403)
        
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['POST'])
def add_plaza(request):
	# check if the user is logged in or not
    login_info, user = is_logged_in(request)
    if login_info!= False:
        # only authorized users can perform this operation
        if user == 'authority':
            # most of the form validation done in front end
            #create a JWT token based on user email address and type
            jwt_token = {'token': jwt.encode({'id':request.data['email'], 'user_type': 'plaza'}, "SECRET_KEY")}
            data = request.data
			#adding the token to user object
            password = request.data['password']
            password = str(hashlib.sha256(str(password).encode()).hexdigest())
			#hashing the password before storing in database
            data['password'] = password
            data['token'] = str(jwt_token['token'])

            data['plaza_id'] = data['road_id'] +'-'+data['authority_id'] + '-PL' + str(Plaza.objects.all().count() + 10)
			#serializing the input
            serializer = PlazaSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, 201)
            else:
                print(serializer.errors)
                return Response(serializer.errors, 400)
        else:
            return Response("UserError: You are not allowed for this action.", 403)
        
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['POST'])
def add_booth(request):
    # check if the user is logged in or not
    login_info, user = is_logged_in(request)
    if login_info!= False:
        # only authorized users can perform this operation
        if user == 'plaza':
            # most of the form validation done in front end
            #create a JWT token based on user email address and type
            jwt_token = {'token': jwt.encode({'id':request.data['email'], 'user_type': 'plaza'}, "SECRET_KEY")}
            data = request.data
            #adding the token to user object
            password = request.data['password']
            password = str(hashlib.sha256(str(password).encode()).hexdigest())
            #hashing the password before storing in database
            data['password'] = password
            data['token'] = str(jwt_token['token'])

            # all booths not at a single place in frontend hence assign last part of id for uniqueness by counting rows in db.
            # not the best approach (what happens on delete?) (we dont delete anything yet, so works).

            data['booth_id'] = data['plaza_id'] + '-BTH' + str(Booth.objects.all().count()+10)
            #serializing the input
            serializer = BoothSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, 201)
            else:
                print(serializer.errors)
                return Response(serializer.errors, 400)
        else:
            return Response("UserError: You are not allowed for this action.", 403)
        
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['POST'])
def assign_authority(request):
    # check if the user is logged in or not
    login_info, user_type = is_logged_in(request)
    if login_info != False:
        if user_type == 'ministry':
            try:               
                road = Road.objects.get(road_id = request.data['road_id'])               
                road.authority_id = request.data['authority_id']
                road.save()
                serializer = RoadSerializer(road, many=False)
                return Response(serializer.data)
            except Exception as e:
                print(e)
                return Response("RequestError: No such Road Available.", 403)
        else:
            return Response("UserError: You are not allowed for this action.", 403)
    else:
        return Response("RequestError: Please login and try again.", 403)

@api_view(['POST'])
def rates(request):
    # check if the user is logged in or not
    login_info, user_type = is_logged_in(request)
    if login_info != False:
        if user_type == 'plaza':
            try:
                data = request.data
                rate = Rate.objects.get(plaza_id=data['plaza_id'])
                #if record already exists then update the record else create new record
                if(Rate.objects.filter(plaza_id=data['plaza_id']).count() != 0):
                    rate.car_rate = data['car_rate']
                    rate.bus_rate = data['bus_rate']
                    rate.truck_rate = data['truck_rate']
                    rate.lcv_rate = data['lcv_rate']
                    rate.save()
                    serializer = RateSerializer(rate, many=False)
                    return Response(serializer.data, 201)
                serializer = RateSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, 201)
                else:
                    print(serializer.errors)
                    return Response(serializer.errors, 400)
            except(Rate.DoesNotExist):
                #table has no records, create new record directly without checking if it exists.
                serializer = RateSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, 201)
                else:
                    print(serializer.errors)
                    return Response(serializer.errors, 400)


        else:
            return Response("UserError: You are not allowed for this action.", 403)
    else:
        return Response("RequestError: Please login and try again.", 403)

@api_view(['POST']) #defines the types of requests allowed in this view
def get_rates(request):
    # check if the user is logged in or not
    login_info,user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False

    if login_info != False:
        #hacky way of getting filtered results, modify this to url params later. 
        if request.method == 'POST':
            print(request.data['plaza_id'])
            rateobj = Rate.objects.get(plaza_id = request.data['plaza_id'])
            serializer = RateSerializer(rateobj, many=False)
            print(serializer.data)
            return Response(serializer.data)
        else:      
            return Response("UserError: Not Found.", 403)
       
    else:
        return Response("RequestError: You are not logged in.", 403)

@api_view(['POST'])
def transaction(request):
    # check if the user is logged in or not
    login_info, user_type = is_logged_in(request)
    if login_info != False:
        if user_type == 'booth':
            vehicle_id = request.data['vehicle_id']
            vehicle_type = request.data['vehicle_type']
            booth_id = request.data['booth_id']
            plaza_id = request.data['plaza_id']
            amount = request.data['amount']
            road_id = request.data['road_id']

            try:
                vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
            except(Vehicle.DoesNotExist):
                return Response("DoesNotExist: vehicle does not exist", 403)
            booth = Booth.objects.get(booth_id=booth_id)
            plaza = Plaza.objects.get(plaza_id=plaza_id) 
            rate = Rate.objects.get(plaza_id=plaza_id) 
            road = Road.objects.get(road_id=road_id)

            road_data_from_blockchain = toll_blocks_web3_script.get_road(road_id)
            print(road_data_from_blockchain[2])
            if road_data_from_blockchain[2] == False:
                return Response("ContractError: Contract amount is collected")

            if(vehicle.vehicle_type != vehicle_type):
                return Response("MismatchError: Vehicle type does not match.", 403)
            if vehicle.balance < amount:
                return Response("UserError: Low balance.", 403)
            vehicle.balance -= amount
            # handle string typecast while adding.
            booth.total_collection = str(float(booth.total_collection) + float(amount))
            plaza.total_collection = str(float(plaza.total_collection) + float(amount))
            road.collected_amount = float(road.collected_amount) +  float(amount)

            vehicle.save()
            booth.save()
            plaza.save()
            road.save()

            tx = request.data
            serializer = TxSerializer(data=tx)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, 201)
            else:
                print(serializer.errors)
                return Response(serializer.errors, 400)


        else:
            return Response("UserError: You are not allowed for this action.", 403)
    else:
        return Response("RequestError: Please login and try again.", 403)


@api_view(['POST'])
def get_transactions(request):
    # check if the user is logged in or not
    login_info,user_type = is_logged_in(request)
    # if logged in send user profile
    # if auth verification is successful then variable login_info has email or mobile number of user
    # otherwise variable login_info has boolean value False

    if login_info != False:
        #hacky way of getting filtered results, modify this to url params later. 
        if request.method == 'POST':
            data = request.data
            if(data['filter_by'] == 'vehicle_id'):
                txns = Transaction.objects.filter(vehicle_id = data['filter_property'])
            elif(data['filter_by'] == 'booth_id'):
                txns = Transaction.objects.filter(booth_id = data['filter_property'])
            elif(data['filter_by'] == 'plaza_id'):
                txns = Transaction.objects.filter(plaza_id = data['filter_property'])
            serializer = TxSerializer(txns, many=True)
            # Make a JSON with attributes from different models, before sending.
            for index in range(0,len(serializer.data)):
                authority = AuthoritySerializer(Authority.objects.get(authority_id=serializer.data[index]['authority_id']), many=False)
                serializer.data[index]['authority_name'] = authority.data['name']

                road = RoadSerializer(Road.objects.get(road_id=serializer.data[index]['road_id']), many=False)
                serializer.data[index]['start_end'] = road.data['start']+'-'+road.data['end']

                plaza = PlazaSerializer(Plaza.objects.get(plaza_id=serializer.data[index]['plaza_id']), many=False)
                serializer.data[index]['plaza_location'] = plaza.data['location']
            
            return Response(serializer.data)
        else:      
            txns = Transaction.objects.all()
            serializer = TxSerializer(txns, many=True)
            return Response(serializer.data)
       
    else:
        return Response("RequestError: You are not logged in.", 403)


@api_view(['GET'])
def get_data_from_blockchain(request):
    try:
        roads = Road.objects.all()
        serializer = RoadSerializer(roads, many=True)

        # iterate through all roads and get data from blockchain
        for i in range(0, len(serializer.data)):
                road_data_from_blockchain = toll_blocks_web3_script.get_road(serializer.data[i]['road_id'])
                serializer.data[i]['road_data_from_blockchain'] = road_data_from_blockchain
        return Response(serializer.data)

    except:
        traceback.print_exc()
        return Response("ServerError: Please try again", 500)
   