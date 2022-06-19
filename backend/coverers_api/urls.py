from django.urls import path
# from . views import CoverList, CoverDetail, unfollow, user_detail, follow, my_profile, UserList
from . import views

urlpatterns = [
    path('<int:pk>/', views.CoverDetail.as_view(), name = 'detailcreate'),
    path('', views.CoverList.as_view(), name = 'listcreate'),
    path('myprofile/', views.my_profile, name = "myprofile"),
    path('users/<str:username>/', views.UserList.as_view(), name = "users"),
    path('user/<int:pk>/', views.user_detail, name = "user"),
    path('follow/<int:pk>/', views.follow, name = "add-follower"),
    path('unfollow/<int:pk>/', views.unfollow, name = "unfollow"),
    path('upload/', views.CoverUpload.as_view(), name = "upload"),
    path('getcurrentuser/', views.get_current_user, name = "getcurrentuser"),
]
