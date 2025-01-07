from django.contrib import admin
from .models import Store, Wishlist

# Register the Store model with the admin site
@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone', 'distance', 'rating')
    search_fields = ('name', 'address')

# Register the Wishlist model with the admin site
@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('buyer', 'status', 'created_at', 'store')
    search_fields = ('buyer', 'status')
    list_filter = ('status', 'created_at')
