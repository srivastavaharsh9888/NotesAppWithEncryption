from django.contrib.auth.models import User
from rest_framework import serializers

from rest_framework.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

from .models import Note

class UserSerializer(serializers.ModelSerializer):

	def validate_username(self,username):
		user_exists=User.objects.filter(username=username).exists()
		if user_exists:
			raise ValidationError('Invalid ')
		return username

	def validate_password(self,password):
		valid_password=validate_password(password)		
		return password

	class Meta:
		model = User
		fields='__all__'

class NoteSerializer(serializers.ModelSerializer):
	username = serializers.ReadOnlyField(source='user.username',read_only=True)
	user_id = serializers.SerializerMethodField('_user')
	
	def _user(self, obj):
		request = self.context.get("request", None)
		if request:
			return request.user.id
	
	class Meta:
		model = Note
		fields = '__all__'
		extra_kwargs = { 'user': { 'required': False } }
		extra_fields = ['username', 'user_id']