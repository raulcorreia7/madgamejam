class EtPlanet {

    constructor(game, width, height) {
        this.SCREEN_WIDTH = width;
        this.SCREEN_HEIGHT = height;
        this.entity = game.physics.add.sprite(width, 0, 'etplanet');
        this.entity.setPipeline('Light2D');
        this.rotation_step = Phaser.Math.FloatBetween(0.05, 0.35);
        var rnd = Phaser.Math.FloatBetween(0.15, 0.2);
        this.entity.scaleX = rnd;
        this.entity.scaleY = rnd;
        this.radius = this.entity.height * this.entity.scaleY / 2;
    }

    update() {
        this.entity.angle += this.rotation_step;
    }

    setPos(x, y) {
        this.entity.x = x;
        this.entity.y = y;

        if (this.entity.y < 0) {
            this.entity.y + this.entity.height;
        } else
        if (this.entity.y > this.SCREEN_HEIGHT) {
            this.entity.y - this.entity.height;
        }

    }

    width() {
        return this.entity.width;
    }

    height() {
        return this.entity.height;
    }

    halfWidth() {
        return this.entity.width / 2;
    }
    halfHeight() {
        return this.entity.height / 2;
    }

    x() {
        return this.entity.x;
    }
    y() {
        return this.entity.y;
    }
}