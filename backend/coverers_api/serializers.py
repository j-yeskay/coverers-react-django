from dataclasses import field
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from accounts.models import Account
from coverers.models import Cover, FollowingFollower, Like
from rest_framework.permissions import IsAuthenticated



class CoverSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    # permission_classes = [IsAuthenticated]
    class Meta:
        model = Cover
        fields = ('id', 'song', 'coverer', 'video', 'likes')
    

    def get_likes(self, obj):
        return LikeSerializer(obj.likes.all(), many=True).data
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['coverer'] = {"id": instance.coverer.id, "username": instance.coverer.username}
        return ret


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowingFollower
        fields = ('user',)
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = {"id": instance.user.id, "username": instance.user.username}
        return ret


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowingFollower
        fields = ('following_user',)
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['following_user'] = {"id": instance.user.id, "username": instance.following_user.username}
        return ret



class MyProfileSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    
    
    class Meta:
        model = Account
        fields = ('email', 'first_name', 'last_name', 'username', 'followers', 'following')
    

    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data
    
   
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'user', 'cover')
    
    # def to_representation(self, instance):
    #     ret = super().to_representation(instance)
    #     ret['user'] = {"id": instance.user.id}
    #     return ret
    


class AccountsSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    already_follows = serializers.SerializerMethodField()
    
    
    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'last_name', 'first_name', 'followers', 'following', 'already_follows')
    
    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data
    
    def get_already_follows(self, obj):
        return self.context.get("already_follows")
    
    
    
    


