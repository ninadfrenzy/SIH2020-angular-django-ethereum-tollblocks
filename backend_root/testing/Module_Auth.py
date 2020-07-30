import jwt
import traceback

from .models import UserProfile, Authority, Plaza, Booth, Ministry

def is_logged_in(request):
    try:
        # cleaing token as postman sends token in header is format : 
        # 'HTTP_AUTHORIZATION' = Bearer b'<token>'
        # so formatting token as '<token>'

        token = request.META['HTTP_AUTHORIZATION'][9:]
        data = jwt.decode(token[:len(token)-1], 'SECRET_KEY')
        # extract the user id from token 
        email_mobile = data['id']
        user_type = data['user_type']

        #identify is user id is email or mobile and find corresponding user
        if '@' in email_mobile:
            if user_type == 'ministry':
                user = Ministry.objects.get(email = email_mobile)
                if "b'"+token == user.token:
                    return user.email, 'ministry'
                    
            elif user_type == 'authority':
                user = Authority.objects.get(email = email_mobile)
                if "b'"+token == user.token:
                    return user.email, 'authority'

            elif user_type == 'plaza':
                #print(email_mobile)
                user = Plaza.objects.get(email = email_mobile)
                if "b'"+token == user.token:
                    return user.email, 'plaza'

            elif user_type == 'booth':
                user = Booth.objects.get(email = email_mobile)
                if "b'"+token == user.token:
                    return user.email, 'booth' 
            else:
                user = UserProfile.objects.get(email = email_mobile)
        else:
            user = UserProfile.objects.get(mobile_number = email_mobile)

        if "b'"+token == str(user):
            return user.mobile_number, 'customer'
        else: 
            return False, ''
    except:
        traceback.print_exc()
        return False, ''