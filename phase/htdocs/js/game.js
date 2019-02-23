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


//Gameobjects

//The sun
var sun;
//Earth
var earth;
//Sky
var sky;

var etplanet;

// Player
var player;
var cursors;
var rate = 0;
var ray_cooldown = 20;

/*
    Rays
*/
var sun_rays;
var light_speed = 200;

/*
    Clouds
*/

var clouds = [];

/*
    Et Planets
*/
var etPlanets_physics;
var etPlanets = [];

var cloud_properties = {
    STEP: Math.PI / 2,
    MINI_STEP: Math.PI / 14,
    ROTATION_STEP: Math.PI / 128
}


function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('earth', ['assets/earth.png', 'assets/earth_n.png']);
    this.load.image('sun', 'assets/sun.png');
    this.load.audio('music', 'assets/Sound/music.mp3');
    this.load.image('ray', 'assets/star.png');
    this.load.spritesheet('player',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('etplanet', ['assets/orbit.png', 'assets/orbit_n.png']);
}

function create() {
    etPlanets_physics = this.physics.add.staticGroup();
    cursors = this.input.keyboard.createCursorKeys();
    createLight(this);
    sky = new Sky(this, WIDTH, HEIGHT);
    earth = new Earth(this, WIDTH, HEIGHT);
    sun = new Sun(this, earth, WIDTH, HEIGHT);
    player = new Player(this, earth);
    createPlanets(this);
    enemy = new Enemy(this, earth, player);
    sun_rays = this.add.group();

    let music = this.sound.add('music');
    music.play();
    music.loop = true;
    // createClouds(this);
}

function createPlanets(game) {
    var MAX_PLANETS = Phaser.Math.Between(4, 8);
    var radius = earth.radius * 6;

    var planets = 0;
    var step = 2 * Math.PI / MAX_PLANETS;
    var start = step * Math.random();
    for (var i = 0; i < MAX_PLANETS; i++) {
        var et = new EtPlanet(game, WIDTH, HEIGHT);
        etPlanets_physics.add(et.entity);
        etPlanets.push(et);
        et.setPos(earth.x() + radius * Phaser.Math.FloatBetween(1, 1.05) * Math.cos(start), earth.y() + radius * Phaser.Math.FloatBetween(1, 1.3) * Math.sin(start));
        start += step;

    }



}

function update() {
    if (game.sound.context.state === 'suspended') {
        game.sound.context.resume();
    }

    sun.update(earth);
    player.update(earth, cursors);
    etPlanets.forEach(e => e.update());

    if (rate == ray_cooldown) {
        rate = 0;
    } 
    if(rate == 0){
        var raiox = (sun.entity.width * sun.entity.scaleX) / 2;
        var raioy = (sun.entity.height * sun.entity.scaleY) / 2;
        var x = sun.x() - raiox + raiox* Math.random();
        var y = sun.y() - raioy + raioy* Math.random();
        var ray = this.physics.add.sprite(x,y, 'ray');

        this.physics.moveTo(ray, earth.x(), earth.y(), light_speed);
        this.physics.add.collider(ray, etPlanets_physics, hitPlanet, null, this);
        this.physics.add.overlap(ray, etPlanets_physics, hitPlanet, null, this);
        sun_rays.add(ray);
        earth.entity.setDepth(2);
        player.entity.setDepth(3);
        rate++;
    } else {
        rate++;
    }
    sun_rays.children.iterate((child) => {
        // this.physics.collide(child, game.earth, this.collisionCallback, null, this);

        if (RectCircleColliding(earth, child)) {
            child.disableBody(true, true);
        }


        etPlanets.forEach((planet) => {
            if (RectCircleColliding(planet, child)) {
                child.disableBody(true,true);
            }

        })

        if (child.x > player.x() - player.width() / 2 && child.x < player.x() + player.width() / 2 && child.y > player.y() - player.height() / 2 && child.y < player.y() + player.height() / 2) {
            this.physics.moveTo(child, this.input.mousePointer.x, this.input.mousePointer.y, light_speed);
        }

        if (child.x <= 0 || child.x >= WIDTH || child.y <= 0 || child.y >= HEIGHT) {
            child.disableBody(true, true);
        }
    })
}

function updateRays() {

}

function RectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x() - rect.x - rect.width / 2);
    var distY = Math.abs(circle.y() - rect.y - rect.height / 2);

    if (distX > (rect.width / 2 + circle.radius)) {
        return false;
    }
    if (distY > (rect.height / 2 + circle.radius)) {
        return false;
    }

    if (distX <= (rect.weight / 2)) {
        return true;
    }
    if (distY <= (rect.height / 2)) {
        return true;
    }

    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
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

function hitPlanet(ray, etplanet) {
    ray.disableBody(true, true);

}