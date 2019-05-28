class Character {
	constructor () {
		this.sprite = 'images/';
	}

	render () {
		ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
	}
}
//Enemy class
class Enemy extends Character{
    constructor(x,y){
        super();
        //load images
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;

        this.offscreen = false;
    }

    //update enemy's positioning
    //parameter: dt, a time delta between ticks
    update(dt){
        //set the point when the enemy is outside the screen
        if (this.x > 5) {
            this.offscreen = true;
        }

		var random = Math.floor(Math.random() * 5);

		//replace the enemy
		if (this.offscreen) {
			this.x = -random;
            this.offscreen = false;
		} else {
			this.x += dt;
		}
    }


}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character{
    constructor(){
        super();
        this.sprite ='images/char-boy.png';
		this.x = 2;
		this.y = 5;

        this.win = false;

    }

    update (dt) {

        if (this.y === 0 && !this.win) {
            var that = this;
            setTimeout(function(){
                alert('Congratulations, you win the game!');
                that.reset();
            }, 200);

            this.win = true;

        }
    }

    handleInput(input) {
         switch (input) {
             case 'up':
                 if (0 < this.y){
                     this.y -= 1;
                 }
                 break;
             case 'down':
                 if (this.y < 5){
                     this.y += 1;
                 }
                 break;
             case 'left':
                 if (0 < this.x){
                     this.x -= 1;
                 }
                 break;
             case 'right':
                 if (this.x < 4){
                     this.x += 1;
                 }
                 break;
         }
     }

     reset(){
         this.x = 2;
         this.y = 5;
         this.win = false;
     }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Enemy_1 = new Enemy(-3,1);
var Enemy_2 = new Enemy(-2,2);
var Enemy_3 = new Enemy(-7,3);
var Enemy_4 = new Enemy(-6,1);
var Enemy_5 = new Enemy(-9,2);
var Enemy_6 = new Enemy(-2,3);
var allEnemies = [Enemy_1,Enemy_2,Enemy_3,Enemy_4,Enemy_5,Enemy_6];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
