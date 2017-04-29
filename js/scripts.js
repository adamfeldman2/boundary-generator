// global variables
let polygonCoords = [ // will hold all coord objects
  // {lat: 43.653254, lng: -79.384132},
  // {lat: 43.660492, lng: -79.404731},
  // {lat: 43.677255, lng: -79.370828}
];
let map;
let setPolygon;

// builds initial map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 43.653254, lng: -79.384132},
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#716464"},{"weight":"0.01"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"},{"color":"#a05519"},{"saturation":"-13"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#84afa3"},{"lightness":52}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"}]}]
  });


  // onClick of #results-button
  document.getElementById('results-button').addEventListener('click', function() {
    getNewCoords() // calls getNewCoords()

    setPolygon = new google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: '#5a8c7d',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#5a8c7d',
      fillOpacity: 0.35
    });
    addPolygon(); // calls addPolygon();
  });
}

function getNewCoords() {
  const getLat = document.getElementsByClassName('lat');
  const getLng = document.getElementsByClassName('lng');
  const bounds = new google.maps.LatLngBounds();

  polygonCoords.length = 0; // empties array before add new coords
  // loops through all coordinate-objects and passes each to polygonCoords array
  for(let i = 0; i < getLat.length; i++) {
    polygonCoords.push(new google.maps.LatLng(parseFloat(getLat[i].value),parseFloat(getLng[i].value))
    );
  }

  for (i = 0; i < polygonCoords.length; i++) {
    bounds.extend(polygonCoords[i]);
  }
  
  // centers map and fits entire polygon in view
  map.fitBounds(bounds);
}

// adds polygon to map
function addPolygon() {
  setPolygon.setMap(map);

  // calls removePolygon()
  removePolygon();
}

// removes polygon from map
function removePolygon() {
  document.getElementById('remove-boundary').addEventListener('click', function() {
    setPolygon.setMap(null);
  });
}
