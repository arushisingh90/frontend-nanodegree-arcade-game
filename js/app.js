// Whole-script strict mode syntax
'use strict';

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    // when enemy finishes width of canvas, reset location(x,y) and speed
    if(this.x > 505){
        this.x = 0;
        this.y = Math.floor(Math.random() * 166) + 83;
        this.speed = Math.floor(Math.random() * 200) + 100;
    }

    this.collisionCheck();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collisionCheck = function(){
    // Check if enemy and player collided
    if((this.x<= player.x + 15 && this.x+80 >= player.x+15 ||
        this.x <= player.x + 95 && this.x+80 >= player.x+95) &&
        (this.y + 75 <= player.y + 140 && this.y+155 >= player.y + 140 ||
        this.y + 75 <= player.y + 60 && this.y+155 >= player.y + 60 )){
        player.x = 202;
        player.y = 415;
        ctx.clearRect(149,0,205,50);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y,speed){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y; 
    this.speed = speed;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// for future use
Player.prototype.update = function() {
};

Player.prototype.handleInput = function(keyPressed){

    // Move player
    if(keyPressed == 'left')
        this.x -= 20;
    else if(keyPressed == 'right')
        this.x += 20;
    else if(keyPressed == 'up')
        this.y -= 20;
    else if(keyPressed == 'down')
        this.y += 20

    this.inCanvasCheck();    
    this.playerWinCheck();
};


Player.prototype.inCanvasCheck = function(){
    // Make sure player doesnot move outside canvas
    if(this.x < 0){
        this.x = 0;
    }
    if(this.x > 404){
        this.x = 404;
    }
    if(this.y < 0){
        this.y = 0;
    }
    if(this.y > 415){
        this.y = 415;
    }
};

Player.prototype.playerWinCheck = function(){
    //Check if player won
    if(this.y >= 0 && this.y <= 41.5){
        this.x = 202;
        this.y = 415;
        ctx.strokeRect(150,0,200,50);
        ctx.textAlign = "center";
        ctx.font = "36pt impact";
        ctx.strokeText("You won!",250,45);
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202,415,50);
var allEnemies = [];
var numEnemies = 3;
 for (var i = 0; i < numEnemies; i++) {
        var enemy = new Enemy(0,Math.floor(Math.random()*166)+83,Math.floor(Math.random()*200)+100);
        allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Event listner added on key down so that user can contineously 
// press the key to make the player move faster
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
