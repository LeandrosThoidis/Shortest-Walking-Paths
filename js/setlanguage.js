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

  
  // Function to set the language and update the page accordingly
  function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    const currentLangElement = document.getElementById('current-lang');
    currentLangElement.innerHTML = lang === 'Ελληνικά' ? 'Ελληνικά <span class="checked">✓</span>' : 'English <span class="checked">✓</span>';
  
    updatePageContent(lang);
    updateTileLayer(lang); // Ensure the tile layer is updated to reflect the language change
  
    // Remove all existing markers before adding new ones in the selected language
    clearMarkers();
  
    // Call the function to add markers for the current page in the selected language
    determinePageAndAddMarkers(lang);
  }

    function clearMarkers() {
        // Check if the map object exists before trying to use it
        if (window.map) {
          map.eachLayer(function(layer) {
            if (!!layer.toGeoJSON) { // Check if layer is a marker (has toGeoJSON method)
              map.removeLayer(layer);
            }
          });
      
          // Re-add the tile layer since it gets removed by the above loop
          var currentLang = localStorage.getItem('selectedLanguage') || 'Ελληνικά';
          updateTileLayer(currentLang);
        }    
  }
  
  // Ensure the rest of your code is prepared to handle the dynamic addition and removal of markers
  
  // Function to update the page content based on the selected language
  function updatePageContent(lang) {
    var translations = {
      English: {
        subtitle: "Your 'Shortest Walking-Paths' campus assistant",
        findMe: "Find me",
        currentLocation: "Current Location",
        destination: "Destination",
        findShortestPath: "Find Shortest Path",
        campusNavigation: "Campus Navigation",
        departments: "Departments",
        cafeRestaurants: "Cafe-Restaurants",
        about: "About",
        home: "Home",
        pageTitle: {
          "index.html": "SWaP",
          "Cafe-restaurants.html": "Cafe-Restaurants",
          "Departments.html": "Departments"
        }
      },
      Ελληνικά: {
        subtitle: "Ο βοηθός σας στην εύρεση συντομότερων μονοπατιών για πεζούς",
        findMe: "Βρες με",
        currentLocation: "Τρέχουσα Τοποθεσία",
        destination: "Προορισμός",
        findShortestPath: "Εύρεση Συντομότερης Διαδρομής",
        campusNavigation: "Περιήγηση Πανεπιστημίου",
        departments: "Τμήματα",
        cafeRestaurants: "Καφέ-Εστιατόρια",
        about: "Σχετικά",
        home: "Αρχική",
        pageTitle: {
          "index.html": "SWaP",
          "Cafe-restaurants.html": "Καφέ-Εστιατόρια",
          "Departments.html": "Τμήματα"
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
    
  
    document.querySelector('#side-menu li a.subheader').textContent = translations[lang].campusNavigation;
    updateNavLinkText('#side-menu li a[href="/pages/recommendation/Departments.html"]', translations[lang].departments, 'location_city');
    updateNavLinkText('#side-menu li a[href="/pages/recommendation/Cafe-restaurants.html"]', translations[lang].cafeRestaurants, 'restaurant');
    updateNavLinkText('#side-menu li a[href="/pages/about.html"]', translations[lang].about, 'info');
    updateNavLinkText('#side-menu li a[href="/index.html"]', translations[lang].home, 'home'); 
  }

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
    }
    if (pathname === '/pages/recommendation/cafe-restaurants' || pathname === '/pages/recommendation/Cafe-restaurants.html') {
      addMarkers(orangeMarkers, orangeIcon, lang); 
    }
    if (pathname === '/pages/recommendation/departments' || pathname === '/pages/recommendation/Departments.html') {
      addMarkers(blueMarkers, blueIcon, lang); 
    }
    // For the Rio Hospital marker, add it directly here if it's a global marker
    L.marker([38.29486, 21.79567], { icon: greenIcon }) 
      .bindPopup('Rio Hospital') 
      .addTo(map);
  }
  
    