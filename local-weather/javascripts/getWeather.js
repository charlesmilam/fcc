var WEATHER_API_KEY = "87a3ac98e2e48918db144e9f69eeb057";
// var apiUrl = "";

function setLocation(unitType) {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat, long);
    var geocoder = new google.maps.Geocoder();
    var apiUrl = "";

    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          for (var i = 0; i < results.length; i++) {
            if (results[i].types[0] === "locality") {
              //console.log(results[i].address_components[0].short_name);
              apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +
                        results[i].address_components[0].short_name +
                        "&units=" +
                        unitType +
                        "&APPID=" +
                        WEATHER_API_KEY;

              // console.log("after: " + apiUrl);
              setWeatherFromApi(apiUrl);
            }
          }
        }
        else {alert("Sorry, there were no results for your location.")}
      }
      else {console.log("Geocoder failed: " + status)}
    });
  };

  function error(error) {
    alert(error);
  };
}

function setWeatherFromApi(apiUrl) {
  $.getJSON(apiUrl, function(data){
    console.log(data);
    $(".city").text(data.name);
    $(".temp").append(data.main.temp.toFixed(1));
    $(".humidity").append(data.main.humidity);
    $(".sky").append(data.weather[0].description);
    $(".wind").append(translateWindDirection(data.wind.deg) + " @" +
      data.wind.speed.toFixed(1) + " mph"
    );
    // $(".wind-speed").append(data.wind.speed.toFixed(1));
  })
  .fail(function(jqxhr, status, error) {
    var err = status + ", " + error;
    alert("Sorry, the request failed: " + err);
  });
}

function translateWindDirection(deg) {
  var compassPoints=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  var val = Math.floor((deg / 22.5) + 0.5);

  return compassPoints[(val % 16)];
}
