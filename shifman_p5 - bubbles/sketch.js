var bubbles = []; // this array stores all the bubble objects
var attractors = []; // attractor objects
var a;
var b;
var centre;
var gravity

function setup() {
    createCanvas(600,600);
    
  
    a = width/2;
    b = height/2;
    centre = new Attractor(a,b);
    //attractors.push(centre);
    
    //creates a number of bubble objects and puts it into an array
    for (var i = 0 ; i < 10 ; i++){
        bubbles[i] = new Bubble(random(width),random(height));   
        }
}

function mouseDragged() {
   bubbles.push(new Bubble(mouseX,mouseY));
    
    if (bubbles.length > 100 ){
        bubbles.shift();
        }
        
    }
    
    

function draw() {
    background(0,100,200);
    
    for (var i =0; i < bubbles.length; i++){
        // draws bubbles
        
        bubbles[i].display();
    
    
    
    // applys air resistance
    
        var drag = bubbles[i].velocity.copy();
        drag.normalize();
        var c = -5;
        var speed = bubbles[i].velocity.magSq();
        drag.mult(c*speed);
        bubbles[i].applyForce(drag);
        
    
    // creates gravity between bubbles
    for (var j = 0; (j < bubbles.length); j++ ) {
        
        //gravity pulling j towards i
        var gForce = bubbles[i].pull(bubbles[j]);
        bubbles[j].applyForce(gForce);
        
        
    }
        
    // updates the position of the bubble
    bubbles[i].move();
    // changes the velocity of the bubble if it contacts the edge of the screen
    bubbles[i].walls();
    
    }
    
}


    
  
    