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
    
class CouncilListView(generics.ListAPIView):
    queryset = Council.objects.all()
    serializer_class = CouncilSerializer
    permission_classes = [AllowAny]
    
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
    queryset = Projects.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
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
        
    
class FeedbackView(generics.CreateAPIView):
    queryset = Feedbacks.objects.all()
    serializer_class = FeedbacksSerializers
    permission_classes = [IsAuthenticated]