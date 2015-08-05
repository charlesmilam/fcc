var WEATHER_API_KEY = "87a3ac98e2e48918db144e9f69eeb057";
var date = new Date();

function setLocation(unitType) {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat, long);
    var geocoder = new google.maps.Geocoder();
    var apiCurrentUrl = "";
    var apiForecastUrl = "";

    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          for (var i = 0; i < results.length; i++) {
            if (results[i].types[0] === "locality") {
              apiCurrentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +
                        results[i].address_components[0].short_name +
                        "&units=" +
                        unitType +
                        "&APPID=" +
                        WEATHER_API_KEY;

              apiForecastUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
                        results[i].address_components[0].short_name +
                        "&units=" +
                        unitType +
                        "&APPID=" +
                        WEATHER_API_KEY;

              // console.log("after: " + apiUrl);
              setCurrentWeatherFromApi(apiCurrentUrl, unitType);
              setForecastWeatherFromApi(apiForecastUrl, unitType);
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

function setCurrentWeatherFromApi(apiUrl, unitType) {
  var speedSymbol = "";
  var degreesSymbol = "";
  var dayNight = "";
  var currHour = date.getHours();

  if (unitType === "imperial") {
    speedSymbol = " mph";
    tempSymbol = "&#8457;";
  }
  else {
    speedSymbol = " km/h";
    tempSymbol = " &#8451;";
  }

  if (currHour > 7 && currHour < 19) {
    dayNight = "-d";
  }
  else {
    dayNight = "-n";
  }

  $.getJSON(apiUrl, function(data){
    var weatherIcon = data.weather[0].id;
    var city = data.name;
    var temp = data.main.temp.toFixed(1);
    var humidity = data.main.humidity;
    var weatherDescription = data.weather[0].description;
    var windDirection = translateWindDirection(data.wind.deg);
    var windSpeed = data.wind.speed.toFixed(1);
    var iconDiv = "<div class='weather-icon curr-cond-data'><i class='owf owf-" +
      weatherIcon +
      dayNight +
      "'></i></div>";
    var cityDiv = "<div class='city curr-cond-data'>" +
      city +
      "</div>";
    var tempDiv = "<div class='temp curr-cond-data'><span class='weather-label'>Current Temperature</span><br>" +
      temp + tempSymbol +
      "</div>";
    var humidityDiv = "<div class='humidity curr-cond-data'><span class='weather-label'>Humidity</span><br>" +
      humidity +
      "%</div>";
    var skyDiv = "<div class='sky curr-cond-data'>" +
      weatherDescription +
      "</div>";
    var windDiv = "<div class='wind curr-cond-data'><span class='weather-label'>Wind Direction &amp; Speed</span><br>" +
      windDirection +
      " @ " +
      windSpeed + speedSymbol +
      "</div>";

    console.log(data);
    $(".weather-icon").replaceWith(iconDiv);
    $(".city").replaceWith(cityDiv);
    $(".temp").replaceWith(tempDiv);
    $(".humidity").replaceWith(humidityDiv);
    $(".sky").replaceWith(skyDiv);
    $(".wind").replaceWith(windDiv);

    setBackgroundToTemp(temp, unitType);
  })
  .fail(function(jqxhr, status, error) {
    var err = status + ", " + error;
    alert("Sorry, the request failed: " + err);
  });
}

function setForecastWeatherFromApi(apiForecastUrl, unitType) {
  var speedSymbol = "";
  var degreesSymbol = "";
  var dayNight = "";
  var currDay = date.toString().slice(0, 10);
  console.log(currDay);
  if (unitType === "imperial") {
    speedSymbol = " mph";
    tempSymbol = "&#8457;";
  }
  else {
    speedSymbol = " km/h";
    tempSymbol = " &#8451;";
  }

  // if (currHour > 7 && currHour < 19) {
  //   dayNight = "-d";
  // }
  // else {
  //   dayNight = "-n";
  // }


  $.getJSON(apiForecastUrl, function(data){
    console.log(data);
    var weatherIcon = data.weather[0].id;
    var city = data.name;
    var temp = data.main.temp.toFixed(1);
    var humidity = data.main.humidity;
    var weatherDescription = data.weather[0].description;
    var windDirection = translateWindDirection(data.wind.deg);
    var windSpeed = data.wind.speed.toFixed(1);
    var iconDiv = "<div class='weather-icon curr-cond-data'><i class='owf owf-" +
      weatherIcon +
      dayNight +
      "'></i></div>";
    var cityDiv = "<div class='city forecast-data'>" +
      city +
      "</div>";
    var tempDiv = "<div class='temp forecast-data'><span class='weather-label'>Current Temperature</span><br>" +
      temp + tempSymbol +
      "</div>";
    var humidityDiv = "<div class='humidity forecast-data'><span class='weather-label'>Humidity</span><br>" +
      humidity +
      "%</div>";
    var skyDiv = "<div class='sky forecast-data'>" +
      weatherDescription +
      "</div>";
    var windDiv = "<div class='wind forecast-data'><span class='weather-label'>Wind Direction &amp; Speed</span><br>" +
      windDirection +
      " @ " +
      windSpeed + speedSymbol +
      "</div>";

    console.log(data);
    $(".weather-icon").replaceWith(iconDiv);
    $(".city").replaceWith(cityDiv);
    $(".temp").replaceWith(tempDiv);
    $(".humidity").replaceWith(humidityDiv);
    $(".sky").replaceWith(skyDiv);
    $(".wind").replaceWith(windDiv);

    setBackgroundToTemp(temp, unitType);
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

function setBackgroundToTemp(temp, unitType) {
  var colors = {
    veryHot: "#FF5722",
    hot: "#FF9800",
    warm: "#FFC107",
    pleasant: "#FFEB3B",
    cool: "#CDDC39",
    chilly: "#8BC34A",
    cold: "#00BCD4",
    freezing: "#03A9F4",
    veryCold: "#2196F3",
    tooCold: "#3F51B5",
    wayTooCold: "#673AB7",
    superCold: "#9C27B0"
  }

  if (unitType === "metric") {
    temp = temp * 1.8 + 32;
  }

  if (temp >= 90) {
    return $("body").css("background-color", colors.veryHot);
  }
  else if (temp >= 80 && temp < 90  ) {
    return $("body").css("background-color", colors.hot);
  }
  else if (temp >= 70 && temp < 80) {
    return $("body").css("background-color", colors.pleasant);
  }
  else if (temp >= 60 && temp < 70) {
    return $("body").css("background-color", colors.cool);
  }
  else if (temp >= 45 && temp < 60) {
    return $("body").css("background-color", colors.chilly);
  }
  else if (temp >= 20 && temp < 45) {
    return $("body").css("background-color", colors.cold);
  }
  else if (temp >= 0 && temp < 20) {
    return $("body").css("background-color", colors.freezing);
  }
  else if (temp >= -10 && temp < 0) {
    return $("body").css("background-color", colors.veryCold);
  }
  else if (temp >= -20 && temp < -10) {
    return $("body").css("background-color", colors.tooCold);
  }
  else if (tmep >= -30 && temp < -20) {
    return $("body").css("background-color", colors.wayTooCold);
  }
  else if (temp < -40) {
    return $("body").css("background-color", colors.superCold);
  }
}
