from api.controllers import signup, login       
from api.serializers import SignUpSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token

class SignUpView(APIView):

    http_method_names = ['post']

    def post(self, request):
        signup_input = SignUpSerializer(data=request.data)
        signup_input.is_valid(raise_exception=True)

        try:
            user, token = signup(signup_input.to_user_data_mapper())
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)


class LoginView(APIView):

    http_method_names = ['post']

    def post(self, request):
        login_input = LoginSerializer(data=request.data)
        login_input.is_valid(raise_exception=True)

        try:
            user, token = login(login_input.to_log_in_data_mapper())
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"token": token.key}, status=status.HTTP_200_OK)