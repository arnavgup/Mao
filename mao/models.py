from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Module(models.Model):
    level = models.IntegerField
    score = models.IntegerField
    date = models.DateTimeField

