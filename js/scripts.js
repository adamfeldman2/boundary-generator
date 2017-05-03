// global variables
const getLat = document.getElementsByClassName('lat');
const getLng = document.getElementsByClassName('lng');
const upperButtonWrapper = document.getElementsByClassName('upper-button-wrapper')[0];
const displayBoundaryButton = document.getElementById('display-boundary');
const getReminder = document.querySelector('.lower-button-wrapper span');
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
    scrollwheel: false,
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

  // onClick of #display-boundary
  displayBoundaryButton.addEventListener('click', function() {
    this.classList.add('inactive');
    document.getElementById('remove-boundary').classList.remove('inactive');

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
  const bounds = new google.maps.LatLngBounds();
  let missingValue = false;

  for(let i = 0; i < getLat.length; i++) {
    if(getLat[i].value === '' || getLng[i].value === '') {
      missingValue = true;
    }
  }

  if(missingValue !== true) {
    polygonCoords.length = 0; // empties array before add new coords
      // loops through all coordinate-objects and passes each to polygonCoords array
      for(let i = 0; i < getLat.length; i++) {
        polygonCoords.push(new google.maps.LatLng(parseFloat(getLat[i].value),parseFloat(getLng[i].value))
      );
    }

    for (let i = 0; i < polygonCoords.length; i++) {
      bounds.extend(polygonCoords[i]);
    }

    // centers map and fits entire polygon in view
    map.fitBounds(bounds);

  } else {
    displayBoundaryButton.classList.add('active');
    displayBoundaryButton.classList.remove('inactive');
    document.getElementById('remove-boundary').classList.add('inactive');
    upperButtonWrapper.classList.add('error');
    polygonCoords.length = 0;
  }
}

// adds polygon to map
function addPolygon() {
  let missingValue = false;

  for(let i = 0; i < getLat.length; i++) {
    if(getLat[i].value === '' || getLng[i].value === '') {
      missingValue = true;
    }
  }

  const getError = upperButtonWrapper;
  setPolygon.setMap(map);
  if(!upperButtonWrapper.classList.contains('error')) {
    getReminder.classList.add('active');
  }

  if(getError.classList.contains('error') && missingValue === false) {
    upperButtonWrapper.classList.remove('error');
    getReminder.classList.add('active');

  }

  // calls removePolygon()
  removePolygon();
}

// removes polygon from map
function removePolygon() {
  document.getElementById('remove-boundary').addEventListener('click', function() {
    setPolygon.setMap(null);
    this.classList.add('inactive');
    getReminder.classList.remove('active');
    displayBoundaryButton.classList.remove('inactive');
    upperButtonWrapper.classList.remove('error');
  });
}

// add coordinate-group on click of add-coord
function addCoordinate() {
  const lowerButtonWrapper = document.getElementsByClassName('lower-button-wrapper')[0];
  const addCoordinateButton = document.getElementById('add-coord');

  addCoordinateButton.addEventListener('click', function() {
    let numOfCoords = document.getElementsByClassName('coordinate-input-wrapper').length;
    numOfCoords ++; // increment numOfCoords by 1

    const createDiv = document.createElement('div');
    createDiv.setAttribute('class', 'coordinate-input-wrapper');

    const createSpan = document.createElement('span');
    const spanText = document.createTextNode(numOfCoords);
    createSpan.appendChild(spanText);
    createDiv.appendChild(createSpan);

    const createInput1 = document.createElement('input');

    createInput1.setAttribute('type', 'text');
    createInput1.setAttribute('class', 'lat');
    createInput1.setAttribute('placeholder', 'Latitude');

    const commaSpan = document.createElement('span');
    const commaSpanText = document.createTextNode(',');
    commaSpan.appendChild(commaSpanText);

    const createInput2 = document.createElement('input');
    createInput2.setAttribute('type', 'text');
    createInput2.setAttribute('class', 'lng');
    createInput2.setAttribute('placeholder', 'Longitude');

    createDiv.appendChild(createInput1);
    createDiv.appendChild(commaSpan);
    createDiv.appendChild(createInput2);

    lowerButtonWrapper.insertAdjacentElement('beforebegin', createDiv);

  });
}

function removeCoordinate() {
  const removeCoordinateButton = document.getElementById('remove-coord');
  let numOfCoords = document.getElementsByClassName('coordinate-input-wrapper').length;
  const coordinates = document.getElementsByClassName('coordinate-input-wrapper');

  removeCoordinateButton.addEventListener('click', function() {
    coordinates[coordinates.length - 1].parentNode.removeChild(coordinates[coordinates.length - 1]);
    numOfCoords --;
  });
}

// stores functions to be initiated
function init() {
  addCoordinate();
  removeCoordinate()
}

// call init()
init();
