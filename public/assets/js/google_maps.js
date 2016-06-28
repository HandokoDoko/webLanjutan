// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
  var markerArray = []; 
  var origin_place_id = null;
  var destination_place_id = null;
  var travel_mode = google.maps.TravelMode.DRIVING;
  var _lat = document.getElementById("lat").value;
  var _lng = document.getElementById("lng").value;
  var lat_lng_tempat = new google.maps.LatLng(_lat, _lng);
  var geocoder = new google.maps.Geocoder;
  var g_placeId;

  var map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: lat_lng_tempat,
    zoom: 17
  });

  geocoder.geocode({'location': lat_lng_tempat}, function(result, status){
    if(status === google.maps.GeocoderStatus.OK){
      if(result[1]){
        console.log(result[1].place_id);
        g_placeId = result[1].place_id;
      }else{
        window.alert('No Result');
      }
    }else{
      window.alert('Geocoder :' + status);
    }
  });

  var marker = new google.maps.Marker({
    position: lat_lng_tempat,
    title: "Kopi Sadis"
  });

  marker.setMap(map);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow;
 // Listen to change events from the start and end lists.
  var onChangeHandler = function() {
    calculateAndDisplayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map);
  };

  directionsDisplay.setMap(map);

  //var angkot = document.querySelector("button#angkot");

/*  angkot.addEventListener("click", function(){
    travel_mode = google.maps.TravelMode.TRANSIT;
    route(origin_place_id, "ChIJmbe7_Mo2MTARxpIOmnPC2C0", travel_mode, directionsService, directionsDisplay);
  });*/

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
    var pilihan = document.querySelector(id);
    var place = origin_autocomplete.getPlace();
    
    pilihan.addEventListener('click', function() {
      travel_mode = mode;
      route(origin_place_id, g_placeId, travel_mode, directionsService, directionsDisplay, stepDisplay, map, markerArray);

      console.log(origin_place_id + place);
    });
  }

  setupClickListener('button#angkot', google.maps.TravelMode.TRANSIT);
  setupClickListener('button#kendaraan_pribadi', google.maps.TravelMode.DRIVING);
/*  setupClickListener('button#kreta_api', google.maps.TravelMode.WALKING);
  setupClickListener('button#bersepeda', google.maps.TravelMode.BICYCLING);*/

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
    route(origin_place_id, g_placeId, travel_mode, directionsService, directionsDisplay, stepDisplay, map, markerArray);
    map.setZoom(17);
    marker.setMap(null);
    console.log(origin_place_id);
    console.log(g_placeId);
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
                 directionsService, directionsDisplay, stepDisplay, map, markerArray) {
    if (!origin_place_id || !destination_place_id) {
      return;
    }

    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null);
    }

    directionsService.route({
      origin: {'placeId': origin_place_id},
      destination: {'placeId': destination_place_id},
      travelMode: travel_mode
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {

        document.getElementById('warnings-panel').innerHTML =
            '<b>' + response.routes[0].warnings + '</b>';
        directionsDisplay.setDirections(response);
        showSteps(response, markerArray, stepDisplay, map);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  
  function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var dataArah = [];
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
      var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
      marker.setMap(map);
      marker.setPosition(myRoute.steps[i].start_location);
      dataArah[i] = myRoute.steps[i].instructions;
      attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
      //alert(myRoute.steps[i].start_location);
      //jalur.innerHTML = newElement.childNodes[0].data;
    }
    var wr_panel = document.getElementById('warnings-panel');

    var tampil = "";
    for (var i = 0; i < dataArah.length; i++) {
      tampil +="<br>"+"<b>"+(i+1)+". </b>"+dataArah[i];
/*      var newChat = document.createElement("li"),
          newText = document.createTextNode(dataArah[i]);

      newChat.appendChild(newText);
      wr_panel.appendChild(newChat);*/
    }
    wr_panel.innerHTML = "<h3>Petunjuk Arah :</h3>"+tampil;
    console.log(dataArah.length+"\n"+tampil);
  }

  function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
}