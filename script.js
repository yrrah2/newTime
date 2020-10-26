const newTime = (lat, long) => {
    const s = suntimes(lat, long);
    const sAdjusted = [s[0]+3, s[1]+3];
    
    const dayLength = sAdjusted[1] - sAdjusted[0];
    const nightLength = 24 - dayLength;
    const hourLength = dayLength / 16;
    
    console.log("Sunset and sunrise array (i): " + sAdjusted);
    console.log("Day length (n): " + dayLength / hourLength);
    console.log("Night length (n): " + nightLength / hourLength);
    return [sAdjusted, hourLength];
};

const displayTime = (sunArray, hourLength) => {
    var d = new Date();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();

    var time = hh + ( mm + (ss/60) )/60;

    if (time > sunArray[1]){
        hAfter = (time - sunArray[1])/hourLength;
        displayText = "Hours after sunset: "  + hAfter;
    } else if (time > sunArray[0]) {
        hAfter = (time - sunArray[0])/hourLength;
        displayText = "Hours after sunrise: " + hAfter;
    } else {
        hAfter = (time + 24 - sunArray[1])/hourLength;
        displayText = "Hours after sunset: "  + hAfter;
    };
    
    $("#natural").text(displayText);
}

const pageload = () => {
    const lat = -43.53;
    const long = -172.62;
    
    const [sunArray, hourLength] = newTime(lat, long);
    
    displayTime(sunArray, hourLength);
}

window.onload = pageload;
