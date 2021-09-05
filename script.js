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

const timeDifference = (time1, time2) => {
	/* time1 and time2 are both decimal time values */
	
	if (time1 > time2) {return time2 - time1}
	else if (time1 < time2) {return 24 + time1 - time2}
	else { return 0 };
};

const convertTime = (time) => {
	/* 
	* Converts a float time into a readable time.
	* e.g. 17.17 --> 17:10
	*/
	
	let hour = Math.floor(time);
	let minute = Math.floor((time - Math.floor(time)) * 60);
	
	return timeFix(hour, minute);
}

const displayTime = (international_time, sunrise_time, natural_time) => {
	$("#international").text("International: " + international_time[0] + ':' + international_time[1]);
	$("#sunrise").text("Sunrise occurs at: " + sunrise_time[0] + ':' + sunrise_time[1]);
	$("#natural").text("Natural: " + natural_time[0] + ':' + natural_time[1]);
}

const calculateTimes = (lat, long) => {

	let d = new Date();
	let hour_utc = d.getUTCHours();
	let minute_utc = d.getUTCMinutes();
	let second_utc = d.getUTCSeconds();
	
	let time_now_utc = hour_utc + ( minute_utc + (second_utc/60) )/60;
	let sunrise_utc = suntimes(lat, long)[0];
	
	/*
	* Find the current time in Lake Makgadikgadi, the origin of the human species.
	* 24.95 is the longitude, 180 is half the degrees of a circle, and 12 is half the hours of the day.
	*/
	let internationalTimeDifference = convertTime(12*24.950833/180); 
	let international_time = timeFix(hour_utc+internationalTimeDifference[0], minute_utc+internationalTimeDifference[1]);
	
	/* Find the time of local sunrise in international time	*/
	let sunrise_time = convertTime(sunrise_utc);
	sunrise_time = timeFix(internationalTimeDifference[0]+sunrise_time[0], internationalTimeDifference[1]+sunrise_time[1]);
	
	/* Find the natural time (time since sunrise) */
	let natural_time = convertTime(timeDifference(time_now_utc, sunrise_utc));	
	
	displayTime(international_time, sunrise_time, natural_time);
};

const pageload = () => {
	var lat = -20.716667;	/* Using the coordinates of Lake Makgadikgadi, the origin of the human species. */
	var long = 24.950833;	
	calculateTimes(lat, long);

	var locationPromise = getLocation();
	locationPromise
		.then((loc) => {
			[lat, long] = loc;
		console.log("lat: "+lat+", long: "+long);
			calculateTimes(lat, long);
		})
		.catch((err) => { 
			console.log("No location");
		});
}

window.onload = pageload;
