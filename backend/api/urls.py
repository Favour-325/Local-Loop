from django.urls import path
from .views import *

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    # path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('auth/me/', UserView.as_view(), name='authentication'),
    path('council/list', CouncilView.as_view(), name='councils'),
    path('services/', ServicesView.as_view(), name='services'),
    path('requests/', RequestView.as_view(), name='requests'),
    path('projects/', ProjectsView.as_view(), name='projects'),
    path('contributions/', ContributionView.as_view(), name='contributions'),
    path('feedbacks/', FeedbackView.as_view(), name='feedbacks')
]