// global variables
const displayBoundaryButton = document.getElementById('display-boundary');
const removeBoundaryButton = document.getElementById('remove-boundary');
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
    center: { lat: 43.653254, lng: -79.384132 },
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    styles: googleMapStylesArray
  });

  // onClick of #display-boundary
  displayBoundaryButton.addEventListener('click', function() {
    // Empty polygonCoords array
    polygonCoords.length = 0;
    
    // function that returns a completed promise  
    convertGeoCodeToCoordsPromise()
      
    //  if successful, run, .then
    .then(function() {
      // set display boundary button to .inactive
      displayBoundaryButton.classList.add('inactive');
      // remove class of inactive from remove boundary button
      document.getElementById('remove-boundary').classList.remove('inactive');

        const bounds = new google.maps.LatLngBounds();
        setPolygon = new google.maps.Polygon({
          paths: polygonCoords,
          strokeColor: '#5a8c7d',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#5a8c7d',
          fillOpacity: 0.35
        });
        for (let i = 0; i < polygonCoords.length; i++) {
          bounds.extend(polygonCoords[i]);
        }
        // method that centers the polygon on the map
        map.fitBounds(bounds);
        // adds the polygon to the map
        setPolygon.setMap(map);
      })
      //  if promise is unsuccessful, run, .catch
      .catch(function() {
        console.log('Uh oh! It looks like there was an error 😱');
      });
  });
}

function convertGeoCodeToCoordsPromise() {
  // create new promise
  const promise = new Promise(function(resolve, reject) {
    // create new Geocoder Google Maps object
    const geocoder = new google.maps.Geocoder();
    // store all .geo elements in variable
    const geocodeInput = document.querySelectorAll('.geo');

    geocodeInput.forEach((input, i) => {
      // transform input value to a coordinate
      geocoder.geocode({ 'address': input.value }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();
          // push the coordinate to the polygonCoords array
          polygonCoords.push(new google.maps.LatLng(latitude, longitude));

          // once the loop has completed, call the resolve function of the promise
          if (polygonCoords.length === geocodeInput.length) {
            resolve();
          }
          // runs if there is an error with the user's input values
        } else {
          alert(`Input field ${i + 1} is invalid. Try again.`);
        }
      });
    });
  });

  // return function as a fulfilled or unfulfilled promise
  return promise;
}

function removePolygon() {
  // removes polygon from map
  setPolygon.setMap(null);
  removeBoundaryButton.classList.add('inactive');
  displayBoundaryButton.classList.remove('inactive');
}

// add coordinate-group on click of add-coord
function addCoordinate() {
  const lowerButtonWrapper = document.querySelector('.lower-button-wrapper');
  const addCoordinateButton = document.getElementById('add-coord');

  addCoordinateButton.addEventListener('click', function() {
    if (displayBoundaryButton.classList.contains('inactive')) {
      // clears the map
      removePolygon();
    }

    let numOfCoords = document.getElementsByClassName('coordinate-input-wrapper').length;
    numOfCoords++; // increment numOfCoords by 1

    const newInputs = `
        <span>${numOfCoords}</span>
        <input type="text" class="geo" placeholder="" required>
      `;

    const createDiv = document.createElement('div');
    createDiv.setAttribute('class', 'coordinate-input-wrapper');
    createDiv.innerHTML = newInputs;
    document.querySelector('.inputs-container').appendChild(createDiv);
  });
}

function removeCoordinate() {
  const removeCoordinateButton = document.getElementById('remove-coord');
  let numOfCoords = document.getElementsByClassName('coordinate-input-wrapper').length;
  const coordinates = document.getElementsByClassName('coordinate-input-wrapper');

  removeCoordinateButton.addEventListener('click', function() {
    if (displayBoundaryButton.classList.contains('inactive')) {
      // clears the map
      removePolygon();
    }

    coordinates[coordinates.length - 1].parentNode.removeChild(coordinates[coordinates.length - 1]);
    numOfCoords--;
  });
}

// stores functions to be initiated
function init() {
  addCoordinate();
  removeCoordinate();
  removeBoundaryButton.addEventListener('click', removePolygon);

}

init();