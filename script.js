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

const newTime = (lat, long) => {
    const s = suntimes(lat, long);
    const sAdjusted = [s[0]+3, s[1]+3];
    
    const dayLength = sAdjusted[1] - sAdjusted[0];
    const nightLength = 24 - dayLength;
    const dayHourLength = dayLength / 16;
    const nightHourLength = nightLength / 16;
    
    return [sAdjusted, dayHourLength, nightHourLength];
};

const displayTime = (sunArray, dayHourLength, nightHourLength) => {
	var d = new Date();
	var hh = d.getHours();
	var mm = d.getMinutes();
	var ss = d.getSeconds();

	var time = hh + ( mm + (ss/60) )/60;
	var [displayType, natural, work] = ["", 0, 0];
    
	console.log("Time: " + time);
	if (time > sunArray[1]){
		natural = (time - sunArray[1])/nightHourLength;
		work = time - sunArray[0];
		displayType = "night";
	} else if (time > sunArray[0]) {
		work = time - sunArray[0];
		natural = (time - sunArray[0])/dayHourLength;
		displayType = "day";
	} else {
		work = time + 24 - sunArray[0]
		natural = (time + 24 - sunArray[1])/nightHourLength;
		displayType = "night";
	};
    
	var internationalTime = new Date().toLocaleTimeString("en-GB", {timeZone: "Africa/Addis_Ababa"});

	$("#international").text("International: " + internationalTime);
	$("#work").text("Work: " + work)
	$("#natural").text("Natural (" + displayType + "): " + natural);
}

const pageload = () => {
	var lat = 9.03;
	var long = 38.74;
	displayTime(newTime(lat, -long));

	var locationPromise = getLocation();
	locationPromise
		.then((loc) => {
			[lat, long] = loc;
			displayTime(newTime(lat, -long));
		})
		.catch((err) => { 
			console.log("No location");
		});

	
}

window.onload = pageload;
