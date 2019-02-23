class Sun {

    constructor(game) {
        this.entity = game.load.image('sun', 'assets/sun.png');

        this.properties = {
            radius: 0,
            angle: 0,
            light: 0,
        };

        this.radius = 0;
        this.angle = 0;
        this.light = 0;

        this.ANGLE_STEP = MATH.PI / 512;
    }

    updateSun(earth) {
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