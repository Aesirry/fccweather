$(document).ready(function(){
  var appID = "&APPID=3139e97f00ada161d76c25bf1a53ce3d";
  var call;
  var temp;
  var fahr;
  var cel;
  var icon;
  var iconSource;
  var descr;
  var city;
  var weather;

  if(navigator.geolocation) {
  // creates the call for the API
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      call = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + appID;
      console.log(call);


  // gets weather information
  $.getJSON(call, function(data){
    city = data.name;
    weather = data.weather[0].main;
    temp = data.main.temp;
    fahr = (temp * (9/5)) - 459.67;
    cel = temp - 273.15;
    icon = data.weather[0].icon;
    iconSource = "http://openweathermap.org/img/w/" + icon + ".png";
    descr = data.weather[0].description;
  });
});
  // Changes the temperature scale
  temp = cel;
  $("#temp-num").html(Math.floor(temp));
  $("#temp-scale").html("C&deg;");

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
