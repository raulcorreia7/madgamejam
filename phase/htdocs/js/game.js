var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

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
    },
    fps: {
        target: 30
    }
};

var game = new Phaser.Game(config);

var homePlanet;
var sun;
<<<<<<< HEAD
var earth;
var cursors;
var raio;
var rotation = 0.3;
var angle = Math.PI / 2;

var rotation;   
=======
var sky;

var rotation = 0.25;

var sun_properties = {
    radius: 0,
    angle: 0

}
>>>>>>> b1a52344ce952db4a85eacc1f35ca6e1e317e9a7

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('mars', 'assets/mars.png');
<<<<<<< HEAD
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
    
=======
    this.load.image('sun', 'assets/sun_shiny.png');
}

function create() {
    sky = this.add.image(WIDTH/2, HEIGHT/2, 'sky');
    sky.setDisplaySize(WIDTH,HEIGHT);
    homePlanet = this.add.image(WIDTH / 2, HEIGHT / 2, 'mars');
    sun = this.add.image(WIDTH / 2, HEIGHT / 2, 'sun');
    sun_properties.radius = HEIGHT - homePlanet.y;
    sun_properties.angle = 0;

}

function update() {
    updateSun();
}


function updateSun() {
    sun.x = homePlanet.x + Math.cos(sun_properties.angle) * sun_properties.radius;
    sun.y = homePlanet.y + Math.sin(sun_properties.angle) * sun_properties.radius;
    sun_properties.angle += Math.PI / 512;

>>>>>>> b1a52344ce952db4a85eacc1f35ca6e1e317e9a7
}