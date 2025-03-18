from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = CustomUser
        fields = ['email', 'council', 'password', 'first_name', 'last_name', 'phone', 'address']
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class CouncilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Council
        fields = "__all__"
    
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = "__all__"
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = "__all__"
        
class ProjectImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProjectImages
        fields = "__all__"
        extra_kwargs = {"project": {"write_only": True}}
        
class RequestSerializers(serializers.ModelSerializer):
    council = serializers.CharField(read_only=True)
    class Meta:
        model = Requests
        fields = "__all__"
        read_only_fields = ['author', 'status', 'created_at']
        
class ContributionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contributions
        fields = "__all__"
        extra_kwargs = {"author": {"read_only": True}}
        
class FeedbacksSerializers(serializers.ModelSerializer):
    class Meta:
        model = Feedbacks
        fields = "__all__"
        extra_kwargs = {"author": {"read_only": True}}