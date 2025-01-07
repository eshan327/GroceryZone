from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer

# View for the home page
class HomePage(viewsets.GenericViewSet):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'home/index.html'
    
    def list(self, request):
        # Get the username from query parameters
        username = self.request.query_params.get('username')
        # Render the response with the username
        return Response({'username': username})