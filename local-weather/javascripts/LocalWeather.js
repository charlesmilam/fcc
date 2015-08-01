var LocalWeather = function(unitType) {
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
  //var apiUrl = "test";

  this.setLocation = function() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      //console.log("in success");
      console.log(position);
      var lat = position.coords.latitude//.toString().slice(0, 2);
      var long = position.coords.longitude//.toString().slice(1, 3);
      console.log("before: " + apiUrl);
      var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" +
                lat +
                "&lon=" +
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
      localWeather.city = data.name;
      console.log(data.name);
    })
    .fail(function(jqxhr, status, error) {
      var err = status + ", " + error;
      alert("Sorry, the request failed: " + err);
    });
  }
} // end LocalWeather
