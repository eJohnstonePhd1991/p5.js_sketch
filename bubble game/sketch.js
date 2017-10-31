// hello gitusers!
let play;
let items = [];
let score;
let nxtLevel;
let pHealth;
let itemSpawnTime = 1000;
let gameState = false;
let gameButton;
let itemTimer;

function setup(){
    createCanvas(400,400);
    background(100);
    textSize(32);
    textAlign(CENTER);
    text("Bubble game v0.1",width/2,height/3);
    score = createDiv("score");
    nxtLevel = createDiv("next level:");
    pHealth = createDiv("health:");
    gameButton = createButton("start");
    gameButton.mousePressed(changeState);
    
    
    
}

function draw(){
    if (gameState){
        background(100);
    play.update();
    play.draw();
    
    for (var i = items.length-1; i >=0;i--){
        items[i].draw();
        if (play.collision(items[i])){
            console.log("colide");
            
            if (items[i].type === "item"){
                play.itemCollect();
            }
            else if(items[i].type =="health"){
                play.hUp();
            }
            else {
                play.damage();
                
                
            }
            items.splice(i,1);
            }
        }
    }
    
}


function resetGame(){
    background(100);
    items = [];
    play= new Player();
    score.html("score: " + play.score);
    nxtLevel.html("next level: " + play.nextLevel);
    pHealth.html("health: " + play.health);
    
    
}
function Player(){
    // player has the properties of position, size and health
    this.pos = createVector(width/2,height/2);
    this.size = 12;
    this.health = 5;
    this.score = 0;
    this.nextLevel = 5;
    
    // this function draws the player
    this.draw = function(){
        fill(255);
        ellipse(this.pos.x,this.pos.y,this.size);
    }
    // this function moves p in response to keypresses
    this.update = function(){
        
        if (keyIsDown(LEFT_ARROW)){
            this.dir(-5,0);
        }
        if (keyIsDown(RIGHT_ARROW)){
            this.dir(5,0);
        }
        if (keyIsDown(UP_ARROW)){
            this.dir(0,-5);
        }
        if (keyIsDown(DOWN_ARROW)){
            this.dir(0,5);
        }
        
        
        
    
    }
    
    this.dir = function(x,y){
        this.pos.x += x;
        this.pos.y += y;
        
        if (this.pos.x < 0){
            this.pos.x = width;
        }
        if (this.pos.x > width){
            this.pos.x = 0;
        }
        
        if (this.pos.y < 0){
            this.pos.y = height;
        }
        if (this.pos.y > height){
            this.pos.y = 0;
        }
    }
    
    this.itemCollect = function(){
        this.score++;
        score.html("score: " + play.score);
        
        if (this.score >= this.nextLevel){
            this.levelUp();
            nxtLevel.html("next level: " + play.nextLevel);
        }
        
    }
    
    this.collision = function(item){
        return (this.pos.dist(item.pos) <= this.size);
        
    }
    
    this.levelUp = function(){
        this.nextLevel *= 2;
        this.size += 5;
    }
    
    this.hUp = function(){
        this.health ++;
        pHealth.html("health: " + play.health);
    }
    
    this.damage = function(){
        this.health --;
        pHealth.html("health: " + play.health);
        
        if (play.health <=0){
                    changeState();
                    textSize(32);
                    textAlign(CENTER);
                    text("Game Over!",width/2,height/3);
                }
    }
    
}

function Item(x,y) {
    this.pos = createVector(x,y);
    this.type = "item";
    var size = 8
    this.draw = function(){
        fill(0,0,255);
        ellipse(this.pos.x,this.pos.y,size);
    }
    
    
}

function Enemy(x,y) {
    
    this.pos = createVector(x,y);
    this.type = "enemy";
    var size = 6
    this.draw = function(){
        fill(255,0,0);
        triangle(this.pos.x -size, this.pos.y +size,this.pos.x +size, this.pos.y +size,this.pos.x, this.pos.y -size );
    }
    
    
}



function hUp(x,y){
    
    this.pos = createVector(x,y);
    this.type = "health";
    var size = 6
    this.draw = function(){
        fill(0,255,0);
        ellipse(this.pos.x,this.pos.y,2*size,size);
    }
    
}

function genItem(){
    var item
    var rand = random();
    if (rand > 0.9){
        item = new hUp(random(width),random(height));
    }
    else if (rand > 0.7) {
        item = new Enemy(random(width),random(height));
    }
    else{
        item = new Item(random(width),random(height));
    }
    
    items.push(item);
    
}

function changeState(){
   if (!gameState){
       gameState = true;
       gameButton.html("pause");
       itemTimer = setInterval(genItem,itemSpawnTime);
       resetGame();
   }
    else{
        gameState = false;
        gameButton.html("restart");
        clearInterval(itemTimer);
    }
    
}