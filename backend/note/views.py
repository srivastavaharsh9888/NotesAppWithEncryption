from django.db import models

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes,permission_classes

from .serializers import UserSerializer,NoteSerializer
from .models import Note

class Register(APIView):
    """ View to create a user by validating password. """

    def post(self, request):
        password = request.data.get("password")
        username = request.data.get("username")
        user_serializer=UserSerializer(data=request.data)
        if user_serializer.is_valid():
        	user=User.objects.create_user(username=username,password=password)
        	user.is_active = True
        	user.save()
        	return Response({"status":"Account created"},status=status.HTTP_200_OK)
        else:
        	return Response({"error":user_serializer.errors},status=status.HTTP_400_BAD_REQUEST)	
        return Response({"status":"User with this email already exists.","flag":False},status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    """ View to login the user by creating a authentication token for the user. """

    def post(self, request):
        name = request.data.get("username")
        password = request.data.get("password")
        try:
            user_exists=User.objects.filter(username=name)
            if not user_exists.exists():
                return Response({ "status": "User with this details not exists.", "flag": False },status=status.HTTP_400_BAD_REQUEST)
            user_obj=authenticate(username=user_exists[0].username,password=password)
            if user_obj:
                user_token,created=Token.objects.get_or_create(user=user_obj)
                return Response({"status": "Success", "token": user_token.key, "username": user_obj.username, "userId": user_obj.id }, status=status.HTTP_200_OK)
            else:
                return Response({ "status": 'Password Incorrect', "flag": False }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'status': 'Please enter a valid username and password.', "details": str(e), "flag": False}, status=status.HTTP_401_UNAUTHORIZED)


class AddListNote(generics.ListCreateAPIView):
    """ View to add and list the notes. """

    permission_classes = (IsAuthenticated,)
    authentication_classes=(TokenAuthentication,)

    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user, user__id=self.request.query_params.get("user")).select_related('user')
    
    def perform_create(self,serializer):
        note_obj=serializer.save(user=self.request.user)