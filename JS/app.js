$(document). ready(function(){

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