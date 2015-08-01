function LocalWeather(unitType) {
  var WEATHER_API_KEY = "87a3ac98e2e48918db144e9f69eeb057";
  var unitType = unitType;
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
  }

  LocalWeather.prototype.getLocalWeather = function() {
    return this.localWeather;
  }
  LocalWeather.prototype.getCity = function() {
    console.log("get city: " + this.localWeather.city);
    return this.localWeather.city;
  }
  LocalWeather.prototype.setLocation = function() {
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
                this.unitType +
                "&APPID=" +
                this.WEATHER_API_KEY;

      console.log("after: " + apiUrl);
      //this.getWeatherFromApi(apiUrl);
      $.getJSON(apiUrl, function(data){
        console.log("in get weather");
        // console.log(data.name);
        this.localWeather.city = data.name;
        // console.log(localWeather);
      })
      .fail(function(jqxhr, status, error) {
        var err = status + ", " + error;
        alert("Sorry, the request failed: " + err);
      });
    };

    function error(error) {
      alert(error);
    };
  }

  LocalWeather.prototype.getWeatherFromApi = function(apiUrl) {
    //console.log(apiUrl);
    $.getJSON(apiUrl, function(data){
      console.log("in get weather");
      // console.log(data.name);
      this.localWeather.city = data.name;
      // console.log(localWeather);
    })
    .fail(function(jqxhr, status, error) {
      var err = status + ", " + error;
      alert("Sorry, the request failed: " + err);
    });
  }
//} // end LocalWeather
