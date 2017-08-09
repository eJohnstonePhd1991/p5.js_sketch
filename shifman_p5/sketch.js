var slider;
function setup() {
    createCanvas(600,600);
    //this slider controls the angle of the branches
    slider = createSlider(0, PI/2, PI/4,0.01);
    

}

function draw() {
    background(50);
    stroke(255);
    //sets coordinate origin to the bottom middle of the screen
    translate(300,height);
    angle = slider.value();
    branch(150);
}

function branch(len) {
    //draws the stem
    line(0, 0,0,-len);
    // moves the origin to the top of the stem
    translate(0,-len);
    if (len >14){
        //draw left branch
        push();
        rotate(-angle);
        branch(len*0.67);
        pop();
        //draw middle branch
        push();
        branch(len*0.67)
        pop();
      
        //draw right branch
        push();
        rotate(angle);
        branch(len*0.67);
        pop();
        
    }
   
        
    }
    
   
    
    
    
    
    
