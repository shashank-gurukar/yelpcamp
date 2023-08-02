
// Parse the JSON string into a JavaScript object and assign it to the 'campground' variable
const campgrounds = JSON.parse(campground);


const coordinates = campgrounds.geometry.coordinates;


mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhc2hhbmstZ3VydWthciIsImEiOiJjbGtwcXI4ZjgybTIxM2prZ3dpNmQ4dWtqIn0.oDl1b4ApWzfljGg8dXSOBQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: coordinates,
  zoom: 9
});

new mapboxgl.Marker()
  .setLngLat(coordinates)
  .addTo(map);
