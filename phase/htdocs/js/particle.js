class Particle {

    constructor(game, planet) {
        this.entity = game.add.image(300, 200, 'rock');
        this.radius = planet.radius * 2;
        this.angle = 0;
        this.entity.scaleX = 0.05;
        this.entity.scaleY = 0.05;
        this.ANGLE_STEP = Math.PI / 512;
        this.velocity = 2;
    }

    update(planet) {
         this.entity.x = planet.x() + Math.cos(this.angle) * this.radius * this.velocity;
         this.entity.y = planet.y() + Math.sin(this.angle) * this.radius * this.velocity;
         this.angle += this.ANGLE_STEP;
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