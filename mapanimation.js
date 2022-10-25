var markers = [];
var element = document.getElementById('map');

//get access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3NwMTYiLCJhIjoiY2w5MnRuNmtnMWs3aDNvcDI4cjA0b2w0MiJ9.oeGt-i4ppEjx03CM0j1iuw';

// This is the map instance

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.104081, 42.365554],
        zoom: 12,
      });
    
    
      //let marker = new mapboxgl.Marker();
      //marker.setLngLat([-71.104081, 42.365554]);
      //marker.addTo(map);

async function run(){
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);
    locations.forEach((bus) => {
        var marker = new mapboxgl.Marker()
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .addTo(map);
        
        markers.push(marker);
    })

    
    
}
//timer
setTimeout(run, 15000);

//remove marker from map
function removeMarker(){
    if (markers !== null){
        for(let i = markers.length - 1; i >= 0; i--){
            markers[i].remove();
        }
    }
}
//timer to remove marker
setTimeout(removeMarker, 5000);

// Request bus data from MBTA
async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
    
}
//load
map.on('load', function(){
    run();
});