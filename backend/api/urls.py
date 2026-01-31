from django.urls import path
from api.views import SignUpView, LoginView
from django.urls import include

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/', include('products.urls')),
]