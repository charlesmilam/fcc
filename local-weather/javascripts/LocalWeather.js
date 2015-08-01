function LocalWeather(unitType) {
  var WEATHER_API_KEY = "87a3ac98e2e48918db144e9f69eeb057";
  var localWeather = {
        "city": "",
        "temp": 0,
        "humidity": 0,
        "sky": "",
        "wind": {
          "dir": 0,
          "speed": 0
        }
      };

  this.getLocalWeather = function() {
    return localWeather;
  }
  this.getCity = function() {
    console.log("get city: " + localWeather.city);
    return localWeather.city;
  }
  this.setLocation = function() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      //console.log("in success");
      //console.log(position);
      var lat = position.coords.latitude
      var long = position.coords.longitude
      var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" +
                lat +
                "&lon=" +
                long +
                "&units=" +
                unitType +
                "&APPID=" +
                WEATHER_API_KEY;

      console.log("after: " + apiUrl);
      getWeatherFromApi(apiUrl);
    };

    function error(error) {
      alert(error);
    };
  }

  function getWeatherFromApi(apiUrl) {
    //console.log(apiUrl);
    $.getJSON(apiUrl, function(data){
      console.log("in get weather");
      // console.log(data.name);
      localWeather.city = data.name;
      // console.log(localWeather);
    })
    .fail(function(jqxhr, status, error) {
      var err = status + ", " + error;
      alert("Sorry, the request failed: " + err);
    });
  }
} // end LocalWeather
