from rest_framework import serializers
from api.mappers import UserDataMapper, LogInDataMapper

class SignUpSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100)

    def validate_email(self, value):
        return value.lower() if value else value
    
    def to_user_data_mapper(self) -> UserDataMapper:
        return UserDataMapper(
            name=self.validated_data['name'],
            email=self.validated_data['email'],
            password=self.validated_data['password']
        )

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100)

    def validate_email(self, value):
        return value.lower() if value else value

    def to_log_in_data_mapper(self) -> LogInDataMapper:
        return LogInDataMapper(
            email=self.validated_data['email'],
            password=self.validated_data['password']
        )