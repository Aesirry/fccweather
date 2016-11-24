$(document).ready(function(){
  var temp;
  var fahr;
  var cel;


  if(navigator.geolocation) {
  // creates the call for the API
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var call = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=3139e97f00ada161d76c25bf1a53ce3d";

      // gets weather information
      $.getJSON(call, function(data){
        var city = data.name;
        var weather = data.weather[0].main;
        temp = data.main.temp;
        fahr = (temp * (9/5)) - 459.67;
        cel = temp - 273.15;
        var icon = data.weather[0].icon;
        var descr = data.weather[0].description;
        var country = data.sys.country;

        // change the weather icon
        var iconSource = "http://openweathermap.org/img/w/" + icon + ".png";
        $("#weather-icon").attr({
          src: iconSource,
          alt: descr
        });

        // change the location
        $("#location").html(city);
        $("#country").html(country);

        temp = cel;
        $("#temp-num").html(Math.floor(temp));
        $("#temp-scale").html("C&deg;");
      });
    });

    // Changes the temperature scale
    $("#temp-switch").on("click", function(){
      if(temp == fahr){
        temp = cel;
        $("#temp-num").html(Math.floor(temp));
        $("#temp-scale").html("C&deg;");
      }
      else{
        temp = fahr;
        $("#temp-num").html(Math.floor(temp));
        $("#temp-scale").html("F&deg;");
      }
    });
  };
});
