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
    angle: 0,
    light: 0
}
//Earth
var earth;
//Sky
var sky;

// Player
var player;
var player_properties = {
    radius: 0,
    angle: 0,
    rotation_step: Math.PI / 256
};
var cursors;
var raio;
var rotation = 0.3;
var angle = Math.PI / 2;

/*
    Rays
*/
var sun_rays;


/*
    Clouds
*/

var clouds = [];

var cloud_properties = {
    STEP: Math.PI / 2,
    MINI_STEP: Math.PI / 14,
    ROTATION_STEP: Math.PI / 128
}

var rotation;

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('earth', ['assets/earth.png', 'assets/earth_n.png']);
    this.load.image('sun', 'assets/sun.png');

    this.load.spritesheet('player',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    this.load.image('cloud', 'assets/cloud.png');
}

function create() {
    createPlayerAnimations(this);
    sky = new Sky(this, WIDTH, HEIGHT);
    createEarth(this);
    createSun(this);
    createLight(this);
    createPlayer(this);
    createClouds(this);
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    updatePlayer();
    updateSun();
}

function createPlayerAnimations(game) {
    game.anims.create({
        key: 'left',
        frames: game.anims.generateFrameNumbers('player', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'turn',
        frames: [{
            key: 'player',
            frame: 4
        }],
        frameRate: 20
    });

    game.anims.create({
        key: 'right',
        frames: game.anims.generateFrameNumbers('player', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });
}

function updateSun() {
    sun.x = earth.x + Math.cos(sun_properties.angle) * sun_properties.radius;
    sun.y = earth.y + Math.sin(sun_properties.angle) * sun_properties.radius;
    sun_properties.angle += Math.PI / 512;
    sun_properties.light.x = sun.x;
    sun_properties.light.y = sun.y;
}

function updatePlayer() {
    if (cursors.left.isDown) {
        player.x = earth.x + Math.cos(player_properties.angle) * player_properties.radius;
        player.y = earth.y + Math.sin(player_properties.angle) * player_properties.radius;
        player.rotation -= player_properties.rotation_step;
        player_properties.angle -= player_properties.rotation_step;


        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.x = earth.x + Math.cos(player_properties.angle) * player_properties.radius;
        player.y = earth.y + Math.sin(player_properties.angle) * player_properties.radius;
        player.rotation += player_properties.rotation_step;
        player_properties.angle += player_properties.rotation_step;
        player.anims.play('right', true);
    } else {
        // player.setVelocityX(0);
        player.anims.play('turn');
    }

}

function createEarth(game) {
    earth = game.add.sprite(config.width / 2, config.height / 2, 'earth');
    earth.scaleX = 0.25;
    earth.scaleY = 0.25;
    raio = ((earth.height * earth.scaleY) / 2);
    earth.setPipeline('Light2D');


}

function createLight(game) {
    game.lights.enable().setAmbientColor(0xADD8E6);
}

function createPlayer(game) {
    player = game.physics.add.sprite(earth.x, earth.y - raio, 'player');


    player.y -= player.height / 2;
    player_properties.radius = raio + player.height / 2;
    player_properties.angle = 0;

    player.x = earth.x + Math.cos(player_properties.angle) * player_properties.radius;
    player.y = earth.y + Math.sin(player_properties.angle) * player_properties.radius;
    player.rotation = Math.PI / 2;
    player.setCollideWorldBounds(true);
}

function createSun(game) {
    sun = game.add.image(config.width - 300, 200, 'sun');
    this.sun_properties.radius = raio * 3;
    this.sun_properties.angle = 0;
    this.sun_properties.light = game.lights.addLight(sun.x, sun.y,
        raio * 2.75, 0xffff00, 5);
    sun.scaleX = 0.5;
    sun.scaleY = 0.5;
}


function createClouds(game) {
    var cloud_radius = raio * 1.9;
    var rotacao = -90;
    for (var i = 0; i < 2 * Math.PI; i += cloud_properties.STEP) {
        for (var n = 0; n < 3; n++) {
            var cloud = game.add.image(earth.x + cloud_radius * Math.cos(i + n * cloud_properties.MINI_STEP),
                earth.y + cloud_radius * Math.sin(i + n * cloud_properties.MINI_STEP),
                'cloud');
            cloud.angle -= rotacao;
            clouds.push(cloud);
        }
        rotacao -= 90;
    }

}