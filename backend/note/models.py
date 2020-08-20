from django.db import models
from django.contrib.auth.models import User
from common.createmodifymodels import CreateModifyModel 
from fernet_fields import EncryptedTextField, EncryptedCharField

class Note(CreateModifyModel):
	""" Model to store the notes corresponding to a user. """
	
	content = EncryptedTextField(null=True,blank=True,default="")
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	title = EncryptedTextField()