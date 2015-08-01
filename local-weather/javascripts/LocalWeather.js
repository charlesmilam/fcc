function LocalWeather(unitType) {
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

  this.getLocalWeather = function() {
    return this.localWeather;
  }
  this.getCity = function() {
    console.log("get city: " + this.localWeather.city);
    return this.localWeather.city;
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
    var result = $.getJSON(apiUrl, function(data){
      // console.log(this);
      // console.log("in get weather");
      // // console.log(data.name);
      // //this.localWeather = data.name;
      // console.log(this.localWeather);
      //console.log(data.responseText);
      // console.log(data.responseText.coord);

      // $.each(data, function(val){
      //   console.log(val);
      // });
      return data;
    })
    .fail(function(jqxhr, status, error) {
      var err = status + ", " + error;
      alert("Sorry, the request failed: " + err);
    });
    $.each(result, function(val){
      console.log(val);
    });
    console.log(result);
    // console.log(result.responseText);
  }
} // end LocalWeather
