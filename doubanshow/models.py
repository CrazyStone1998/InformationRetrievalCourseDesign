from django.db import models

# Create your models here.


class movie(models.Model):

    id = models.CharField(primary_key=True, unique=True, max_length=20)
    rate = models.FloatField()
    title = models.CharField(max_length=45)
    url = models.CharField(max_length=45)
    playable = models.BooleanField()
    cover_x = models.IntegerField()
    cover_y = models.IntegerField()
    cover = models.CharField(max_length=100)
    is_new = models.BooleanField()


class shortComment(models.Model):

    id = models.CharField(primary_key=True, unique=True, max_length=20)
    rate = models.IntegerField()
    movie_id = models.CharField(max_length=20)
    comment = models.CharField(max_length=1000)


class movieComment(models.Model):

    id = models.CharField(primary_key=True, unique=True, max_length=20)
    title = models.CharField(max_length=50)
    rate = models.IntegerField()
    movie_id = models.CharField(max_length=20)
    comment = models.CharField(max_length=10000)