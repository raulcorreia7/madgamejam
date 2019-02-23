class EtPlanet {

    constructor(game, width, height) {
        this.SCREEN_WIDTH = width;
        this.SCREEN_HEIGHT = height;
        this.entity = game.add.image(width, 0, 'etplanet');
        this.entity.setPipeline('Light2D');
        this.rotation_step = Phaser.Math.FloatBetween(0.05, 0.35);
        var rnd = Phaser.Math.FloatBetween(0.15,0.5);
        this.entity.scaleX = rnd;
        this.entity.scaleY = rnd;
    }

    update() {
        this.entity.angle += this.rotation_step;
    }

    setPos(x, y) {
        this.entity.x = x;
        this.entity.y = y;
    }
}