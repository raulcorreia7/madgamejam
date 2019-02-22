var WIDTH = 800;
var HEIGHT = 600;

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var homePlanet;
var sun;
var earth;
var cursors;
var raio;
var rotation = 0.3;
var angle = Math.PI / 2;

var rotation;   

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('mars', 'assets/mars.png');
    this.load.image('earth', 'assets/earth.png');
    this.load.spritesheet('player',
				'assets/dude.png', {
					frameWidth: 32,
					frameHeight: 48
				});
}

function create() {
    this.add.image(400, 300, 'sky');
    earth = this.add.sprite(config.width/2, config.height/2, 'earth');
    earth.scaleX = 0.4;
    earth.scaleY = 0.4;
    raio = ((earth.height * earth.scaleY)/2);
    homePlanet = this.add.image(650, 520, 'mars');
    player = this.add.sprite(earth.x, earth.y - raio, 'player');
    
    player.y -= player.height/2;

    player.anchor.setTo(earth.x, earth.y);
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    homePlanet.angle += rotation;
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        
        // player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        // player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        // player.anims.play('turn');
    }
    
}