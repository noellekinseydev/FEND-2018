class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    // Draw the character on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.speed = this.setSpeed();
    }

    setSpeed() {
        return (Math.random() * 700) + 100; // Return randomized values for speed
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x > 505 ? this.reset() : this.x += this.speed * dt;
        this.checkCollision(this);
    }

    checkCollision() {
        // If player collides with enemy...
        if (player.x < this.x + 50 && 
            player.x + 30 > this.x && 
            player.y < this.y + 25 &&
            player.y + 30 > this.y) {
            player.death(); // ...call death function
        }
    }

    // Reset the enemy's position when it runs off screen
    reset() {
        this.x = -100; 
        this.speed = this.setSpeed(); // New random speed on reset
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    constructor(x, y, sprite, lives) {
        super(x, y, sprite);
        this.lives = lives;
    }

    update(dt) {
        // Prevent moving out of bounds
        if (this.x <= 0) {
            this.x = 0;
        } 
        
        if (this.x >= 400) {
            this.x = 400;
        }

        if (this.y > 380) {
            this.y = 380;
        }

        // Reset player position when player reaches goal
        if (this.y <= -35) {
            this.gameOver();
        }
    }

    handleInput(direction) {
        let legend = {
            'up': [0, -85.5],
            'down': [0, 85.5],
            'left': [-101, 0],
            'right': [101, 0]
        };

        // Move player respective to the appropriate direction
        this.x += legend[direction][0];
        this.y += legend[direction][1];
    }

    reset() {
        this.x = 200;
        this.y = 380;
    }

    death() {
        this.lives -= 1;
        // Check if player is dead. If not, call reset.
        this.lives < 0 ? this.gameOver() : this.reset();
    }

    gameOver() {
        gameEnd = true;
        this.reset();
    }
};

// Now instantiate your objects.

// Possible y values for Enemy
let possVal = [60, 140, 230];

// Maximum lives for player
let maxLives = 3;

// Set game end to false
let gameEnd = false;
        
// Place the player object in a variable called player
const player = new Player(200, 380, 'images/char-cat-girl.png', maxLives);
let enemy;

// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// For each possible y value, create a new enemy 
// and pass in the corresponding y value.
possVal.forEach(function(vert) {
    enemy = new Enemy(-100, vert, 'images/enemy-bug.png');
    allEnemies.push(enemy);
});

// These functions handle the gamepad to allow game to
// be played without the keyboard.
function moveUp() {
    player.handleInput('up');
}

function moveDown() {
    player.handleInput('down');
}

function moveRight() {
    player.handleInput('right');
}

function moveLeft() {
    player.handleInput('left');
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // Prevents error being returned if a nonarrow key is pressed
    if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 39 || e.keyCode == 37) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else {
        return
    }
});
