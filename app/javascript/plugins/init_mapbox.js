import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');

const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pdunleav/cjofefl7u3j3e2sp0ylex3cyb'
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {

    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

    // Create a HTML element for your custom marker
    const element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = `url('${marker.image_url}')`;
    element.style.backgroundSize = 'contain';
    element.style.width = '50px';
    element.style.height = '50px';
  
    // Pass the element as an argument to the new marker
    new mapboxgl.Marker(element)
      .setLngLat([marker.lng, marker.lat])

      .setPopup(popup)
      .addTo(map);
    mapMarkers.push(newMarker)
    // We use the "getElement" funtion provided by mapbox-gl to access to the marker's HTML an set an id
    newMarker.getElement().dataset.markerId = marker.id;
    // // Put a microphone on the new marker listening for a mouseenter event
    newMarker.getElement().addEventListener('mouseenter', (e) => toggleCardHighlighting(e) );
    // // We put a microphone on listening for a mouseleave event
    newMarker.getElement().addEventListener('mouseleave', (e) => toggleCardHighlighting(e) );
  });
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

const openInfoWindow = (markers) => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
          markers[index].togglePopup();
          debugger
  });
  card.addEventListener('mouseleave', () => {
      markers[index].togglePopup();
    });
  });
}

const toggleCardHighlighting = (event) => {
    const card = document.querySelector(`[data-flat-id="${event.currentTarget.dataset.markerId}"]`);
    card.classList.toggle('highlight');
}


const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
    openInfoWindow(mapMarkers);
  }
};

export { initMapbox };