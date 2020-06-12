import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const buildMap = (mapElement) => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });
};

const addMarkersToMap = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach((marker) => {

    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    const newMarker = new mapboxgl.Marker();
    const mapMarkers = [];
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
    bounds.extend([ marker.lng, marker.lat ])
  });
  map.fitBounds(bounds);

};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker =>{
   bounds.extend([ marker.lng, marker.lat ])
  });
  map.fitBounds(bounds);
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
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const map = buildMap(mapElement);
    const markers = JSON.parse(mapElement.dataset.markers);
    const mapMarkers = [];
    addMarkersToMap(map, markers);
    // fitMapToMarkers(map, markers);
    openInfoWindow(mapMarkers);
  }
};

export { initMapbox };




/*
<div id="map" style="width: 100%; height: 600px;" data-markers="[{&quot;lat&quot;:36.7014631,&quot;lng&quot;:-118.7559974,&quot;infoWindow&quot;:&quot;\u003cdiv class=\&quot;info window\&quot;\u003e\n  \u003ch5\u003eRescued?\u003ch5\u003e\u003ch6\u003eNão, apenas vi.\u003ch6\u003e\n  \u003ch5\u003eSpotted Time:\u003ch5\u003e\u003ch6\u003e 12/Jun/20 às 12:20\u003ch6\u003e\n  \u003ch5\u003eSpotted by\u003ch5\u003e\u003ch6\u003e \u003ca href=\&quot;/pets/2\&quot;\u003etest\u003c/a\u003e\u003ch6\u003e\n\u003c/div\u003e&quot;,&quot;image_url&quot;:&quot;http://localhost:3000/assets/icons8-marker-48-fcf07e2239a7b489861af7d4057825a8ecc24a1d85a16a8a3570a0f9e8dd6c09.png&quot;},{&quot;lat&quot;:-23.5402524,&quot;lng&quot;:-46.5766424,&quot;infoWindow&quot;:&quot;\u003cdiv class=\&quot;info window\&quot;\u003e\n  \u003ch5\u003eVisto pela última vez em:\u003ch5\u003e\n  \u003ch6\u003etatuapé\u003ch6\u003e\n\u003c/div\u003e&quot;,&quot;image_url&quot;:&quot;http://localhost:3000/assets/icons8-dog-house-50-cae629837b84808af8a58157b7925552e058bc651fe68b70af2ac599c33e482f.png&quot;}]" data-mapbox-api-key="pk.eyJ1IjoiYWxlY2FzdGVsbG8iLCJhIjoiY2thOG1paXJ5MGRlMTJ6bnZ3c2RxcHh3byJ9.F8nu4xGGinzGCvik0MIc9A" class="mapboxgl-map">
<div class="mapboxgl-canary" style="visibility: hidden;"></div><div class="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate"><canvas class="mapboxgl-canvas" tabindex="0" aria-label="Map" width="432" height="480" style="width: 540px; height: 600px;"></canvas><div class="marker mapboxgl-marker mapboxgl-marker-anchor-center" tabindex="0" style="background-image: url(&quot;http://localhost:3000/assets/icons8-marker-48-fcf07e2239a7b489861af7d4057825a8ecc24a1d85a16a8a3570a0f9e8dd6c09.png&quot;); background-size: contain; width: 50px; height: 50px; transform: translate(-50%, -50%) translate(-704934px, 97411px) rotateX(0deg) rotateZ(0deg);"></div><div class="marker mapboxgl-marker mapboxgl-marker-anchor-center" tabindex="0" style="background-image: url(&quot;http://localhost:3000/assets/icons8-dog-house-50-cae629837b84808af8a58157b7925552e058bc651fe68b70af2ac599c33e482f.png&quot;); background-size: contain; width: 50px; height: 50px; transform: translate(-50%, -50%) translate(-284459px, 468700px) rotateX(0deg) rotateZ(0deg);"></div></div><div class="mapboxgl-control-container"><div class="mapboxgl-ctrl-top-left"></div><div class="mapboxgl-ctrl-top-right"></div><div class="mapboxgl-ctrl-bottom-left"><div class="mapboxgl-ctrl" style="display: block;"><a class="mapboxgl-ctrl-logo" target="_blank" rel="noopener nofollow" href="https://www.mapbox.com/" aria-label="Mapbox logo"></a></div></div><div class="mapboxgl-ctrl-bottom-right"><div class="mapboxgl-ctrl mapboxgl-ctrl-attrib mapboxgl-compact"><div class="mapboxgl-ctrl-attrib-inner"><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a class="mapbox-improve-map" href="https://apps.mapbox.com/feedback/?owner=alecastello&amp;id=ckb9tchky1br51hkdvpli9dnv&amp;access_token=pk.eyJ1IjoiYWxlY2FzdGVsbG8iLCJhIjoiY2thOG1paXJ5MGRlMTJ6bnZ3c2RxcHh3byJ9.F8nu4xGGinzGCvik0MIc9A" target="_blank" rel="noopener nofollow">Improve this map</a></div></div></div></div></div>

<div id="map" style="width: 100%; height: 600px;" data-markers="[{&quot;lat&quot;:36.7014631,&quot;lng&quot;:-118.7559974,&quot;infoWindow&quot;:&quot;\u003cdiv class=\&quot;info window\&quot;\u003e\n  \u003ch5\u003eRescued?\u003ch5\u003e\u003ch6\u003eNão, apenas vi.\u003ch6\u003e\n  \u003ch5\u003eSpotted Time:\u003ch5\u003e\u003ch6\u003e 12/Jun/20 às 12:20\u003ch6\u003e\n  \u003ch5\u003eSpotted by\u003ch5\u003e\u003ch6\u003e \u003ca href=\&quot;/pets/2\&quot;\u003etest\u003c/a\u003e\u003ch6\u003e\n\u003c/div\u003e&quot;,&quot;image_url&quot;:&quot;http://localhost:3000/assets/icons8-marker-48-fcf07e2239a7b489861af7d4057825a8ecc24a1d85a16a8a3570a0f9e8dd6c09.png&quot;},{&quot;lat&quot;:-23.5402524,&quot;lng&quot;:-46.5766424,&quot;infoWindow&quot;:&quot;\u003cdiv class=\&quot;info window\&quot;\u003e\n  \u003ch5\u003eVisto pela última vez em:\u003ch5\u003e\n  \u003ch6\u003etatuapé\u003ch6\u003e\n\u003c/div\u003e&quot;,&quot;image_url&quot;:&quot;http://localhost:3000/assets/icons8-dog-house-50-cae629837b84808af8a58157b7925552e058bc651fe68b70af2ac599c33e482f.png&quot;}]" data-mapbox-api-key="pk.eyJ1IjoiYWxlY2FzdGVsbG8iLCJhIjoiY2thOG1paXJ5MGRlMTJ6bnZ3c2RxcHh3byJ9.F8nu4xGGinzGCvik0MIc9A" class="mapboxgl-map">
<div class="mapboxgl-canary" style="visibility: hidden;"></div><div class="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate"><canvas class="mapboxgl-canvas" tabindex="0" aria-label="Map" width="460" height="480" style="width: 575px; height: 600px;"></canvas><div class="marker mapboxgl-marker mapboxgl-marker-anchor-center" tabindex="0" style="background-image: url(&quot;http://localhost:3000/assets/icons8-marker-48-fcf07e2239a7b489861af7d4057825a8ecc24a1d85a16a8a3570a0f9e8dd6c09.png&quot;); background-size: contain; width: 50px; height: 50px; transform: translate(-50%, -50%) translate(70px, 108px) rotateX(0deg) rotateZ(0deg);"></div><div class="marker mapboxgl-marker mapboxgl-marker-anchor-center" tabindex="0" style="background-image: url(&quot;http://localhost:3000/assets/icons8-dog-house-50-cae629837b84808af8a58157b7925552e058bc651fe68b70af2ac599c33e482f.png&quot;); background-size: contain; width: 50px; height: 50px; transform: translate(-50%, -50%) translate(505px, 492px) rotateX(0deg) rotateZ(0deg);"></div></div><div class="mapboxgl-control-container"><div class="mapboxgl-ctrl-top-left"></div><div class="mapboxgl-ctrl-top-right"></div><div class="mapboxgl-ctrl-bottom-left"><div class="mapboxgl-ctrl" style="display: block;"><a class="mapboxgl-ctrl-logo" target="_blank" rel="noopener nofollow" href="https://www.mapbox.com/" aria-label="Mapbox logo"></a></div></div><div class="mapboxgl-ctrl-bottom-right"><div class="mapboxgl-ctrl mapboxgl-ctrl-attrib mapboxgl-compact"><div class="mapboxgl-ctrl-attrib-inner"><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a class="mapbox-improve-map" href="https://apps.mapbox.com/feedback/?owner=alecastello&amp;id=ckb9tchky1br51hkdvpli9dnv&amp;access_token=pk.eyJ1IjoiYWxlY2FzdGVsbG8iLCJhIjoiY2thOG1paXJ5MGRlMTJ6bnZ3c2RxcHh3byJ9.F8nu4xGGinzGCvik0MIc9A" target="_blank" rel="noopener nofollow">Improve this map</a></div></div></div></div></div>

<div id="map" style="width: 100%; height: 600px;" data-markers="[{&quot;lat&quot;:36.7014631,&quot;lng&quot;:-118.7559974,&quot;infoWindow&quot;:&quot;\u003cdiv class=\&quot;info window\&quot;\u003e\n  \u003ch5\u003eRescued?\u003ch5\u003e\u003ch6\u003eNão, apenas vi.\u003ch6\u003e\n  \u003ch5\u003eSpotted Time:\u003ch5\u003e\u003ch6\u003e 12/Jun/20 às 12:20\u003ch6\u003e\n  \u003ch5\u003eSpotted by\u003ch5\u003e\u003ch6\u003e \u003ca href=\&quot;/pets/2\&quot;\u003etest\u003c/a\u003e\u003ch6\u003e\n\u003c/div\u003e&quot;,&quot;image_url&quot;:&quot;http://localhost:3000/assets/icons8-marker-48-fcf07e2239a7b489861af7d4057825a8ecc24a1d85a16a8a3570a0f9e8dd6c09.png&quot;},{&quot;lat&quot;:-23.5402524,&quot;lng&quot;:-46.5766424,&quot;infoWindow&quot;:&quot;\u003cdiv class=\&quot;info window\&quot;\u003e\n  \u003ch5\u003eVisto pela última vez em:\u003ch5\u003e\n  \u003ch6\u003etatuapé\u003ch6\u003e\n\u003c/div\u003e&quot;,&quot;image_url&quot;:&quot;http://localhost:3000/assets/icons8-dog-house-50-cae629837b84808af8a58157b7925552e058bc651fe68b70af2ac599c33e482f.png&quot;}]" data-mapbox-api-key="pk.eyJ1IjoiYWxlY2FzdGVsbG8iLCJhIjoiY2thOG1paXJ5MGRlMTJ6bnZ3c2RxcHh3byJ9.F8nu4xGGinzGCvik0MIc9A" class="mapboxgl-map">
<div class="mapboxgl-canary" style="visibility: hidden;"></div><div class="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate"><canvas class="mapboxgl-canvas" tabindex="0" aria-label="Map" width="432" height="480" style="width: 540px; height: 600px;"></canvas><div class="marker mapboxgl-marker mapboxgl-marker-anchor-center" tabindex="0" style="background-image: url(&quot;http://localhost:3000/assets/icons8-marker-48-fcf07e2239a7b489861af7d4057825a8ecc24a1d85a16a8a3570a0f9e8dd6c09.png&quot;); background-size: contain; width: 50px; height: 50px; transform: translate(-50%, -50%) translate(70px, 123px) rotateX(0deg) rotateZ(0deg);"></div><div class="marker mapboxgl-marker mapboxgl-marker-anchor-center" tabindex="0" style="background-image: url(&quot;http://localhost:3000/assets/icons8-dog-house-50-cae629837b84808af8a58157b7925552e058bc651fe68b70af2ac599c33e482f.png&quot;); background-size: contain; width: 50px; height: 50px; transform: translate(-50%, -50%) translate(470px, 477px) rotateX(0deg) rotateZ(0deg);"></div></div><div class="mapboxgl-control-container"><div class="mapboxgl-ctrl-top-left"></div><div class="mapboxgl-ctrl-top-right"></div><div class="mapboxgl-ctrl-bottom-left"><div class="mapboxgl-ctrl" style="display: block;"><a class="mapboxgl-ctrl-logo" target="_blank" rel="noopener nofollow" href="https://www.mapbox.com/" aria-label="Mapbox logo"></a></div></div><div class="mapboxgl-ctrl-bottom-right"><div class="mapboxgl-ctrl mapboxgl-ctrl-attrib mapboxgl-compact"><div class="mapboxgl-ctrl-attrib-inner"><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a class="mapbox-improve-map" href="https://apps.mapbox.com/feedback/?owner=alecastello&amp;id=ckb9tgfy41c661itds5i1hw7d&amp;access_token=pk.eyJ1IjoiYWxlY2FzdGVsbG8iLCJhIjoiY2thOG1paXJ5MGRlMTJ6bnZ3c2RxcHh3byJ9.F8nu4xGGinzGCvik0MIc9A" target="_blank" rel="noopener nofollow">Improve this map</a></div></div></div></div></div>
*/ 