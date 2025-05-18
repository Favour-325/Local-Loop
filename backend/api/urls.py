from django.urls import path
from .views import *

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    #path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('council/list/', CouncilListView.as_view(), name='councils'),
    path('council/<int:id>/', CouncilRetrieveView.as_view(), name='council_details'),
    path('auth/me/', UserView.as_view(), name='authentication'),
    path('profile/update/<int:id>', UpdateUserView.as_view(), name='updateProfile'),
    path('services/', ServicesView.as_view(), name='services'),
    path('requests/list/', RequestListView.as_view(), name='requests'),
    path('requests/create/', RequestCreateView.as_view(), name='createRequest'),
    path('projects/', ProjectsView.as_view(), name='projects'),
    path('projects/<int:id>/', ProjectRetrieveView.as_view(), name='project'),
    path('contributions/', ContributionView.as_view(), name='contributions'),
    path('contributions/create/', ContributionCreateView.as_view(), name='createContributions'),
    path('feedbacks/', FeedbackView.as_view(), name='feedbacks')
]