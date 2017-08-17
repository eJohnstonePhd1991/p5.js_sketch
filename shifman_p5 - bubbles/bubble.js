function Bubble(x,y) {
    this.radius = randomGaussian(20,10);
    this.mass = PI*this.radius**2;
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.chroma = 255;
    
    
    this.display = function(){
        stroke(this.chroma);
        noFill();
        ellipse(this.position.x,this.position.y,2*this.radius,2*this.radius)
    }
    
    this.move = function() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(4);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      
    }
    
    this.applyForce = function(force) {
        mForce = p5.Vector.div(force,this.mass);
        this.acceleration.add(mForce);
        
    }
    
    
    this.collision = function(other) {
        //checks if two bubbles are colliding
        var d = dist(this.position.x,this.position.y, other.position.x, other.position.y);
        
        if (d < this.radius + other.radius){
            return true;
        }
        else {
            return false;
        }
        
    }
    
    this.pull = function(other) {
        var dir = p5.Vector.sub(this.position, other.position);
        var d = dir.magSq();
        //d = constrain(d,5,25);
        dir.normalize();
        dir.mult((0.001*other.mass*this.mass)/d);
        return dir;
        }
    
    this.wrapAround = function() {
        
        if (this.position.x + this.radius < 0 ){
            this.position.x = width + this.radius;
        }
        
        else if (this.position.x  > width + this.radius){
            this.position.x = -this.radius;
        }
        
        if (this.position.y + this.radius < 0) {
            this.position.y = height + this.radius;
            
            }
        else if (this.position.y  > height + this.radius) {
            this.position.y = - this.radius; ;
        }
     }
    
    this.walls = function() {
        
        if (this.position.x - this.radius < 0 ){
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }
        
        else if (this.position.x + this.radius  > width){
            this.position.x = width - this.radius;
            this.velocity.x *= -1;
        }
        
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
            
            }
        else if (this.position.y + this.radius  > height) {
            this.position.y = height - this.radius; ;
            this.velocity.y *= -1;
        }
     }
        
        
        
        
        
    }
    
function Attractor(x,y) {
    
    this.position = createVector(x,y);
    this.mass = 2;
    this.radius = 10;
    
    this.display = function() {
        fill(0,0,255);
        ellipse(this.position.x,this.position.y,2*this.radius,2*this.radius);
        }
    
    this.pull = function(other) {
        var dir = p5.Vector.sub(this.position, other.position);
        var d = dir.magSq();
        //d = constrain(d,5,25);
        dir.normalize();
        dir.mult((20*other.mass*this.mass)/d);
        return dir;
        }
    
}