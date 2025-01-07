import {
    displayNearbyStores,
    setStoreNavigation,
} from './stores.js';

import {
    displayNearbyWishlists,
    displayMyRequests,
    displayMyTrips,
    createWishlist,
    updateWishlistStatus,
} from './wishlists.js';

import {
    addMap,
    addGeocoder,
} from './map.js';

import { fetchNearbyStores } from './api.js';
import { formatDate } from './helpers.js';

export const USERNAME = document.body.getAttribute('data-username');

let MAP = {};

MAP = addMap();

addGeocoder(MAP, (data) => {
    Promise.all([
        displayNearbyStores(MAP, data.result.center[1], data.result.center[0]),
        displayNearbyWishlists(data.result.center[1], data.result.center[0]),
        displayMyRequests(data.result.center[1], data.result.center[0]),
        displayMyTrips(data.result.center[1], data.result.center[0])
    ]).then(([storesGeoJson]) => {
        setStoreNavigation(MAP, storesGeoJson);
    });
  
});

document.getElementById('add-wishlist').onclick = function(e) {
    createWishlist();
}

const wishlists = document.getElementsByClassName('wishlists');

for (let i=0; i<wishlists.length; i++) {
    wishlists[i].addEventListener('click', updateWishlistStatus);
}

// Initialize the application
async function initializeApp() {
    try {
        const stores = await fetchNearbyStores(37.7749, -122.4194); // Example coordinates for San Francisco
        console.log('Nearby stores:', stores);
    } catch (error) {
        console.error('Error fetching nearby stores:', error);
    }
}

// Call the initialize function to start the application
initializeApp();
