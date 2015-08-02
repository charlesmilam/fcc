latlng 	 = new google.maps.LatLng(lat, lng),
geocoder = new google.maps.Geocoder();
geocoder.geocode({'latLng': latlng}, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    if (results[1]) {
      for (var i = 0; i < results.length; i++) {
        if (results[i].types[0] === "locality") {
          var city = results[i].address_components[0].short_name;
          var state = results[i].address_components[2].short_name;
          $("input[name='location']").val(city + ", " + state);
        }
      }
    }
    else {console.log("No reverse geocode results.")}
  }
  else {console.log("Geocoder failed: " + status)}
});
},
function() {console.log("Geolocation not available.")})
