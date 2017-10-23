

var mapimg;

var clat = 0;
var clon = 0;
var issX;
var issY;
var cx;
var cy;
var ww = 1024;
var hh = 512;

var zoom = 1;
var coordBox

function preload() {
    var token = '?access_token=pk.eyJ1IjoiZWpvaG5zdG9uZTE5OTEiLCJhIjoiY2o3MHJwY2c2MDhuaDM1cXI4MjNhcXQ4NSJ9.OV6oOSiqSSCqRFn_N2kVNw';
 
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clon + ',' + clat + ',' + zoom + '/' +
    ww + 'x' + hh +
    token);
 
}




function setup() {
  createCanvas(ww, hh);

  setInterval(askIss,1000);

  cx = mercX(clon);
  cy = mercY(clat);
    
    coordBox = createDiv("Latitude:");
    
     
  
    
    
}

function draw(){
    translate(width / 2, height / 2);
    imageMode(CENTER);
    image(mapimg, 0, 0);

    
    var x = mercX(0) - cx;
    var y = mercY(0) - cy;
    
      
     if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }
    
    
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, 10, 10);
    ellipse(issX, issY, 10, 10);
    
    
}

function askIss() {
    loadJSON('https://api.wheretheiss.at/v1/satellites/25544',getData);

}
function getData(data) {
  var issLat = Number(data.latitude);
    var issLong = Number(data.longitude);   
    
    coordBox.html("Lat:" + issLat.toFixed(2) + " Long:" + issLong.toFixed(2));
    
    
    
 
    issX = mercX(issLong) - cx;
    issY = mercY(issLat) - cy;
    
    
     if(issX < - width/2) {
       issX += width;
     } else if(issX > width / 2) {
       issX -= width;
     }
       
}


function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}
