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
var rate = 0;
var ray_cooldown = 1000;

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
    this.load.image('ray', 'assets/star.png');
    this.load.spritesheet('player',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    this.load.image('cloud', 'assets/cloud.png');
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    createLight(this);
    sky = new Sky(this, WIDTH, HEIGHT);
    earth = new Earth(this, WIDTH, HEIGHT);
    sun = new Sun(this, earth, WIDTH, HEIGHT);
    player = new Player(this, earth);
    sun_rays = this.add.group();

    // createClouds(this);
}

function update() {
    sun.update(earth);
    player.update(earth, cursors);

    if (rate == ray_cooldown) {
        rate = 0;
    }
    if (rate == 0) {
        var ray = this.physics.add.sprite(sun.x, sun.y, 'ray');

        this.physics.moveTo(ray, earth.x(), earth.y(), 300);
        sun_rays.add(ray);
        ray.setDepth(1);
        earth.entity.setDepth(2);
        player.entity.setDepth(3);
        rate++;
    } else {
        rate++;
    }
    sun_rays.children.iterate((child) => {
        this.physics.collide(child, game.earth, this.collisionCallback, null, this);

        if (child.x > earth.x() - 15 && child.x < earth.x() + 15 && child.y > earth.y() - 15 && child.y < earth.y() + 15) {
            child.disableBody(true, true);
        }
    })
}

function createLight(game) {
    game.lights.enable().setAmbientColor(0xADD8E6);
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