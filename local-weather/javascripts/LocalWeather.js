var LocalWeather = function(unitType) {
  var WEATHER_API_KEY = "87a3ac98e2e48918db144e9f69eeb057";
  this.localWeather = {
        "city": "",
        "temp": 0,
        "humidity": 0,
        "sky": "",
        "wind": {
          "dir": 0,
          "speed": 0
        }
      };
  var apiUrl = "test";

  this.setLocation = function() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      //console.log("in success");
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log("before: " + apiUrl);
      apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" +
                lat +
                "lon=" +
                long +
                "&units=" +
                unitType +
                "&APPID=" +
                WEATHER_API_KEY;

      console.log("after: " + apiUrl);
      getWeather(apiUrl);
    };

    function error(error) {
      alert(error);
    };
  }

  var getWeather = function(apiUrl) {
    console.log(apiUrl);
    $.getJSON(apiUrl, function(data){
      console.log(data);
      this.localWeather.city = data.name;
      console.log(data.name);
    })
    .fail(function(jqxhr, status, error) {
      var err = status + ", " + error;
      alert("Sorry, the request failed: " + err);
    });
  }
} // end LocalWeather
