function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 43.653254, lng: -79.384132},
    mapTypeId: 'terrain'
  });

  // Define the LatLng coordinates for the polygon's path.
  let triangleCoords = [
    // {lat: 29.774, lng: -80.190},
    // {lat: 28.466, lng: -66.118},
    // {lat: 32.321, lng: -69.757},
    // {lat: 29.774, lng: -80.190}
  ];

  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);
}

function initAutocomplete() {
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

function getCoords() {
  const getResults = document.getElementById('results-button');
  const getLat = document.getElementsByClassName('lat');
  const getLng = document.getElementsByClassName('lng');
  let polygonCoords = []; // will hold all coord objects

  getResults.addEventListener('click', function() {
    // loops through all coordinate-objects and passes each to polygonCoords array
    for(let i = 0; i < getLat.length; i++) {
      polygonCoords.push({lat: parseFloat(getLat[i].value), lng: parseFloat(getLng[i].value)});
    }
    console.log(polygonCoords);
  });
}


function init() {
  getCoords();
}

init();
