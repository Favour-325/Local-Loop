from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login, logout

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }
    
# This class overrides the JWTAuthentication get_header function to get the tokens from the cookies instead of the headers.
class CookieTokenAuthentication(JWTAuthentication):
    def get_header(self, request):
        token = request.COOKIES.get("access_token")
        if token is None:
            return None
        return token.encode("utf-8")
    
    def get_raw_token(self, header):
        if header is None:
            return None
        return header if isinstance(header, str) else header.decode("utf-8")

class CreateUserView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = CustomUser.objects.filter(email=email).first()
        
        """ user = authenticate(request, username=email, password=password)
        if user is None:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED) """
        
        if user is None:
            raise AuthenticationFailed('User does not exist')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        
        tokens = get_tokens_for_user(user)
        
        # Set domain in production
        response = Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        response.set_cookie(
            key="access_token",
            value=tokens['access'],
            httponly=True,
            samesite='None',
            secure=True,
        )
        response.set_cookie(
            key = "refresh_token",
            value = tokens['refresh'],
            httponly = True,
            samesite = 'None',
            secure=True,
        )
        return response
    
class RefreshTokenView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response({"error": "Refresh token missing"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            
            response = Response({"message": "Token refreshed successfully"}, status=status.HTTP_200_OK)
            response.set_cookie(
                key = "access_token",
                value = access_token,
                httponly = True,
                samesite = 'None',
                secure=True
            )
            return response
            
        except Exception:
            return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_401_UNAUTHORIZED)
        
class LogoutView(APIView):
    def post(request):
        response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
    
class UserView(APIView):
    authentication_classes = [CookieTokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response(CustomUserSerializer(request.user).data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        serializer = CustomUserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CouncilView(generics.ListAPIView):
    serializer_class = CouncilSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Council.objects.all()
    
class RequestView(generics.ListCreateAPIView):
    serializer_class = RequestSerializers
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Requests.objects.filter(author=self.request.user)
    
    # This is soo beautiful ! Django Generic Views are the best
    def perform_create(self, serializer):
        user = self.request.user
        
        if not user.council:
            raise serializers.ValidationError("User is not associated with any council")
        
        serializer.save(author=user, council=self.request.user.council)
        
class ServicesView(generics.ListAPIView):
    serializer_class = ServicesSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Services.objects.filter(council=self.request.council)
        
class ProjectsView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Projects.objects.filter(council=self.request.council)
    
class ContributionView(generics.ListCreateAPIView):
    serializer_class = ContributionSerializers
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Contributions.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class FeedbackView(generics.CreateAPIView):
    serializer_class = FeedbacksSerializers
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)