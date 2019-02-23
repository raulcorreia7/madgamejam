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

/*
    Particle emitter
*/

var cloud_properties = {
    STEP: Math.PI / 2,
    MINI_STEP: Math.PI / 14,
    ROTATION_STEP: Math.PI / 128
}

var TIME = Date.now();

/*
    NyanCat
*/

var nyanCat;

function preload() {
    this.load.spritesheet('nyancat', 'assets/nyancat_spritesheet.png', {
        frameWidth: 500,
        frameHeight: 198
    });
    this.load.image('sky', 'assets/sky.png');
    this.load.image('earth', ['assets/planet.png', 'assets/earth_n.png']);
    this.load.image('city', 'assets/city.png');
    this.load.image('sun', 'assets/sun.png');
    this.load.audio('music', 'assets/Sound/music.mp3');
    this.load.audio('powerup_planet', 'assets/Sound/powerup_planet.mp3');
    this.load.image('ray', 'assets/star.png');
    this.load.image('rock', 'assets/rock.png');
    this.load.spritesheet('player',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('etplanet',
        'assets/moonsprite.png', {
            frameWidth: 435,
            frameHeight: 435
        });
    this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
}

function create() {
    
    
    etPlanets_physics = this.physics.add.staticGroup();
    cursors = this.input.keyboard.createCursorKeys();

    sky = new Sky(this, WIDTH, HEIGHT);
    nyanCat = new NyanCat(this, WIDTH, HEIGHT);
    city = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'city');
    city.scaleX = 0.525;
    city.scaleY = 0.525;
    city.x -= 4;
    city.y += 1;
    earth = new Earth(this, WIDTH, HEIGHT);

    sun = new Sun(this, earth, WIDTH, HEIGHT);
    player = new Player(this, earth);
    createPlanets(this);
    createLight(this);
    enemy = new Enemy(this, earth, player);
    sun_rays = this.add.group();

    let music = this.sound.add('music');
    music.play();
    music.loop = true;
    // createClouds(this);

    createParticleEmitter(this);
}

function createParticleEmitter(game) {

    var particle_emitter = game.add.particles('flares')
        .createEmitter({
            frame: 'yellow',
            quantity: 1,
            scale: {
                start: 0.15,
                end: 0
            },
            blendMode: 'ADD',
            lifespan: 400,
            on: false
        });
    return particle_emitter;
}

function createPlanets(game) {
    //var powerup_sound = game.sound.add('powerup_planet');
    var MAX_PLANETS = Phaser.Math.Between(4, 8);
    var radius = earth.radius * 2.5;

    var planets = 0;
    var step = 2 * Math.PI / MAX_PLANETS;
    var start = step * Math.random();
    //console.log(MAX_PLANETS);
    for (var i = 0; i < MAX_PLANETS; i++) {

        var et = new EtPlanet(game, earth.x + Math.cos(start), earth.y - earth.radius + Math.sin(start), MAX_PLANETS);
        et.entity.x = earth.x() + Math.cos(start) * radius;
        et.entity.y = earth.y() + Math.sin(start) * radius;

        etPlanets_physics.add(et.entity);
        etPlanets.push(et);

        start += step;
        let particle = new Particle(game, et);
        et.addAsteroid(particle);
    }
}

function update() {


    var deltaTime = Date.now() - TIME;
    nyanCat.update(deltaTime);
    if (game.sound.context.state === 'suspended') {
        game.sound.context.resume();
    }

    sun.update(earth);
    player.update(earth, cursors);
    enemy.update(earth);
    etPlanets.forEach(e => e.update(deltaTime));

    if (rate == ray_cooldown) {
        rate = 0;
    }
    if (rate == 0) {
        var raiox = (sun.entity.width * sun.entity.scaleX) / 2;
        var raioy = (sun.entity.height * sun.entity.scaleY) / 2;
        var x = sun.x() - raiox + raiox * Math.random();
        var y = sun.y() - raioy + raioy * Math.random();
        var ray = this.physics.add.sprite(x, y, 'ray');

        this.physics.moveTo(ray, earth.x(), earth.y(), light_speed);
        this.physics.add.collider(ray, etPlanets_physics, hitPlanet, null, this);
        this.physics.add.overlap(ray, etPlanets_physics, hitPlanet, null, this);
        sun_rays.add(ray);
        earth.entity.setDepth(2);
        player.entity.setDepth(3);

        ray.particle_emitter = createParticleEmitter(this);
        rate++;
    } else {
        rate++;
    }
    sun_rays.children.iterate((child) => {



        child.particle_emitter.setPosition(child.x, child.y);
        child.particle_emitter.explode();
        // this.physics.collide(child, game.earth, this.collisionCallback, null, this);

        if (RectCircleColliding(earth, child)) {
            child.disableBody(true, true);
            child.particle_emitter.killAll();
        }


        etPlanets.forEach((planet) => {
            if (RectCircleColliding(planet, child)) {
                child.disableBody(true, true);
                child.particle_emitter.killAll();
                planet.heal();
                child.x = WIDTH * 2;
                child.y = HEIGHT * y;
            }

        })

        if (child.x >= player.x() - player.width() / 2 && child.x <= player.x() + player.width() / 2 && child.y >= player.y() - player.height() / 2 && child.y <= player.y() + player.height() / 2) {
            this.physics.moveTo(child, this.input.mousePointer.x, this.input.mousePointer.y, light_speed);
        }

        if (child.x <= 0 || child.x >= WIDTH || child.y <= 0 || child.y >= HEIGHT) {
            child.disableBody(true, true);
            child.particle_emitter.killAll();
        }

    });
    TIME = Date.now();
}

function updateRays() {

}

function RectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x() - rect.x - rect.width / 2);
    var distY = Math.abs(circle.y() - rect.y - rect.height / 2);

    if (distX >= (rect.width / 2 + circle.radius)) {
        return false;
    }
    if (distY >= (rect.height / 2 + circle.radius)) {
        return false;
    }

    if (distX < (rect.weight / 2)) {
        return true;
    }
    if (distY < (rect.height / 2)) {
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