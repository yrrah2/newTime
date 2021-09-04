const getLocation = (callback) => {
    var promise = new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve([position.coords.latitude, position.coords.longitude])
                }
            );
        } else {
          reject("Unknown");
        }
    });

    return promise;
}

const timeFix = (hour, minute) => {
	if (hour < 0) { hour += 24 }
	else if (hour >= 24) { hour -= 24 };
	
	if (minute<0) { minute += 60 }
	else if (minute>=60) { minute -= 60 };
	
	return [hour, minute];
};

const convertTime = (time) => {
	/*Converts a float time into a readable time.
	e.g. 17.17 --> 17:10*/
	var hour = Math.floor(time);
	
	var minute = Math.floor((time - Math.floor(time)) * 60);
	
	return timeFix(hour, minute);
}

const newTime = (lat, long) => suntimes(lat, long, 0)[0];

const displayTime = (sunrise) => {
	var d = new Date();
	var hh = d.getUTCHours();
	var mm = d.getUTCMinutes();
	var ss = d.getUTCSeconds();

	var internationalTimeDifference = convertTime(12*24.950833/180); /*24.95 is the longitude of Lake Makgadikgadi, the origin of the human species. 180 is half the degrees of a circle, and 12 is half the hours of the day.*/
	
	var [international_hour, international_minute] = timeFix([hh+internationalTimeDifference[0], mm+internationalTimeDifference[1]]);
	
	var time = hh + ( mm + (ss/60) )/60;
	var [natural_hour, natural_minute] = convertTime(time - sunrise);
	
	var sunrise_time = convertTime(sunrise);
	var [sunrise_hour, sunrise_minute] = timeFix([hh+sunrise_time[0], mm+sunrise_time[1]]);
	
	$("#international").text("International: " + international_hour + ':' + international_minute);
	$("#sunrise").text("Sunrise occurs at: " + sunrise_hour + ':' + sunrise_minute+" (INT)");
	$("#natural").text("Natural: " + natural_hour + ':' + natural_minute);
}

const pageload = () => {
	var lat = -20.716667;	/* Using the coordinates of Lake Makgadikgadi, the origin of the human species. */
	var long = 24.950833;	
	displayTime(newTime(lat, -long));

	var locationPromise = getLocation();
	locationPromise
		.then((loc) => {
			[lat, long] = loc;
		console.log("lat: "+lat+", long: "+long);
			displayTime(newTime(lat, long));
		})
		.catch((err) => { 
			console.log("No location");
		});

	
}

window.onload = pageload;
