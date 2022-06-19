
from django.http import JsonResponse
from rest_framework import status
from rest_framework import generics
from coverers.models import Cover, FollowingFollower
from accounts.models import Account
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView


from . serializers import AccountsSerializer, CoverSerializer, MyProfileSerializer, AccountsSerializer



@api_view(['GET'])
def get_current_user(request):
    user = Account.objects.get(id = request.user.id)
    user_id = user.id
    return JsonResponse(user_id, safe = False)


class CoverUserWritePermission(BasePermission):
    message = "Editing cover is restricted to coverer only"


    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.coverer == request.user



class CoverList(generics.ListCreateAPIView):
    queryset = Cover.objects.all()
    serializer_class = CoverSerializer


class CoverDetail(generics.RetrieveUpdateDestroyAPIView, CoverUserWritePermission):
    permission_classes = [CoverUserWritePermission]
    queryset = Cover.objects.all()
    serializer_class = CoverSerializer


@api_view(['GET'])
def my_profile(request):
    account = Account.objects.get(id = request.user.id)
    account_serializer = MyProfileSerializer(account)
    return Response(account_serializer.data)


class UserList(generics.ListAPIView):
    
    serializer_class = AccountsSerializer


    def get_queryset(self):
        username = self.kwargs['username']
        return Account.objects.filter(username__istartswith = username).exclude(username = self.request.user.username)


# class UserDetail(generics.RetrieveAPIView):
#     queryset = Account.objects.all()
#     serializer_class = AccountsSerializer

#     def get_serializer_context(self):
#         context = super(UserDetail, self).get_serializer_context()
#         context.update({"request": self.request})
#         return context


@api_view(['GET'])
def user_detail(request, pk):
    request_user = Account.objects.get(id = request.user.id)
    user = Account.objects.get(id = pk)
    already_follows = False
    
    for i in user.followers.all():
        if request_user == i.user:
            already_follows = True 
           

    serializer = AccountsSerializer(user, context = {'already_follows' : already_follows})
    return Response(serializer.data)



@api_view(['POST'])
def follow(request, pk):
    user = Account.objects.get(id = request.user.id)
    following_user = Account.objects.get(id = pk)

    FollowingFollower.objects.create(user = user, following_user = following_user)

    return Response(status = status.HTTP_201_CREATED)


@api_view(['DELETE'])
def unfollow(request, pk):
    user = Account.objects.get(id = request.user.id)
    following_user = Account.objects.get(id = pk)

    f = FollowingFollower.objects.get(user = user, following_user = following_user)
    f.delete()
    return Response(status = status.HTTP_200_OK)


class CoverUpload(APIView):
    parser_classes = [MultiPartParser, FormParser]


    def post(self, request, format = None):
        print(request.data)
        serializer = CoverSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @parser_classes([MultiPartParser, FormParser])
# def upload_cover(request, format = None):
#     # coverer = Account.objects.get(id = request.user.id)
#     # song = request.POST.get("song")
#     # video = request.FILES['video']

#     serializer = CoverSerializer(data = request.data)
#     if serializer.is_valid()



    






