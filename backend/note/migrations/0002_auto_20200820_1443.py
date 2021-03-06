# Generated by Django 3.1 on 2020-08-20 14:43

from django.db import migrations
import fernet_fields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('note', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='content',
            field=fernet_fields.fields.EncryptedTextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='note',
            name='title',
            field=fernet_fields.fields.EncryptedTextField(),
        ),
    ]
