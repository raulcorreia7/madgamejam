class Particle {

    constructor(game, planet, ang) {
        this.entity = game.add.image(300, 200, 'rock');
        this.radius = planet.radius * 2;
        this.angle = ang;
        this.entity.scaleX = 0.05;
        this.entity.scaleY = 0.05;
        this.ANGLE_STEP = Math.PI / 512 + Phaser.Math.FloatBetween(0.002,0.008) ;
        this.velocity = Math.random(2,3);
    }

    update(planet) {
         this.entity.x = planet.x() + Math.cos(this.angle) * this.radius;
         this.entity.y = planet.y() + Math.sin(this.angle) * this.radius;
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