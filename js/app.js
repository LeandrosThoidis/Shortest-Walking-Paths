
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

  // Check if the current location is within the university boundary
  if (isWithinUniversityBoundary(lat, long)) {
    document.getElementById('currentLocation').value = "Your Current Location"; 
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
  } else {
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


const knownLocations = {
  'συνεδριακό': [38.29022, 21.78636],
  'συνεδριακό κέντρο': [38.29022, 21.78636],

  'Νοσοκομείο': [38.2943,21.7957],
  'Νοσοκομέιο Ρίο': [38.2943,21.7957],
  'Βοήθεια': [38.2943,21.7957],

  'Βιβλιοθήκη': [38.28962, 21.79132],
  'Κεντρική βιβλιοθήκη': [38.28962, 21.79132],
  'Κέντρο Ενημέρωσης': [38.28962, 21.79132],

  'Πρυτανεία': [38.2861, 21.7866],
  'Κτίριο Α': [38.2861, 21.7866],

  'Φοιτητική Εστία': [38.28620,21.78970],
  'Εστία': [38.28620,21.78970],
  'Λέσχη Σίτησης': [38.28620,21.78970],

  'Πανεπιστημιακό Γυμναστήριο': [38.28204, 21.78855],
  'Γήπεδο': [38.28204, 21.78855],
  'Γυμναστήριο': [38.28204, 21.78855],

  'Τμήμα Μηχανικών Ηλεκτρονικών Υπολογιστών και Πληροφορικής': [38.29019, 21.79503],
  'Ceid': [38.29019, 21.79503],
  'ΗΥ': [38.29019, 21.79503],

  'Ιατρική Σχολή': [38.29386,21.79361],
  'Ιατρική': [38.29386,21.79361],
  'Τμήμα Ιατρικής': [38.29386,21.79361],

  'Φαρμακευτική': [38.29237, 21.79257],
  'Τμήμα Φαρμακευτικής': [38.29237, 21.79257],

  'Γεωλογία': [38.29181, 21.78994],
  'Τμήμα Γεωλογίας': [38.29181, 21.78994],
  'Γεωλογικό': [38.29181, 21.78994],

  'Φυσικό': [38.29127, 21.78883],
  'Τμήμα Φυσικής': [38.29127, 21.78883],

  'Χημικό': [38.29069, 21.78781],
  'Τμήμα Χημείας': [38.29069, 21.78781],

  'Μαθηματικό': [38.29052, 21.79012],
  'Τμήμα Μαθηματικών': [38.29052, 21.79012],

  'Βιολογικό': [38.29009, 21.78974],
  'Τμήμα Βιολογίας': [38.29009, 21.78974],

  'Τμήμα Χημικών Μηχανικών': [38.28962, 21.78827],
  'Χημικοί Μηχανικοί': [38.28962, 21.78827],
  'Χημικών Μηχανικών': [38.28962, 21.78827],

  'Σχολή Μηχανολόγων Μηχανικών & Αεροναυπηγικής': [38.28920, 21.78749],
  'Τμήμα Μηχανολόγων Μηχανικών & Αεροναυπηγικής': [38.28920, 21.78749],
  'Τμήμα Μηχανολόγων Μηχανικών': [38.28920, 21.78749],
  'Μηχανολόγοι': [38.28920, 21.78749],
  'Αεροναυπηγοί': [38.28920, 21.78749],
  'Μηχανολόγων': [38.28920, 21.78749],

  'Τμήμα Πολιτικών Μηχανικών': [38.28888, 21.79048],
  'Πολιτικοί Μηχανικοί' : [38.28888, 21.79048],
  'Πολιτικών Μηχανικών': [38.28888, 21.79048],

  'Παιδαγωγικό Τμήμα Δημοτικής Εκπαίδευσης': [38.28848, 21.78736],
  'Παιδαγωγικό' : [38.28848, 21.78736],

  'Τμήμα Ηλεκτρολόγων Μηχανικών & Τεχνολογίας Υπολογιστών': [38.28787, 21.78927],
  'Ηλέκτρολόγοι': [38.28787, 21.78927],

  'Τμήμα Λογοθεραπίας': [38.28825, 21.78336],
  'Λογοθεραπία' : [38.28825, 21.78336],

  'Τμήμα Οικονομικών Επιστημών': [38.28693, 21.78195],
  'Οικονομικό' : [38.28693, 21.78195],

  'Τμήμα Διοίκησης Επιχειρήσεων': [38.28680, 21.78412],
  'Διοίκηση' : [38.28680, 21.78412],
  'Διοίκηση Επιχειρήσεων' : [38.28680, 21.78412],

  'Τμήμα Θεατρικών Σπουδών': [38.28468, 21.78410],
  'Θεατρολογία' : [38.28468, 21.78410],

  'Τμήμα Φιλοσοφίας': [38.28494, 21.78462],
  'Φιλοσοφία' : [38.28494, 21.78462],

  'Τμήμα Επιστήμης Υλικών': [38.28336, 21.78695],
  'Τμήμα Επιστήμης των Υλικών': [38.28336, 21.78695],
  'Επιστήμη Υλικών' : [38.28336, 21.78695],
  'επιστήμη υλικών' : [38.28336, 21.78695],

  'Τμήμα Φυσικοθεραπείας': [38.28487,21.78773],
  'Φυσικοθεραπεία' : [38.28487,21.78773],

  'Τμήμα Ιστορίας-Αρχαιολογίας': [38.28487,21.78773],
  'Ιστορία' : [38.28487,21.78773],
  'Αρχαιολογία' : [38.28487,21.78773],
  'Ιστορία και Αρχαιολογία' : [38.28487,21.78773],


  'Τμήμα Αρχιτεκτόνων': [38.28590, 21.78438],
  'Αρχιτέκτονες' : [38.28590, 21.78438],
  'Αρχιτεκτονική' : [38.28590, 21.78438],
  'Αρχιτεκτόνων' : [38.28590, 21.78438],

  'Πάρκο Ειρήνης': [38.28700, 21.786467],
  'Πάρκο' : [38.28700, 21.786467],

  'Οκτάγωνο': [38.28678,21.78558],
  'Octagon' : [38.28678,21.78558],

  'Coffee Island': [38.28597, 21.78575],
  'Coffee': [38.28597, 21.78575],

  'Εστιατόριο Φοιτητικής Εστίας': [38.28620,21.78970],
  'Εστιατόριο': [38.28620,21.78970],
  'Εστιατόριο Εστίας': [38.28620,21.78970],

  'Καφετέρια CEID': [38.29041,21.79482],

  'Κυλικείο Μηχανολόγων': [38.28912, 21.78741],

  'Κυλικείο Χημικού': [38.29089,21.78852],
};

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

let debounceTimeout;

// Function to suggest locations based on user input
function suggestLocations(inputId) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const inputElement = document.getElementById(inputId);
    const userInput = normalizeLocationKey(inputElement.value.trim());
    const suggestionBoxId = inputId + 'Suggestions';
    const suggestionBox = document.getElementById(suggestionBoxId);

    if (userInput.length === 0) {
      suggestionBox.innerHTML = '';
      return;
    }

    let suggestions = [];
    Object.keys(knownLocations).forEach(location => {
      const normalizedLocation = normalizeLocationKey(location);
      if (getLevenshteinDistance(userInput, normalizedLocation) <= 4) {
        suggestions.push(location);
      }
    });

    displaySuggestions(suggestions, suggestionBox);
  }, 300);
}

// Function to display suggestions
function displaySuggestions(suggestions, suggestionBox) {
  suggestionBox.innerHTML = ''; // Clear existing suggestions
  suggestions.forEach(suggestion => {
    const div = document.createElement('div');
    div.textContent = suggestion; // Use textContent for <div>
    div.classList.add('suggestion-item'); // Add class for styling
    div.onclick = () => { // Attach click event handler directly
      const inputId = suggestionBox.id.replace('Suggestions', '');
      const inputElement = document.getElementById(inputId);
      inputElement.value = suggestion; // Update the input field with the selected suggestion
      suggestionBox.innerHTML = ''; // Clear suggestions after selection
    };
    suggestionBox.appendChild(div);
  });
  if (suggestions.length > 0) {
    suggestionBox.style.display = 'block'; // Show suggestions
  } else {
    suggestionBox.style.display = 'none'; // Hide suggestions if empty
  }
}

// Initialize event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#currentLocation, #destinationLocation').forEach(input => {
    input.addEventListener('input', () => suggestLocations(input.id));
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
          let instructionsHtml = `<div class="instructions"><strong>Total Distance:</strong> ${distance.toFixed(2)} m`;

          // Only add detailed instructions if not on a mobile device
          if (!isMobile && data.paths[0].instructions) {
            instructionsHtml += `<br><strong>Instructions:</strong><ul>`;
            data.paths[0].instructions.forEach(instruction => {
              instructionsHtml += `<li>${instruction.text} - ${(instruction.distance).toFixed(2)} m</li>`;
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
}


function setRoute() {
  document.getElementById('findShortestPath').disabled = true; // Disable the button to prevent multiple submissions

  let fromCoords = knownLocations['currentLocation'] || geocodeLocation('currentLocation');
  let toCoords = geocodeLocation('destinationLocation');

  // Check conditions and show appropriate error messages
  if (!fromCoords && !toCoords) {
    Swal.fire({
      title: 'Error',
      text: `Both current location and destination not found.`,
      icon: 'error'
    });
  } else if (!fromCoords) {
    Swal.fire({
      title: 'Error',
      text: `Current location not found: "${document.getElementById('currentLocation').value}"`,
      icon: 'error'
    });
  } else if (!toCoords) {
    Swal.fire({
      title: 'Error',
      text: `Destination not found: "${document.getElementById('destinationLocation').value}"`,
      icon: 'error'
    });
  } else {
    // If both coordinates are available, draw the route
    drawRoute(fromCoords, toCoords);
  }

  document.getElementById('findShortestPath').disabled = false; // Re-enable the button after the checks
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
