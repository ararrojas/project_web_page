from api.mappers import UserDataMapper, LogInDataMapper
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from django.contrib.auth import authenticate

def get_user_by_id(user_id: int) -> User:
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise ValidationError("User not found")

def signup(user_data_mapper: UserDataMapper) -> tuple[User, str]:
    old_user = User.objects.filter(email=user_data_mapper.email).first()
    if old_user:
        raise ValidationError("User already exists")
    
    user = User.objects.create_user(
        username=user_data_mapper.email,
        email=user_data_mapper.email,
        password=user_data_mapper.password,
    )
    user.first_name = user_data_mapper.name  
    user.save()

    token, _ = Token.objects.get_or_create(user=user)
    return user, token


def login(login_data_mapper: LogInDataMapper) -> tuple[User, str]:
    user = authenticate(
            username=login_data_mapper.email,
            password=login_data_mapper.password,
        )
    if not user:
        raise ValidationError("Invalid credentials")
    
    now = timezone.now()
    user.last_login = now
    user.save()
    
    token, _ = Token.objects.get_or_create(user=user)
    return user, token