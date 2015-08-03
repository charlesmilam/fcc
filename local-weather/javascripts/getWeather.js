var WEATHER_API_KEY = "87a3ac98e2e48918db144e9f69eeb057";

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
              apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +
                        results[i].address_components[0].short_name +
                        "&units=" +
                        unitType +
                        "&APPID=" +
                        WEATHER_API_KEY;

              // console.log("after: " + apiUrl);
              setWeatherFromApi(apiUrl, unitType);
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

function setWeatherFromApi(apiUrl, unitType) {
  var speedSymbol = "";
  var degreesSymbol = "";
  if (unitType === "imperial") {
    speedSymbol = " mph";
    tempSymbol = "&#8457;";
  }
  else {
    speedSymbol = " km/h";
    tempSymbol = " &#8451;";
  }
  $.getJSON(apiUrl, function(data){
    var iconDiv = "<div class='weather-icon curr-cond-data'><i class='owf owf-" +
      data.weather[0].id +
      "'></i></div>";
    var cityDiv = "<div class='city curr-cond-data'>" +
      data.name +
      "</div>";
    var tempDiv = "<div class='temp curr-cond-data'><span class='weather-label'>Current Temperature</span><br>" +
      data.main.temp.toFixed(1) + tempSymbol +
      "</div>";
    var humidityDiv = "<div class='humidity curr-cond-data'><span class='weather-label'>Humidity</span><br>" +
      data.main.humidity +
      "%</div>";
    var skyDiv = "<div class='sky curr-cond-data'>" +
      data.weather[0].description +
      "</div>";
    var windDiv = "<div class='wind curr-cond-data'><span class='weather-label'>Wind Direction &amp; Speed</span><br>" +
      translateWindDirection(data.wind.deg) +
      " @ " +
      data.wind.speed.toFixed(1) + speedSymbol +
      "</div>";

    console.log(data);
    $(".weather-icon").replaceWith(iconDiv);
    $(".city").replaceWith(cityDiv);
    $(".temp").replaceWith(tempDiv);
    $(".humidity").replaceWith(humidityDiv);
    $(".sky").replaceWith(skyDiv);
    $(".wind").replaceWith(windDiv);
  })
  .fail(function(jqxhr, status, error) {
    var err = status + ", " + error;
    alert("Sorry, the request failed: " + err);
  });
}

function translateWindDirection(deg) {
  var compassPoints=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  var val = Math.floor((deg / 22.5) + 0.5);

  return compassPoints[(val % 16)] || "direction not reported";
}
