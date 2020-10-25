const lat = -43.53;
const long = -172.62;

const s = suntimes(lat, long);
const st = [s[0]+3, s[1]+3];
console.log("Sunset and sunrise array: " + st);

var d = new Date();
var hh = d.getHours();
var mm = d.getMinutes();
var ss = d.getSeconds();

var time = hh + ( mm + (ss/60) )/60;

console.log("Time Now: " + hh + ": " + mm);
console.log("Time Now in decimal: " + time);

if (st[1] > time > st[0]){
  hAfter = time - st[0];
  $("#natural").text("Hours after sunrise: " + hAfter);
} else if (time > st[1]) {
  hAfter = time - st[1];
  $("#natural").text("Hours after sunset: " + hAfter);
} else {
  hAfter = st[0] - time + 24 - st[1];
  $("#natural").text("Hours after sunset: " + hAfter);
};

