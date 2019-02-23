class Particle {

    constructor(game, planet, width) {
        this.entity = game.add.image(width - 300, 200, 'rock');
        this.radius = planet.radius * 4;
        this.angle = 0;
        this.entity.scaleX = 0.35;
        this.entity.scaleY = 0.35;
        this.ANGLE_STEP = Math.PI / 512;
        this.velocity = 1;
    }

    update(earth) {
        this.entity.x = earth.x() + Math.cos(this.angle) * this.radius * this.velocity;
        this.entity.y = earth.y() + Math.sin(this.angle) * this.radius * this.velocity;
        this.angle += this.ANGLE_STEP;
        this.light.x = this.entity.x;
        this.light.y = this.entity.y;
    }

    x() {
        return this.entity.x;
    }

    y() {
        return this.entity.y;
    }

    entity() {
        return this.entity;
    }
}