from django.test import TestCase
from django.urls import reverse

# Test case for the HomePage view
class HomePageTests(TestCase):
    
    def test_home_page_renders_correct_template(self):
        # Test that the home page renders the correct template
        response = self.client.get(reverse('home-page'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home/index.html')
    
    def test_home_page_displays_username(self):
        # Test that the home page displays the username
        response = self.client.get(reverse('home-page'), {'username': 'testuser'})
        self.assertContains(response, 'Welcome, testuser')
