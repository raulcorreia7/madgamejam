class Sun {

    constructor(game,earth,width,height) {
        this.entity = game.add.image(width - 300, 200, 'sun');
        this.radius = earth.radius * 3;
        this.angle = 0;
        this.light = game.lights.addLight(this.entity.x, this.entity.y,
            earth.radius * 2.75, 0xffff00, 5);
        this.entity.scaleX = 0.5;
        this.entity.scaleY = 0.5;
        this.ANGLE_STEP = Math.PI / 512;
    }

    update(earth) {
        this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
        this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
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