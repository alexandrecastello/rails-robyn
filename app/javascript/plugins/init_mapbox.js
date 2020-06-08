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
    markersToMap(map, markers);
    fitMapMarker(map, markers);
  }
};

// ********************** //
// change code below to add info windows (go to application.scss for CSS)

const markersToMap = (map, markers) => {
  markers.forEach((marker) => {
    // const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      //.setPopup(popup)
      .addTo(map);
  });
};

// *********************** //
const fitMapMarker = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

export { initMapbox };