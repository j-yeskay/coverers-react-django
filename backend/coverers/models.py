from django.db import models
from accounts.models import Account

from . helpers import upload_to

class Cover(models.Model):
    coverer = models.ForeignKey(Account, on_delete = models.CASCADE, blank = False, null = False)
    song = models.CharField(max_length = 255)
    video = models.FileField(upload_to = upload_to, blank = False, null = False)


    def __str__(self):
        return f"{self.song} by {self.coverer}"


class FollowingFollower(models.Model):
    user = models.ForeignKey(Account, related_name = "following", on_delete = models.CASCADE)
    following_user = models.ForeignKey(Account, related_name = "followers", on_delete = models.CASCADE)
    

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'following_user'], name = "unique_followers")
        ]
    
    def __str__(self):
        return f"{self.user} follows {self.following_user}"


class Like(models.Model):
    cover = models.ForeignKey(Cover, related_name = "likes", on_delete = models.CASCADE)
    user = models.ForeignKey(Account, related_name = "likes", on_delete = models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields = ['cover', 'user'], name = "unique_likes")
        ]

    def __str__(self):
        return f"{self.cover} liked by {self.user}"

   
