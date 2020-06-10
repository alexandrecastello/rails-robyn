import mapboxgl from 'mapbox-gl';


// ********************** //

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // build map only if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      //map HTML container here (map will create only if this div exists)
      container: 'map',
      // map style here
      style: 'mapbox://styles/mapbox/streets-v10'
    });
    //change markers here
    const markers = JSON.parse(mapElement.dataset.markers);
    const mapMarkers = [];
    markersToMap(markers);
    fitMapMarker(map, markers);
    openInfoWindow(mapMarkers);
  }
};

// ********************** //
// change code below to add info windows (go to application.scss for CSS) //

const markersToMap = (markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    const newMarker = new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
      mapMarkers.push(newMarker)
      // We use the "getElement" funtion provided by mapbox-gl to access to the marker's HTML an set an id
      newMarker.getElement().dataset.markerId = marker.id;
      // Put a microphone on the new marker listening for a mouseenter event
      newMarker.getElement().addEventListener('mouseenter', (e) => toggleCardHighlighting(e) );
      // We put a microphone on listening for a mouseleave event
      newMarker.getElement().addEventListener('mouseleave', (e) => toggleCardHighlighting(e) );
  });
};

// *********************** //
// Don't change this block - Fitting map and markers //

const fitMapMarker = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

// ************************ //
// Open Card window on toggle //


const openInfoWindow = (markers) => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      markers[index].togglePopup();
    });
    card.addEventListener('mouseleave', () => {
      markers[index].togglePopup();
    });
  });
}

// *********************** //
// Highlighting card when toggling through map //

const toggleCardHighlighting = (event) => {
  // We select the card corresponding to the marker's id
  const card = document.querySelector(`[data-flat-id="${event.currentTarget.dataset.markerId}"]`);
  // Then we toggle the class "highlight github" to the card
  card.classList.toggle('highlight');
}

export { initMapbox };