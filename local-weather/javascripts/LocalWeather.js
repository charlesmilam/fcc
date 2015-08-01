var LocalWeather = function(unitType) {
  var WEATHER_API_KEY = 87a3ac98e2e48918db144e9f69eeb057;
  var localWeather = {
    "city": "",
    "temp": 0,
    "humidity": 0,
    "sky": "";
    "wind": {
      "dir": 0;
      "speed": 0;
    }
  };

  var apiUrl = "";

  function getLocation() {
    navigator.geolocation.getCurrentPosition(buildApiUrl);
  }

  function buildApiUrl(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" +
              lat +
              "lon=" +
              long +
              "&units=" +
              unitType +
              "&APPID=" +
              WEATHER_API_KEY;
  }

  function getWeather(apiUrl) {
    $.getJSON(apiUrl, function(data){
      console.log(data);
      var cityName = data.name;
    })
    .fail(function(jqxhr, status, error) {
      var err = status + ", " + error;
      alert("Sorry, the request failed: " + err);
    });
  }
} // end LocalWeather
