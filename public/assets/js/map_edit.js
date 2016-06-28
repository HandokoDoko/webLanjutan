var map;
var marker;
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();

function initialize(){

    var _lat = document.getElementById("latitude").value;
    var _lng = document.getElementById("longitude").value;
    var myLatlng = new google.maps.LatLng(_lat,_lng);

    var mapOptions = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   
    map = new google.maps.Map(document.getElementById("myMap"), mapOptions);
    
    marker = new google.maps.Marker({
        map: map,
        position: myLatlng,
        draggable: true 
    });     
    
    geocoder.geocode({'latLng': myLatlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                $('#address').val(results[0].formatted_address);
                $('#latitude').val(marker.getPosition().lat());
                $('#longitude').val(marker.getPosition().lng());
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            }
        }
    });

                   
    google.maps.event.addListener(marker, 'dragend', function() {

    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                $('#address').val(results[0].formatted_address);
                $('#latitude').val(marker.getPosition().lat());
                $('#longitude').val(marker.getPosition().lng());
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
            }
        }
    });

});

}

google.maps.event.addDomListener(window, 'load', initialize);