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
    }
};

var game = new Phaser.Game(config);

var homePlanet;
var sun;

var rotation = 0.5;

var rotation;

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('mars', 'assets/mars.png');
}

function create() {
    this.add.image(400, 300, 'sky');
    this.add.image()
    homePlanet = this.add.image(500, 500, 'mars');
}

function update() {
    homePlanet.angle += rotation;
}