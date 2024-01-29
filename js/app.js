if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

document.getElementById('updateLocation').addEventListener('click', function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, handleGeolocationError, { enableHighAccuracy: true });
  } else {
      console.log("Your browser doesn't support geolocation feature!");
  }
});


document.getElementById('centerMap').addEventListener('click', function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          map.setView([lat, long], 16); // Center the map on user's location
      }, handleGeolocationError, { enableHighAccuracy: true });
  } else {
      console.log("Your browser doesn't support geolocation feature!");
  }
});
