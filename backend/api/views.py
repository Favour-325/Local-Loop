from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login, logout
from .utils import send_user_email
    
class CouncilListView(generics.ListAPIView):
    queryset = Council.objects.all()
    serializer_class = CouncilSerializer
    permission_classes = [AllowAny]
    
class CouncilRetrieveView(generics.RetrieveAPIView):
    queryset = Council.objects.all()
    serializer_class = CouncilSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
    
class CreateUserView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
        
class LogoutView(APIView):
    def post(request):
        response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response(CustomUserSerializer(request.user).data, status=status.HTTP_200_OK)
    
class UpdateUserView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    
    def udpate(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RequestListView(generics.ListAPIView):
    serializer_class = RequestSerializers
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Requests.objects.filter(author=self.request.user).order_by('-created_at')

class RequestCreateView(generics.CreateAPIView):
    query = Requests.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = RequestSerializers
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
        send_user_email(subject="Request Submitted", message="Thank you for submitting your request. We're sorry for any incovenience you're facing within your community. We'll review and get back to you as soon as possible.",   recipient_email=self.request.user.email)
        
class RequestRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Requests.objects.all()
    serializer_class = RequestSerializers
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
        
class ServicesView(generics.ListAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticated]
    
class ProjectsView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Projects.objects.filter(council=self.request.user.user_council).order_by('-created_at')
    
class ProjectRetrieveView(generics.RetrieveAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
    
class ContributionView(generics.ListAPIView):
    serializer_class = ContributionSerializers
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Contributions.objects.filter(author=self.request.user).order_by('-created_at')
    
class ContributionCreateView(generics.CreateAPIView):
    queryset = Contributions.objects.all()
    serializer_class = ContributionSerializers
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
        send_user_email(subject="You're a great Citizen!", message="We appreciate your effort in contributing to this project. We are eager to see our community grow - your support matters",   recipient_email=self.request.user.email)
        
    
class FeedbackView(generics.CreateAPIView):
    queryset = Feedbacks.objects.all()
    serializer_class = FeedbacksSerializers
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
        send_user_email(subject="Feedback Received", message="Thank you for your feedback. We value your input and will consider it for improvements.",   recipient_email=self.request.user.email)