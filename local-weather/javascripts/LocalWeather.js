var LocalWeather = function(unitType) {
  var localWeather = {
    "city": "",
    "temp": 0,
    "humidity": 0,
    "sky": "";
    "wind": {
      "dir": 0;
      "speed": 0;
    }
  }

  
} // end LocalWeather






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
