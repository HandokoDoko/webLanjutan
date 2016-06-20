// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
  var origin_place_id = null;
  var destination_place_id = null;
  var travel_mode = google.maps.TravelMode.DRIVING;
  var map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: {lat: 3.597608, lng: 98.750229},
    zoom: 17
  });

  var marker = new google.maps.Marker({
    position: {lat: 3.597608, lng: 98.750229},
    title: "Kopi Sadis"
  });
  marker.setMap(map);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  var angkot = document.querySelector("button#angkot");
  angkot.addEventListener("click", function(){
    travel_mode = google.maps.TravelMode.TRANSIT;
    route(origin_place_id, "ChIJmbe7_Mo2MTARxpIOmnPC2C0", travel_mode, directionsService, directionsDisplay);
  });

//origin_place_id = place.place_id;
/*route("ChIJQ2lmq7ExMTARPMDm3j_nGWk", "ChIJmbe7_Mo2MTARxpIOmnPC2C0", google.maps.TravelMode.TRANSIT, directionsService, directionsDisplay);
map.setZoom(17);
*/
  var origin_input = document.getElementById('origin-input');
  //var destination_input = document.getElementById('destination-input');
  
  //var modes = document.getElementById('mode-selector');

  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);

  var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
  origin_autocomplete.bindTo('bounds', map);

/*  var destination_autocomplete = new google.maps.places.Autocomplete(destination_input);
  destination_autocomplete.bindTo('bounds', map);*/


  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, mode) {
    var radioButton = document.getElementById(id);
    var place = destination_autocomplete.getPlace();
    
    radioButton.addEventListener('click', function() {
      travel_mode = mode;
      console.log(origin_place_id);
    });
  }
/*  setupClickListener('changemode-walking', google.maps.TravelMode.WALKING);
  setupClickListener('changemode-transit', google.maps.TravelMode.TRANSIT);
  setupClickListener('changemode-driving', google.maps.TravelMode.DRIVING);*/

  function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      console.log(place.geometry.location);
      map.setZoom(17);
    }
  }

  origin_autocomplete.addListener('place_changed', function() {
    var place = origin_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    origin_place_id = place.place_id;
    route(origin_place_id, "ChIJmbe7_Mo2MTARxpIOmnPC2C0", travel_mode, directionsService, directionsDisplay);
    map.setZoom(17);
    marker.setMap(null);
    //route(origin_place_id, destination_place_id, travel_mode, directionsService, directionsDisplay);
  });


/*  destination_autocomplete.addListener('place_changed', function() {
    var place = destination_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);

    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    destination_place_id = place.place_id;
    route(origin_place_id, destination_place_id, travel_mode,
          directionsService, directionsDisplay);
  });*/

  function route(origin_place_id, destination_place_id, travel_mode,
                 directionsService, directionsDisplay) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }
    directionsService.route({
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: travel_mode
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}