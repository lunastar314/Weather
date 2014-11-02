$(document).ready(function(){

	var apiKey = '9dd895f2e791fb8329d7d7f729d1e016';
	var apiURL = 'https://api.forecast.io/forecast/' + apiKey;
	var defaultLat = '40.8264';
	var defaultLng = '-73.8786';
	
	// Request the user's Latitude/Longitude
	if (Modernizr.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		}
		else {
			//Prompt User
		}
		
		//Received a Latitude/Longitude from the browser
		function success(position) {
			console.log(position);
			getWeatherWithPos(position.coords.latitude,position.coords.longitude);
		}
		
		//Unable to find a Latitude/Longitude
		function error(error) {
			console.log(error);
			getWeatherWithPos(defaultLat, defaultLng);
		}
		
		//Request weather from forecast.io with a Latitude/Longitude
		function getWeatherWithPos(lat,lng) {
			//Construct the url to request
			apiURL += "/" + lat + lng;
			console.log(apiURL);
			
			//Make a request to forecast.io
			$.ajax({
					url: apiURL,
					type: "GET",
					crossDomain: true,
		dataType: 'jsonp',
					success: function (response) {
					//The request succeeded
					console.log(response);
					parseWeather(response);
					$('#loader').remove();
					showError();
					}
			});
		}
	function parseWeather(data) {
		var tempImage = getTempImage(data.currently.apparentTemperature);
		$('#temp').text("Currently: " + data.currently.apparentTemperature);
		$('#temp').addClass('degrees');
		
	function getTempImage(temperature) {
		if ( temperature > .30 )
			return '<img src="WeatherAppBG30.jpg"/>';
		
});
/*var weeklyForecast = ["clear-day", "rain", "rain", "wind", "cloud", "cloud", "fog"];
    for ( var i = 0; i < weeklyForecast.length; i++) {
        var dailyWeather = weeklyForecast[i];
        var day = $('li').get(i);
        var color = parseDay(dailyWeather);
        $(day).css( 'background-color', color );
    }

    function parseDay(condition){

    	switch(condition) {
    		case "clear-day":
    		case "clear-night":	
                var color = "rgb(200,200,0)";
                break;
    		case "rain":
    		case "snow":
    		case "sleet":
                var color = "rgb(0,0,200)";
                break;
    		case "wind":
    		case "fog":
    		case "cloudy":
    		case "partly-cloudy-day":
    		case "partly-cloudy-night":
                var color = "rgb(125,125,125)";
                break;
    		default:
    			break;	
    	}
        return color;

    }
});