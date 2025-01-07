import {
    updateSelectedStore,
} from './stores.js';

mapboxgl.accessToken = 'your-secret-key';

/**
 * @typedef {import('./api').Store} Store
 */

/**
 * Stores GeoJSON Feature object
 * @typedef {Object} StoreFeatureObject
 * @property {'Feature'} type
 * @property {{type: 'Point', coordinates: [number, number] }} geometry
 * @property {Store} properties
 */

/**
 * Stores GeoJSON FeatureCollection
 * @typedef {Object} StoresGeoJSON
 * @property {'FeatureCollection'} type
 * @property {StoreFeatureObject[]} features
 */

/**
 * Create a new mapbox map instance
 * @return {Object} Map
 */
export function addMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [77.645296, 12.978624],
        zoom: 2
    });
    
    map.addControl(new mapboxgl.NavigationControl());

    return map;
}

/**
 * Add a geoCoder control to a mapbox map
 * @param {Object} map
 * @param {function} geocoderCallback - The callback that handles the response.
 */
export function addGeocoder(map, geocoderCallback) {
    const geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl });
    map.addControl(geocoder);
    
    geocoder.on('result', (data) => {
        geocoderCallback(data);
    });
}

/**
 * Converts array of stores to GeoJSON format
 * @param {Store[]} stores
 * @return {StoresGeoJSON} Stores in GeoJSON
 */
export function convertToGeoJson(stores) {
    return {
        type: 'FeatureCollection',
        features: stores.map(store => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [store.longitude, store.latitude]
                },
                properties: {
                    id: store.id,
                    name: store.name,
                    address: store.address,
                    phone: store.phone,
                    distance: store.distance,
                    rating: store.rating,                                                                                                                                                                                                                                                                                                                                                                                                                                       
                }
            }
        })
    }
}

/**
 * Display stores on map
 * @param {Object} map
 * @param {StoresGeoJSON} storesGeoJson
 */
export function plotStoresOnMap(map, storesGeoJson) {
    for (let store of storesGeoJson.features) {
        // create a HTML element for each feature
        let el = document.createElement('div');
        el.className = 'store';
        el.title = `${store.properties.name}\n` +
        `approximately ${store.properties.distance.toFixed(2)} km away\n` +
        `Address: ${store.properties.address || 'N/A'}\n` +
        `Phone: ${store.properties.phone || 'N/A'}\n` +
        `Rating: ${store.properties.rating || 'N/A'}`;
      
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(store.geometry.coordinates)
          .addTo(map);

        el.addEventListener('click', function(e) {
            /* Fly to the point */
            flyToStore(map, store);
            /* Close all other popups and display popup for clicked store */
            displayStoreDetails(map, store);
            updateSelectedStore(store.properties.id);
        });
    }
}

/**
 * Zoom in-to a specific point on a map
 * @param {Object} map
 * @param {StoreFeatureObject} point
 */
export function flyToStore(map, point) {
    map.flyTo({
        center: point.geometry.coordinates,
        zoom: 20
    });
}

/**
 * Display store info on the map using a popup
 * @param {Object} map
 * @param {StoreFeatureObject} point
 */
export function displayStoreDetails(map, point) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]){
        popUps[0].remove();
    }

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(point.geometry.coordinates)
        .setHTML(`
            <details>
                <summary><h2>${point.properties.name}</h2></summary>
                <dl>
                    <dt>Distance</dt>
                    <dd>Approximately <strong>${point.properties.distance.toFixed(2)} km</strong> away</dd>

                    <dt>Address</dt>
                    <dd>${point.properties.address || 'N/A'}</dd>

                    <dt>Phone</dt>
                    <dd>${point.properties.phone || 'N/A'}</dd>

                    <dt>Rating</dt>
                    <dd>${point.properties.rating || 'N/A'}</dd>
                </dl>
            </details>
        `)
        .addTo(map);
    return popup;
}

/**
 * Initialize a map centered at the given coordinates
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} mapElementId - The ID of the HTML element to render the map in
 */
export function initializeMap(latitude, longitude, mapElementId) {
    const map = new google.maps.Map(document.getElementById(mapElementId), {
        center: { lat: latitude, lng: longitude },
        zoom: 12
    });

    // Add a marker at the center
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map
    });
}

/**
 * Create and add a popup to the map
 * @param {Object} map - The map instance
 * @param {Object} coordinates - The coordinates for the popup
 * @param {string} content - The HTML content for the popup
 * @return {Object} The created popup
 */
export function addPopupToMap(map, coordinates, content) {
    const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat([coordinates.lng, coordinates.lat])
        .setHTML(`
            <details>
                <summary>Details</summary>
                <dl>
                    ${content}
                </dl>
            </details>
        `)
        .addTo(map);
    return popup;
}