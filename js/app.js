function handleGeolocationError(error) {
  console.log("Error getting geolocation:", error.message);
}

var HumanIcon = L.icon({
  iconUrl: '../../img/icons/walking.png',
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32] 
});

const universityBoundary = [
  [38.2871,21.7772], 
  [38.2993,21.7985], 
  [38.2940,21.8042], 
  [38.2897,21.7974], 
  [38.2856,21.7997], 
  [38.2793,21.7877], 
  [38.2871,21.7772]  
];

var selectedLanguage = localStorage.getItem('selectedLanguage') || 'English'; // Default to English if not set

// Check if the point is within the university boundary
function isWithinUniversityBoundary(lat, lng) {
  let x = lat, y = lng;
  let inside = false;
  for (let i = 0, j = universityBoundary.length - 1; i < universityBoundary.length; j = i++) {
    let xi = universityBoundary[i][0], yi = universityBoundary[i][1];
    let xj = universityBoundary[j][0], yj = universityBoundary[j][1];

    let intersect = ((yi > y) != (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

var marker, circle;

function getPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var accuracy = position.coords.accuracy;

  var selectedLanguage = localStorage.getItem('selectedLanguage') || 'English'; // Default to English if not set

  // Determine the message based on the selected language
  var locationMessage = selectedLanguage === 'Ελληνικά' ? 'Τρέχουσα τοποθεσία' : 'Current location';

  // Check if the current location is within the university boundary
  if (isWithinUniversityBoundary(lat, long)) {
    document.getElementById('currentLocation').value = locationMessage; 
    knownLocations['currentLocation'] = [lat, long];

    if (marker) {
      map.removeLayer(marker);
    }
    if (circle) {
      map.removeLayer(circle);
    }

    marker = L.marker([lat, long], {icon: HumanIcon}).addTo(map);
    circle = L.circle([lat, long], {radius: accuracy}).addTo(map);
    map.setView([lat, long], 16);
  } else if (selectedLanguage === 'Ελληνικά') {
      Swal.fire({
        title: 'Ειδοποίηση',
        html: 'Η τρέχουσα τοποθεσία σου είναι <b>εκτός</b> του πανεπιστημίου Πατρών.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }else {
    // Handle case when outside the university boundary
    Swal.fire({
      title: 'Location Alert',
      html: 'Your current location is <b>outside</b> the University of Patras.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    
    // Clear the currentLocation input or handle as needed
    document.getElementById('currentLocation').value = "";
    
    if (marker) {
      map.removeLayer(marker);
    }
    if (circle) {
      map.removeLayer(circle);
    }
  }
}
  


//
function decodePolyline(encoded) {
  var points = [];
  var index = 0, lat = 0, lng = 0, shift = 0, result = 0, byte = null, latitude_change, longitude_change,
      factor = Math.pow(10, 5); // The factor is used to convert the decoded values back to their original scale.

  // Loop through the encoded string.
  while (index < encoded.length) {
    // Reset variables for decoding the next latitude or longitude value.
    byte = null;
    shift = 0;
    result = 0;

    // Decode a single latitude or longitude value.
    do {
      // Retrieve the next byte value from the encoded string.
      byte = encoded.charCodeAt(index++) - 63;
      // Accumulate bits of the result, shifted left by the appropriate amount.
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20); // Continue until we encounter a byte that signifies the end of this value.

    // Apply a post-processing step to restore the original value, accounting for sign.
    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
    // Reset for decoding the next value.
    shift = result = 0;

    // Repeat the process to decode the longitude change.
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    // Decode the longitude change.
    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    // Update the current latitude and longitude by adding the changes.
    lat += latitude_change;
    lng += longitude_change;

    // Add the decoded latitude and longitude to the points array, converting them back to float.
    points.push([(lat / factor).toFixed(5), (lng / factor).toFixed(5)]);
  }

  // Convert the string representations of latitude and longitude back to floats.
  return points.map(point => [parseFloat(point[0]), parseFloat(point[1])]);
}

// Helper function to remove accents/diacritics
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Normalize the location key for consistent matching
function normalizeLocationKey(location) {
  return removeAccents(location.trim().toLowerCase().replace(/\s/g, ''));
}

// location name to geographic coordinates
function geocodeLocation(inputId) {
  var locationInput = document.getElementById(inputId).value;
  var normalizedInput = normalizeLocationKey(locationInput);

  // Initially, try to find an exact match
  var matchedLocationKey = Object.keys(knownLocations).find(function (knownLocation) {
    return normalizeLocationKey(knownLocation) === normalizedInput;
  });

  // If an exact match is found, return it immediately
  if (matchedLocationKey) {
    return knownLocations[matchedLocationKey];
  } else {
    // If no exact match, find the closest match using Levenshtein distance
    let closestMatch = null;
    let smallestDistance = Infinity;
    Object.keys(knownLocations).forEach(function(knownLocation) {
      const distance = getLevenshteinDistance(normalizedInput, normalizeLocationKey(knownLocation));
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestMatch = knownLocation;
      }
    });

    if (closestMatch && smallestDistance <= 3) { // Threshold of 3 is arbitrary; adjust as needed
      return knownLocations[closestMatch];
    } else {
      // If no close matches are found, return null or handle as needed
      return null;
    }
  }
}


// Function to suggest locations based on user input
let debounceTimeout;

// Function to suggest locations based on user input
function suggestLocations(inputId) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const inputElement = document.getElementById(inputId);
    const userInput = normalizeLocationKey(inputElement.value.trim());
    const suggestionBoxId = inputId + 'Suggestions';
    const suggestionBox = document.getElementById(suggestionBoxId);

    suggestionBox.innerHTML = ''; // Clear existing suggestions

    let selectedLanguage = localStorage.getItem('selectedLanguage') || 'Ελληνικά';

    // Corrected variable names to what was likely intended
    let locationsObject = selectedLanguage === 'Ελληνικά' ? knownLocationsgrmona : knownLocationsenmona;
    let combinedLocations = Object.assign({}, knownLocationsen, knownLocationsgr);
    let suggestions = [];
    if (userInput.length === 0) {
      // If the input field is empty, use the current language-specific locations object
      Object.keys(locationsObject).forEach(location => {
        suggestions.push(location);
      });
    } else {
      // If there is user input, use the combined locations object to filter suggestions
      Object.keys(combinedLocations).forEach(location => {
        if (getLevenshteinDistance(userInput, normalizeLocationKey(location)) <= 3) {
          suggestions.push(location);
        }
      });
    }
    // Sort suggestions alphabetically
    suggestions.sort((a, b) => a.localeCompare(b));

    displaySuggestions(suggestions, suggestionBox);
  }, 300);
}



// Function to display suggestions
function displaySuggestions(suggestions, suggestionBox) {
  suggestionBox.innerHTML = ''; // Clear existing suggestions
  suggestions.forEach(suggestion => {
    const div = document.createElement('div');
    div.textContent = suggestion; 
    div.classList.add('suggestion-item'); 
    div.onclick = () => { // Attach click event handler directly
      const inputId = suggestionBox.id.replace('Suggestions', '');
      const inputElement = document.getElementById(inputId);
      inputElement.value = suggestion; // Update the input field with the selected suggestion
      suggestionBox.innerHTML = ''; 
    };
    suggestionBox.appendChild(div);
  });
  if (suggestions.length > 0) {
    suggestionBox.style.display = 'block'; 
  } else {
    suggestionBox.style.display = 'none'; 
  }
}

// Initialize event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#currentLocation, #destinationLocation').forEach(input => {
    input.addEventListener('input', () => suggestLocations(input.id));
    input.addEventListener('click', (e) => {
      e.stopPropagation(); 
      suggestLocations(input.id);
    });
  });

document.getElementById('currentLocation').addEventListener('focus', function() {
  // Clear suggestions for the destination location when the current location field gains focus
  document.getElementById('destinationLocationSuggestions').innerHTML = '';
});

document.getElementById('destinationLocation').addEventListener('focus', function() {
  // Clear suggestions for the current location when the destination location field gains focus
  document.getElementById('currentLocationSuggestions').innerHTML = '';

  document.addEventListener('click', function() {
    document.querySelectorAll('.suggestions-dropdown').forEach(box => {
        box.style.display = 'none';
    });
});

// Prevent hiding when clicking within the suggestion box itself
document.querySelectorAll('.suggestions-dropdown').forEach(box => {
    box.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
});

});



function getLevenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }

  return matrix[a.length][b.length];
}

// Define animationInterval in the global scope
var animationInterval;

function animateMarker(polyline, duration) {
  if (animationInterval) clearInterval(animationInterval);

  let latlngs = polyline.getLatLngs();
  let length = latlngs.length;
  let i = 0;

  // Place the marker at the starting point of the polyline
  marker.setLatLng(latlngs[0]);
  
  animationInterval = setInterval(function() {
    // Move the marker to the next point
    marker.setLatLng(latlngs[i]);
    // Increment the index to reference the next point on the polyline
    i++;
    // If we've reached the end of the polyline, clear the interval to stop the animation
    if (i >= length) clearInterval(animationInterval);
  }, duration / length);
}

var startMarker;
var endMarker;
let currentPolyline = null;



function drawRoute(from, to) {
  const key = '7040f51d-1186-4818-ad37-765e602f8e32'; // Use your actual GraphHopper API key
  const queryUrl = `https://graphhopper.com/api/1/route?point=${from.join(',')}&point=${to.join(',')}&vehicle=foot&key=${key}`;
  
  // Check if on a mobile device
  var isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (marker) {
    map.removeLayer(marker); // Remove the previous marker if it exists
  }

  marker = L.marker(from, {icon: HumanIcon}).addTo(map);

  fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
      if (currentPolyline) {
        map.removeLayer(currentPolyline);
        currentPolyline = null;
      }

      if (data.paths && data.paths.length > 0 && data.paths[0].points) {
        const points = decodePolyline(data.paths[0].points);
        currentPolyline = L.polyline(points, { color: 'blue' }).addTo(map);
        map.fitBounds(currentPolyline.getBounds());

        animateMarker(currentPolyline, 10000);

        if (data.paths[0].distance) {
          const distance = data.paths[0].distance; // Keep distance in meters
          let instructionsHtml = `<div class="instructions"><strong>Total Distance:</strong> ${distance.toFixed(1)} m`;

          // Only add detailed instructions if not on a mobile device
          if (!isMobile && data.paths[0].instructions) {
            instructionsHtml += `<br><strong>Instructions:</strong><ul>`;
            data.paths[0].instructions.forEach(instruction => {
              instructionsHtml += `<li>${instruction.text} - ${(instruction.distance).toFixed(1)} m</li>`;
            });
            instructionsHtml += '</ul>';
          }
          
          instructionsHtml += '</div>'; // Close the div

          const instructionsContainer = document.getElementById('instructions-container');
          if (instructionsContainer) {
            instructionsContainer.innerHTML = instructionsHtml;
          } else {
            // If the container doesn't exist, create it
            const container = document.createElement('div');
            container.id = 'instructions-container';
            container.classList.add('instructions-container');
            container.innerHTML = instructionsHtml;
            document.body.appendChild(container);
          }
        } else {
          console.log('No detailed instructions provided by the API.');
        }
      } else {
        console.error('GraphHopper response is missing paths:', data);
        Swal.fire({
          title: 'Error',
          text: 'GraphHopper response is missing paths.',
          icon: 'error'
        });
      }
    })
    .catch(error => {
      console.error('Error fetching GraphHopper route:', error);
      Swal.fire({
        title: 'Error',
        text: `Error fetching route: ${error.message}`,
        icon: 'error'
      });
    });

    let selectedLanguage = localStorage.getItem('selectedLanguage') || 'Ελληνικά';
    let startPopupText = selectedLanguage === 'Ελληνικά' ? 'Τρέχουσα τοποθεσία' : 'Current location';
    let endPopupText = selectedLanguage === 'Ελληνικά' ? 'Προορισμός' : 'Destination';
  
    // Clear existing start and end markers
    if (startMarker) {
      map.removeLayer(startMarker);
    }
    if (endMarker) {
      map.removeLayer(endMarker);
    }
    startMarker = L.marker(from, {icon: redIcon}).bindPopup(startPopupText).addTo(map).openPopup();

    // Add end marker with popup shown without needing a click
    endMarker = L.marker(to, {icon: redIcon}).bindPopup(endPopupText).addTo(map).openPopup();
  }


  function setRoute() {
    // Assume selectedLanguage is globally available; ensure it's defined elsewhere in your script
    var selectedLanguage = localStorage.getItem('selectedLanguage') || 'English'; // Example of defining it here if not global
    
    document.getElementById('findShortestPath').disabled = true; // Disable the button to prevent multiple submissions
  
    document.getElementById('currentLocationSuggestions').innerHTML = '';
    document.getElementById('destinationLocationSuggestions').innerHTML = '';
  
    let fromCoords = knownLocations['currentLocation'] || geocodeLocation('currentLocation');
    let toCoords = knownLocations['destinationLocation'] || geocodeLocation('destinationLocation');
  
    // Check conditions and show appropriate error messages
    if (!fromCoords && !toCoords) {
      Swal.fire({
        title: selectedLanguage === 'Ελληνικά' ? 'Σφάλμα' : 'Error',
        text: selectedLanguage === 'Ελληνικά' ? `Η τρέχουσα τοποθεσία και ο προορισμός δεν βρέθηκαν.` : `Both current location and destination not found.`,
        icon: 'error'
      });
    } else if (!fromCoords) {
      Swal.fire({
        title: selectedLanguage === 'Ελληνικά' ? 'Σφάλμα' : 'Error',
        text: selectedLanguage === 'Ελληνικά' ? `Η τρέχουσα τοποθεσία δεν βρέθηκε: "${document.getElementById('currentLocation').value}"` : `Current location not found: "${document.getElementById('currentLocation').value}"`,
        icon: 'error'
      });
    } else if (!toCoords) {
      Swal.fire({
        title: selectedLanguage === 'Ελληνικά' ? 'Σφάλμα' : 'Error',
        text: selectedLanguage === 'Ελληνικά' ? `Ο προορισμός δεν βρέθηκε: "${document.getElementById('destinationLocation').value}"` : `Destination not found: "${document.getElementById('destinationLocation').value}"`,
        icon: 'error'
      });
    } else {
      // If both fromCoords and toCoords are found, draw the route
      drawRoute(fromCoords, toCoords);
    }
  
    document.getElementById('findShortestPath').disabled = false; // Re-enable the button after processing
  }
  

//event listeners

document.getElementById('findMe').addEventListener('click', function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, handleGeolocationError, { enableHighAccuracy: true });
  } else {
      console.log("Your browser doesn't support geolocation feature!");
  }
});

document.getElementById('findShortestPath').addEventListener('click', setRoute);

document.querySelector('.leaflet-control-zoom-in').addEventListener('click', function(e) {
  e.preventDefault();
  map.zoomIn();
});

document.querySelector('.leaflet-control-zoom-out').addEventListener('click', function(e) {
  e.preventDefault();
  map.zoomOut();
});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
      navigator.serviceWorker.register("/sw.js").then(
          function(registration) {
              // Registration was successful
              console.log("ServiceWorker registration successful with scope: ", registration.scope);
          },
          function(err) {
              // registration failed :(
              console.log("ServiceWorker registration failed: ", err);
          }
      );
  });
}


map.on('contextmenu', function(e) {
  var latlng = e.latlng;
  
  // Move selectedLanguage declaration here to ensure it is accessible throughout the entire function
  var selectedLanguage = localStorage.getItem('selectedLanguage') || 'English'; // Default to English if not set

  // Check if the clicked location is within the university boundary
  if (isWithinUniversityBoundary(latlng.lat, latlng.lng)) {
      var destinationMessage = selectedLanguage === 'Ελληνικά' ? 'Προορισμός' : 'Clicked destination';

      // Update the destination input with the message indicating a destination was clicked
      document.getElementById('destinationLocation').value = destinationMessage;
      knownLocations['destinationLocation'] = [latlng.lat, latlng.lng];

      // Check if an end marker already exists, update its position and popup text
      if (endMarker) {
          endMarker.setLatLng(latlng).setPopupContent(destinationMessage);
      } else {
          // If no end marker exists, create a new one with the appropriate popup
          endMarker = L.marker(latlng, {icon: redIcon})
                       .addTo(map)
                       .bindPopup(destinationMessage)
                       .openPopup();
      }
  } else if (selectedLanguage === 'Ελληνικά') {
    Swal.fire({
      title: 'Προειδοποίηση',
      html: 'Ο προορισμός σου βρίσκεται <b>εκτός</b> της περιοχής του πανεπιστημίου Πατρών.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: 'Location Alert',
      html: 'Your destination is <b>outside</b> the University of Patras.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
});
