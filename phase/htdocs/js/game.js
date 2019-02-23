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
//Earth
var earth;
//Sky
var sky;
var cursors;
var raio;
var rotation = 0.3;
var angle = Math.PI / 2;

var rotation;

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('earth', 'assets/earth.png');
    this.load.spritesheet('player',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
}

function create() {
    sky = this.add.image(WIDTH/2, HEIGHT/2, 'sky');
    sky.setDisplaySize(WIDTH,HEIGHT);

    earth = this.add.sprite(config.width / 2, config.height / 2, 'earth');
    earth.scaleX = 0.4;
    earth.scaleY = 0.4;
    raio = ((earth.height * earth.scaleY) / 2);
    player = this.add.sprite(earth.x, earth.y - raio, 'player');

    player.y -= player.height / 2;

    
    //player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // if (cursors.left.isDown) {
    //     player.setVelocityX(-160);

    //     // player.anims.play('left', true);
    // } else if (cursors.right.isDown) {
    //     player.setVelocityX(160);
    //     // player.anims.play('right', true);
    // } else {
    //     player.setVelocityX(0);
    //     // player.anims.play('turn');
    // }

}