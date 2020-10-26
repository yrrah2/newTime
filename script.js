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
    
    console.log("Sunset and sunrise array (i): " + sAdjusted);
    console.log("Day length (n): " + dayLength / dayHourLength);
    console.log("Night length (n): " + nightLength / nightHourLength);
    return [sAdjusted, dayHourLength, nightHourLength];
};

const displayTime = (sunArray, dayHourLength, nightHourLength) => {
    var d = new Date();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();

    var time = hh + ( mm + (ss/60) )/60;
    var [displayType, natural, work] = ["", 0, 0];
    
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
    const lat = -43.53;
    const long = -172.62;
	
	var locationPromise = getLocation();
	locationPromise
		.then(function(loc) { console.log(loc); var [latTest, longTest] = loc; })
		.catch(function(err) { console.log("No location"); });
    
    const [sunArray, dayHourLength, nightHourLength] = newTime(lat, long);
    
    displayTime(sunArray, dayHourLength, nightHourLength);
}

window.onload = pageload;
