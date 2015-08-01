function getWeather(apiUrl) {
  $.getJSON(apiUrl, function(data){
    console.log(data);
    var weatherData = {};
    var cityName = data.name;
    weatherData.city = data.name;
    console.log(weatherData);
    return weatherData;
  })
  .fail(function(jqxhr, status, error) {
    var err = status + ", " + error;
    alert("Sorry, the request failed: " + err);
  });
}
