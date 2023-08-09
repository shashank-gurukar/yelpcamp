console.log('imported')

// Parse the JSON string into a JavaScript object and assign it to the 'campground' variable
// console.log(campground)
// const campgrounds = JSON.parse(campground);


const coordinates = campground.geometry.coordinates;
// console.log(campgrounds)

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhc2hhbmstZ3VydWthciIsImEiOiJjbGtwcXI4ZjgybTIxM2prZ3dpNmQ4dWtqIn0.oDl1b4ApWzfljGg8dXSOBQ';
const map = new mapboxgl.Map({
  container: 'cluster-map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: coordinates,
  zoom: 9
});

new mapboxgl.Marker()
  .setLngLat(coordinates)
  .setPopup(
    new mapboxgl.Popup({offset:25})
    .setHTML(
      `<h3 style="text-decoration:none">${campground.name}</h3>`
    )
  )
  .addTo(map);
