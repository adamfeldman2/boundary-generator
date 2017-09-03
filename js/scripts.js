// global variables
// const getGeo = document.getElementsByClassName('geo');
// const upperButtonWrapper = document.getElementsByClassName('upper-button-wrapper')[0];
const displayBoundaryButton = document.getElementById('display-boundary');
// const getReminder = document.querySelector('.lower-button-wrapper span');
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
    // set display boundary button to .inactive
    this.classList.add('inactive');
    // remove class of inactive from remove boundary button
    document.getElementById('remove-boundary').classList.remove('inactive');

    // function that returns a completed promise  
    convertGeoCodeToCoordsPromise()
      //  if successful, run, .then
      .then(function() {
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

    geocodeInput.forEach((input) => {
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
          console.error('There was an issue with the GeocoderStatus.');
          alert('Invalid input values. Try again.');
        }
      });
    });
  });

  // return function as a fulfilled or unfulfilled promise
  return promise;
}

   



// function getNewCoords() {
//   const bounds = new google.maps.LatLngBounds();
//   let missingValue = false;

//   for (let i = 0; i < getLat.length; i++) {
//     if (getLat[i].value === '' || getLng[i].value === '') {
//       missingValue = true;
//     }
//   }

//   if (!missingValue) {
//     polygonCoords.length = 0; // empties array before add new coords
//     // loops through all coordinate-objects and passes each to polygonCoords array
//     for (let i = 0; i < getLat.length; i++) {
//       // polygonCoords.push(new google.maps.LatLng(parseFloat(getLat[i].value), parseFloat(getLng[i].value))
//       polygonCoords.push(new google.maps.LatLng(parseFloat(getLat[i].value), parseFloat(getLng[i].value)));
//     }

//     for (let i = 0; i < polygonCoords.length; i++) {
//       bounds.extend(polygonCoords[i]);
//     }

//     // centers map and fits entire polygon in view
//     map.fitBounds(bounds);

//   } else {
//     displayBoundaryButton.classList.add('active');
//     displayBoundaryButton.classList.remove('inactive');
//     document.getElementById('remove-boundary').classList.add('inactive');
//     upperButtonWrapper.classList.add('error');
//     polygonCoords.length = 0;
//   }
// }

// adds polygon to map
// function addPolygon() {
//   // let missingValue = false;

//   // for (let i = 0; i < getLat.length; i++) {
//   //   if (getLat[i].value === '' || getLng[i].value === '') {
//   //     missingValue = true;
//   //   }
//   // }

//   const getError = upperButtonWrapper;
//   setPolygon.setMap(map);
//   if (!upperButtonWrapper.classList.contains('error')) {
//     getReminder.classList.add('active');
//   }

//   if (getError.classList.contains('error') && missingValue === false) {
//     upperButtonWrapper.classList.remove('error');
//     getReminder.classList.add('active');
//   }
//   // calls removePolygon()
//   removePolygon();
// }

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
    numOfCoords++; // increment numOfCoords by 1

    const newInputs = `
        <span>${numOfCoords}</span>
        <input type="text" class="lat" placeholder="Latitude" required>
        <span>,</span>
        <input type="text" class="lng" placeholder="Longitude" required>
      `;

    const createDiv = document.createElement('div');
    createDiv.setAttribute('class', 'coordinate-input-wrapper');
    createDiv.innerHTML = newInputs; lowerButtonWrapper.insertAdjacentElement('beforebegin', createDiv);
  });
}

function removeCoordinate() {
  const removeCoordinateButton = document.getElementById('remove-coord');
  let numOfCoords = document.getElementsByClassName('coordinate-input-wrapper').length;
  const coordinates = document.getElementsByClassName('coordinate-input-wrapper');

  removeCoordinateButton.addEventListener('click', function() {
    coordinates[coordinates.length - 1].parentNode.removeChild(coordinates[coordinates.length - 1]);
    numOfCoords--;
  });
}

// stores functions to be initiated
function init() {
  addCoordinate();
  removeCoordinate()
}

init(); // call init()








