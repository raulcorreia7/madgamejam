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
                y: 200
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

var rotation = 0.25;

var sun_properties = {
    radius: 0,
    angle: 0

}

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('mars', 'assets/mars.png');
    this.load.image('sun', 'assets/sun_shiny.png');
}

function create() {
    this.add.image(400, 300, 'sky');
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
    sun_properties.angle += Math.PI/512;

}