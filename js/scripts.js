// global variables
const getResults = document.getElementById('results-button');
const getLat = document.getElementsByClassName('lat');
const getLng = document.getElementsByClassName('lng');

let polygonCoords = [ // will hold all coord objects
  // {lat: 43.653254, lng: -79.384132},
  // {lat: 43.660492, lng: -79.404731},
  // {lat: 43.677255, lng: -79.370828},
  // {lat: 43.653254, lng: -79.384132}
];

// builds initial map
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 43.653254, lng: -79.384132},
    mapTypeId: 'terrain'
  });

  getResults.addEventListener('click', function() {
    getNewCoords() // calls getNewCoords()

    const setPolygon = new google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });

    setPolygon.setMap(map); // sets new polygon on map
  });
}

function getNewCoords() {
  polygonCoords.length = 0; // empties array before add new coords

  // loops through all coordinate-objects and passes each to polygonCoords array
  for(let i = 0; i < getLat.length; i++) {
    polygonCoords.push(
      {
        lat: parseFloat(getLat[i].value),
        lng: parseFloat(getLng[i].value)
      }
    );
  }
  polygonCoords.push(polygonCoords[0]); // add first coord object to end of array to close polygon
}

function init() {
}

init();
