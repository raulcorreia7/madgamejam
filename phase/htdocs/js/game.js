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


//The sun
var sun;

var sun_properties = {
    radius: 0,
    angle: 0
}
//Earth
var earth;
//Sky
var sky;

// Player
var player;
var player_properties = {
    radius: 0,
    angle: 0
};
var cursors;
var raio;
var rotation = 0.3;
var angle = Math.PI / 2;

var rotation;

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('earth', ['assets/earth.png','assets/earth_n.png']);
    this.load.image('sun', 'assets/sun.png');
    this.load.spritesheet('player',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
}

function create() {
    sky = this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');
    sky.setDisplaySize(WIDTH, HEIGHT);

    earth = this.add.sprite(config.width / 2, config.height / 2, 'earth');
    earth.scaleX = 0.4;
    earth.scaleY = 0.4;
    raio = ((earth.height * earth.scaleY) / 2);
    player = this.add.sprite(earth.x, earth.y - raio, 'player');

    player.y -= player.height / 2;
    player_properties.radius = raio + player.height/2;
    player_properties.angle = 0;

    player.x = earth.x + Math.cos(player_properties.angle) * player_properties.radius;
    player.y = earth.y + Math.sin(player_properties.angle) * player_properties.radius;
    player.rotation = Math.PI / 2;
    sun = this.add.image(config.width - 300, 200, 'sun');
    sun_properties.radius = raio * 2;
    sun_properties.angle = 0;
    //player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.x = earth.x + Math.cos(player_properties.angle) * player_properties.radius;
        player.y = earth.y + Math.sin(player_properties.angle) * player_properties.radius;
        player.rotation -= Math.PI / 512;
        player_properties.angle -= Math.PI / 512;


        // player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.x = earth.x + Math.cos(player_properties.angle) * player_properties.radius;
        player.y = earth.y + Math.sin(player_properties.angle) * player_properties.radius;
        player.rotation += Math.PI / 512;
        player_properties.angle += Math.PI / 512;
    } else {
        // player.setVelocityX(0);
        // player.anims.play('turn');
    }
    updateSun();
}

function updateSun(){
    sun.x = earth.x + Math.cos(sun_properties.angle) * sun_properties.radius;
    sun.y = earth.y + Math.sin(sun_properties.angle) * sun_properties.radius;
    sun_properties.angle += Math.PI / 512;
}



