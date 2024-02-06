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

function handleGeolocationError(error) {
  console.log("Error getting geolocation:", error.message);
}

var HumanIcon = L.icon({
  iconUrl: '../img/icons/walking.png',
  iconSize: [40, 40]
});

var marker, circle;

function getPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var accuracy = position.coords.accuracy;

  document.getElementById('currentLocation').value = lat + ', ' + long;

  if (marker) {
      map.removeLayer(marker);
  }
  if (circle) {
      map.removeLayer(circle);
  }

  circle = L.circle([lat, long], { radius: accuracy }).addTo(map);
  marker = L.marker([lat, long], { icon: HumanIcon }).addTo(map);
  map.setView([lat, long], 16);
}

document.getElementById('findMe').addEventListener('click', function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, handleGeolocationError, { enableHighAccuracy: true });
  } else {
      console.log("Your browser doesn't support geolocation feature!");
  }
});

document.getElementById('findShortestPath').addEventListener('click', setRoute);
