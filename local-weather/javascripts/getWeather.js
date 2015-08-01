var WEATHER_API_KEY = "87a3ac98e2e48918db144e9f69eeb057";
var apiUrl = "";
// var city = "";
// var temp = 0;
// var humidity = 0;
// var sky = "";
// var wind = {
//   "dir": 0,
//   "speed": 0
// };

function setLocation(unitType) {
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    //console.log("in success");
    //console.log(position);
    var lat = position.coords.latitude
    var long = position.coords.longitude
    apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" +
              lat +
              "&lon=" +
              long +
              "&units=" +
              unitType +
              "&APPID=" +
              WEATHER_API_KEY;

    console.log("after: " + apiUrl);
    setWeatherFromApi(apiUrl);
  };

  function error(error) {
    alert(error);
  };
}

function setWeatherFromApi() {
  $.getJSON(apiUrl, function(data){
    console.log(data);
    $(".city").text(data.name);
    $(".temp").text(data.main.temp);
    $(".humidity").text(data.main.humidity);
    $(".sky").text(data.weather[0].description);
    $(".wind-dir").text(data.wind.dir);
    $(".wind-speed").text(data.wind.speed);
  })
  .fail(function(jqxhr, status, error) {
    var err = status + ", " + error;
    alert("Sorry, the request failed: " + err);
  });
}
