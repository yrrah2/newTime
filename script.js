const newTime = (lat, long) => {
    const s = suntimes(lat, long);
    const st = [s[0]+3, s[1]+3];
    console.log("Sunset and sunrise array: " + st);
    return st;
};

const displayTime = (sunArray) => {
    var d = new Date();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();

    var time = hh + ( mm + (ss/60) )/60;

    console.log("Time Now: " + hh + ": " + mm);
    console.log("Time Now in decimal: " + time);

    if (sunArray[1] > time > sunArray[0]){
        hAfter = time - sunArray[0];
        displayText = "Hours after sunrise: " + hAfter;
    } else if (time > sunArray[1]) {
        hAfter = time - sunArray[1];
        displayText = "Hours after sunset: " + hAfter;
    } else {
        hAfter = sunArray[0] - time + 24 - sunArray[1];
        displayText = "Hours after sunset: " + hAfter;
    };

    console.log(displayText);
    $("#natural").text(displayText);
}

const pageload = () => {
    const lat = -43.53;
    const long = -172.62;

    var sunArray = newTime(lat, long);
    displayTime(sunArray);
}

window.onload = pageload;
