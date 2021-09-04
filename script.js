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

const convertTime = (time) => {
	```Converts a float time into a readable time.
	e.g. 17.17 --> 17:10```
	var hour = Math.floor(time);
	if(hour < 0){hour += 24;};
	var minute = Math.floor((time - Math.floor(time)) * 60);
	
	return [hour, minute];
}

const newTime = (lat, long) => {
    const sunrise = suntimes(lat, long, 0)[0];
   
    return sunrise;
};

const displayTime = (sunrise) => {
	var d = new Date();
	var hh = d.getUTCHours();
	var mm = d.getUTCMinutes();
	var ss = d.getUTCSeconds();

	var time = hh + ( mm + (ss/60) )/60;
	var natural = 0;
    
	console.log("Time: " + time);
	
	natural = time - sunrise;
	if(natural < 0){natural += 24;};
    
	var internationalTime = new Date().toLocaleTimeString("en-GB", {timeZone: "Africa/Addis_Ababa"});
	
	var sunrise_hour, sunrise_minute = convertTime(sunrise);
	console.log(sunrise_hour+":"+sunrise_minute)

	$("#international").text("International: " + internationalTime);
	$("#natural").text("Natural : " + natural);
	
	$("#sunrise").text("Sunrise: " + sunrise);
	console.log("Sunrise: " + sunrise);
}

const pageload = () => {
	var lat = 9.03;
	var long = 38.74;
	displayTime(newTime(lat, -long));

	var locationPromise = getLocation();
	locationPromise
		.then((loc) => {
			[lat, long] = loc;
		console.log("lat: "+lat+", long: "+long);
			displayTime(newTime(lat, -long));
		})
		.catch((err) => { 
			console.log("No location");
		});

	
}

window.onload = pageload;
