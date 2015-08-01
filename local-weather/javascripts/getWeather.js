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
