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
    var [displayType, hAfter] = ["", 0];
    
    if (time > sunArray[1]){
        hAfter = (time - sunArray[1])/nightHourLength;
        displayType = "night";
    } else if (time > sunArray[0]) {
        hAfter = (time - sunArray[0])/dayHourLength;
        displayType = "day";
    } else {
        hAfter = (time + 24 - sunArray[1])/nightHourLength;
        displayType = "night";
    };
    
    var internationalTime = new Date().toLocaleTimeString("en-GB", {timeZone: "Africa/Addis_Ababa"});
    $("#international").text("International: " + internationalTime);
    $("#natural").text("Natural (" + displayType + "): " + hAfter);
}

const pageload = () => {
    const lat = -43.53;
    const long = -172.62;
    
    const [sunArray, dayHourLength, nightHourLength] = newTime(lat, long);
    
    displayTime(sunArray, dayHourLength, nightHourLength);
}

window.onload = pageload;
