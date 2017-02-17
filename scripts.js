$(document).ready(function() {
  $.getJSON('http://ip-api.com/json', function(result){
      var lat = result['lat'];
      var lon = result['lon'];
      var call = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=3139e97f00ada161d76c25bf1a53ce3d";
      console.log(call);

      $.getJSON(call, function(data){
        var temp = data.main.temp;
        var fahr = (temp * (9/5)) - 459.67;
        var cel = temp - 273.15;

        $("#location").html(data.name);
        $("#country").html(data.sys.country);

        $("#temp-num").html(Math.floor(cel));
        $("#temp-scale").html("C&deg;");

        var weathericons = new Object();
        weathericons.clouds = "http://res.cloudinary.com/dn78pgfvx/image/upload/v1487299385/clouds_gbbpcv.png";
        weathericons.clear = "http://res.cloudinary.com/dn78pgfvx/image/upload/v1487299385/clear_aiha7j.png";
        weathericons.rain = "http://res.cloudinary.com/dn78pgfvx/image/upload/v1487299385/rain_wqjc5v.png";
        weathericons.snow = "http://res.cloudinary.com/dn78pgfvx/image/upload/v1487299385/snow_fzbvic.png";

          switch (data.weather[0].description){
            case 'scattered clouds': $("#weather-icon").attr({src: weathericons.clouds});
            break;

            case 'few clouds':$("#weather-icon").attr({src: weathericons.clouds});
            break;

            case 'broken clouds': $("#weather-icon").attr({src: weathericons.clouds});
            break;

            case 'clear sky': $("#weather-icon").attr({src: weathericons.clear});
            break;

            case 'mist': $("#weather-icon").attr({src: weathericons.clouds});
            break;

            case 'snow': $("#weather-icon").attr({src: weathericons.snow});
            break;

            case 'thunderstorm': $("#weather-icon").attr({src: weathericons.rain});
            break;

            case 'rain': $("#weather-icon").attr({src: weathericons.rain});
            break;

            case 'shower rain': $("#weather-icon").attr({src: weathericons.rain});
            break;

            case 'light rain': $("#weather-icon").attr({src: weathericons.rain});
            break;
          }

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
      });
  });
});
