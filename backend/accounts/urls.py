from django.urls import path


from . views import AccountCreateAPIView, BlacklistTokenView


urlpatterns = [
    path('register/', AccountCreateAPIView.as_view(), name = "create_account"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name = "blacklist")
]
