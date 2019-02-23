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
        this.ElapsedTime = 0;
        this.TargetTime = 10 * 1000;
        this.color = 0x000000;
        this.STEP = 25;
        this.health = 0;
        this.MAX_HEALTH = 500;
    }

    update(deltatime) {
        console.log(deltatime);
        this.ElapsedTime += deltatime;
        this.updateColors();
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

    heal() {
        if (this.health < this.MAX_HEALTH) {
            this.health += this.STEP;
        }
    }

    tick(deltaTime) {


    }

    updateColors() {
        var percent = this.health / this.MAX_HEALTH;
        if (percent < 0.1) {
            this.color = 0x000000;
        } else
        if (percent < 0.2) {
            this.color = 0xFF0000;
        } else {
            if (percent < 0.5) {
                this.color = 0xFFA500;
            } else {
                if (percent < 0.75) {
                    this.color = 0x246B61;
                } else {
                    if (percent > 0.9) {
                        this.color = 0x008000;
                    }
                }
            }
        }
        this.entity.setTint(this.color);
    }
}