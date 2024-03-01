// DOMContentLoaded event to initialize the map and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  initializeMap(); // Initialize map

  var selectedLanguage = localStorage.getItem('selectedLanguage') || 'Ελληνικά';
  setLanguage(selectedLanguage); // Set the initial language

  document.getElementById('current-lang').addEventListener('click', (e) => {
    e.stopPropagation();
    const langOptions = document.getElementById('lang-options');
    langOptions.style.display = (langOptions.style.display === 'none' || !langOptions.style.display) ? 'block' : 'none';
  });

  document.querySelector('#option-greek a').addEventListener('click', (e) => {
    e.preventDefault();
    setLanguage('Ελληνικά');
  });

  document.querySelector('#option-english a').addEventListener('click', (e) => {
    e.preventDefault();
    setLanguage('English');
  });

  // Hide language options when clicking anywhere else on the document
  document.addEventListener('click', () => {
    document.getElementById('lang-options').style.display = 'none';
  }, true);
});

// Global variables for map and tileLayer
var map;
var tileLayer;
var currentUrl = window.location.href;

function initializeMap() {
  // Check if the map has already been initialized
  if (window.map) {
    return; // If the map is already initialized, exit the function
  }
  if (currentUrl.includes('/pages/about.html') || currentUrl.includes('shortestpathapp.netlify.app/pages/about')) {
      return; 
  }

  var isMobile = /Mobi|Android/i.test(navigator.userAgent);
  window.map = L.map('map', {
    zoomControl: false,
  }).setView([38.2881, 21.7922], isMobile ? 15 : 16);

  // Call updateTileLayer with the default or stored language
  var selectedLanguage = localStorage.getItem('selectedLanguage') || 'Ελληνικά';
  updateTileLayer(selectedLanguage);
}


// Function to update the tile layer based on the selected language
function updateTileLayer(lang) {
  if (tileLayer) {
      map.removeLayer(tileLayer);
  }

  var tileUrl, attribution;
  // Your existing condition to determine the tile URL and attribution based on the language
  if (lang === 'Ελληνικά') {
      tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  } else {
      tileUrl = 'https://api.mapbox.com/styles/v1/leandros99/clsoumhbn00nj01qubmrpab3a/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVhbmRyb3M5OSIsImEiOiJjbHJwOXNkamMwMjRiMm5vZnNvYnJ5YWs5In0.3pVImyDmcZpHdaH5BfbRfw';
      attribution = 'Map data &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>';
  }

  tileLayer = L.tileLayer(tileUrl, {
      attribution: attribution,
      maxZoom: 18,
  }).addTo(map);
}

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

map.on('contextmenu', function(e) {
  var latlng = e.latlng;

  // Check if the clicked location is within the university boundary
  if (isWithinUniversityBoundary(latlng.lat, latlng.lng)) {
      var selectedLanguage = localStorage.getItem('selectedLanguage') || 'English'; // Default to English if not set

      var destinationMessage = selectedLanguage === 'Ελληνικά' ? 'Προορισμός' : 'Clicked Destination';

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
  } else {
    Swal.fire({
      title: 'Location Alert',
      html: 'Your current location is <b>outside</b> the University of Patras.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
});


// Function to set the language and update the page accordingly
function setLanguage(lang) {
  localStorage.setItem('selectedLanguage', lang);
  const currentLangElement = document.getElementById('current-lang');
  currentLangElement.innerHTML = lang === 'Ελληνικά' ? 'EΛ <span class="checked">✓</span>' : 'EN <span class="checked">✓</span>';

  updatePageContent(lang);
  updateTileLayer(lang); // Ensure the tile layer is updated to reflect the language change

  // Remove all existing markers before adding new ones in the selected language
  clearMarkers();

  // Call the function to add markers for the current page in the selected language
  determinePageAndAddMarkers(lang);
  updateMarkerPopups(lang);
}

  function clearMarkers() {
      // Check if the map object exists before trying to use it
      if (window.map) {
        map.eachLayer(function(layer) {
    // Check if layer is a marker and not one of the special markers before removing
    if (!!layer.toGeoJSON && layer !== startMarker && layer !== endMarker && layer !== currentPolyline) {
      map.removeLayer(layer);
    }
  });

  // Re-add the tile layer since it gets removed by the above loop
  var currentLang = localStorage.getItem('selectedLanguage') || 'Ελληνικά';
  updateTileLayer(currentLang);
}}

function updateNavLinkText(selector, text, iconClassName) {
  var linkElement = document.querySelector(selector);
  if (linkElement) {
    // Remove the old text node
    linkElement.childNodes.forEach(function(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        linkElement.removeChild(node);
      }
    });
  
    // Add the new text node
    linkElement.appendChild(document.createTextNode(text));
  
    // Ensure the icon remains
    if (!linkElement.querySelector('.material-icons')) {
      var icon = document.createElement('i');
      icon.className = 'material-icons';
      icon.textContent = iconClassName;
      linkElement.insertBefore(icon, linkElement.firstChild);
    }
  }
  }

// Function to update the page content based on the selected language
function updatePageContent(lang) {
  var translations = {
    English: {
      subtitle: "Your 'Shortest Walking-Paths' campus assistant",
      findMe: "Get my location",
      currentLocation: "Current location",
      destination: "Destination",
      findShortestPath: "Find shortest walking-path",
      campusNavigation: "Points of interest",
      departments: "Departments",
      cafeRestaurants: "Cafe-restaurants",
      BusStations: "Bus stops",
      about: "About",
      home: "Home",
      pageTitle: {
        "index.html": "Home",
        "Cafe-restaurants.html": "Cafe-restaurants",
        "Departments.html": "Departments",
        "BusStations.html": "Bus stops",
        "": "SWaP",
        "cafe-restaurants": "Cafe-restaurants",
        "departments": "Departments",
        "busstations": "Bus stops"
      }
    },
    Ελληνικά: {
      subtitle: "Ο βοηθός σας στην εύρεση συντομότερων μονοπατιών",
      findMe: "Δες τη θέση μου",
      currentLocation: "Τρέχουσα τοποθεσία",
      destination: "Προορισμός",
      findShortestPath: "Βρες συντομότερο μονοπάτι",
      campusNavigation: "Σημεία ενδιαφέροντος",
      departments: "Τμήματα",
      cafeRestaurants: "Καφέ-εστιατόρια",
      BusStations: "Στάσεις λεωφορείων",
      about: "Σχετικά",
      home: "Αρχική",
      pageTitle: {
        "index.html": "Αρχική",
        "Cafe-restaurants.html": "Καφέ-εστιατόρια",
        "Departments.html": "Τμήματα",
        "BusStations.html": "Στάσεις λεωφορείων",
        "": "SWaP",
        "cafe-restaurants": "Καφέ-εστιατόρια",
        "departments": "Τμήματα",
        "busstations": "Στάσεις λεωφορείων"
    }
  }
}

  var subtitleElement = document.querySelector('.subtitle');
  if (subtitleElement) subtitleElement.textContent = translations[lang].subtitle;

  var findMeElement = document.getElementById('findMe');
  if (findMeElement) findMeElement.textContent = translations[lang].findMe;

  var currentLocationElement = document.getElementById('currentLocation');
  if (currentLocationElement) currentLocationElement.placeholder = translations[lang].currentLocation;

  var destinationLocationElement = document.getElementById('destinationLocation');
  if (destinationLocationElement) destinationLocationElement.placeholder = translations[lang].destination;

  var findShortestPathElement = document.getElementById('findShortestPath');
  if (findShortestPathElement) findShortestPathElement.textContent = translations[lang].findShortestPath;

  var currentPage = window.location.pathname.split("/").pop(); 
  var pageTitleElement = document.getElementById('pageTitle'); 
  if (pageTitleElement && translations[lang].pageTitle[currentPage]) {
    pageTitleElement.textContent = translations[lang].pageTitle[currentPage];
  } 
  
  if (currentUrl.includes('.html')){
  document.querySelector('#side-menu li a.subheader').textContent = translations[lang].campusNavigation;
  updateNavLinkText('#side-menu li a[href="/index.html"]', translations[lang].home, 'home');
  updateNavLinkText('#side-menu li a[href="/pages/recommendation/Departments.html"]', translations[lang].departments, 'location_city');
  updateNavLinkText('#side-menu li a[href="/pages/recommendation/Cafe-restaurants.html"]', translations[lang].cafeRestaurants, 'restaurant');
  updateNavLinkText('#side-menu li a[href="/pages/recommendation/BusStations.html"]', translations[lang].BusStations, 'directions_bus');
  updateNavLinkText('#side-menu li a[href="/pages/about.html"]', translations[lang].about, 'info');
  }
  else{ 
  document.querySelector('#side-menu li a.subheader').textContent = translations[lang].campusNavigation;
  updateNavLinkText('#side-menu li a[href*="/"]', translations[lang].home, 'home'); // Assuming home is always present, adjust if needed
  updateNavLinkText('#side-menu li a[href*="/departments"]', translations[lang].departments, 'location_city');
  updateNavLinkText('#side-menu li a[href*="/cafe-restaurants"]', translations[lang].cafeRestaurants, 'restaurant');
  updateNavLinkText('#side-menu li a[href*="/busstations"]', translations[lang].BusStations, 'directions_bus');
  updateNavLinkText('#side-menu li a[href*="/about"]', translations[lang].about, 'info');
  }
}


// Function to add markers based on the current language and markers data
function addMarkers(markers, icon, lang) {
  markers.forEach(marker => {
    var popupText = marker.popupText[lang]; // Use the passed `lang` variable
    var markerToAdd = L.marker(marker.coordinates, { icon: icon }).addTo(map);
    markerToAdd.bindPopup(popupText);
    setupMarkerEvents(markerToAdd);
  });
}

// Setup marker events for hover and click
function setupMarkerEvents(marker) {
  if (!/Mobi|Android/i.test(navigator.userAgent)) { // Reusing the isMobile check
    marker.on('mouseover', function () { this.openPopup(); })
          .on('mouseout', function () { this.closePopup(); });
  } else {
    marker.on('click', function () { this.openPopup(); });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeMap();
  var selectedLanguage = localStorage.getItem('selectedLanguage') || 'Ελληνικά';
  setLanguage(selectedLanguage); // This now needs to not only update UI but also trigger marker additions

  // Add a call to add markers based on the current page, after setting the language and initializing the map
  determinePageAndAddMarkers(selectedLanguage);
});

// Add this new function
function determinePageAndAddMarkers(lang) {
  var pathname = window.location.pathname.replace(/\/$/, "");

  // Determine the page and call `addMarkers` with appropriate parameters
  if (pathname === '' || pathname === '/' || pathname === '/index.html') {
    addMarkers(blackMarkers, blackIcon, lang); 
    addMarkers(busStopMarkers, BussIcon, lang);
    addMarkers(orangeMarkers, orangeIcon, lang); 
    addMarkers(blueMarkers, blueIcon, lang);
  }
  if (pathname === '/pages/recommendation/cafe-restaurants' || pathname === '/pages/recommendation/Cafe-restaurants.html') {
    addMarkers(orangeMarkers, orangeIcon, lang); 
  }
  if (pathname === '/pages/recommendation/departments' || pathname === '/pages/recommendation/Departments.html') {
    addMarkers(blueMarkers, blueIcon, lang); 
  }
  if (pathname === '/pages/recommendation/busstations' || pathname === '/pages/recommendation/BusStations.html') {
    addMarkers(busStopMarkers, BussIcon, lang); 
    addMarkers(blackMarkers, blackIcon, lang);
  }
  // For the Rio Hospital marker, add it directly here if it's a global marker
  L.marker([38.29486, 21.79567], { icon: greenIcon }) 
    .bindPopup('Rio Hospital') 
    .addTo(map);
}

  function updateMarkerPopups(lang) {

    let popupTextMapping = {
      'Ελληνικά': {
        'start': 'Αφετηρία',
        'end': 'Προορισμός',

       },

      'English': {
        'start': 'currentLocation',
        'end': 'Destination',

      }
    };
    
    let zIndexOffsetHigh = 1000; 
    
    // Update start and end markers if they exist
    if (startMarker) {
      const startPos = startMarker.getLatLng(); // Get the current position of startMarker
      map.removeLayer(startMarker); // Remove the existing startMarker
      startMarker = L.marker(startPos, { icon: redIcon, zIndexOffset: zIndexOffsetHigh })
                     .bindPopup(popupTextMapping[lang]['start'])
                     .addTo(map)
                     .openPopup(); // Re-add startMarker at the same location with updated popup and icon
    }
  
    // Repeat the process for endMarker
    if (endMarker) {
      const endPos = endMarker.getLatLng(); // Get the current position of endMarker
      map.removeLayer(endMarker); // Remove the existing endMarker
      endMarker = L.marker(endPos, { icon: redIcon, zIndexOffset: zIndexOffsetHigh })
                   .bindPopup(popupTextMapping[lang]['end'])
                   .addTo(map)
                   .openPopup(); // Re-add endMarker at the same location with updated popup and icon
    }
  }