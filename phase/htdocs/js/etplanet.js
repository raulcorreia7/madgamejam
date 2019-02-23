class EtPlanet {

    constructor(game, width, height, MAX_PLANETS) {
        this.SCREEN_WIDTH = width;
        this.SCREEN_HEIGHT = height;
        this.entity = game.physics.add.sprite(width, height, 'etplanet', 0);
        this.entity.y -= this.entity.height / 2;

        this.rotation_step = Phaser.Math.FloatBetween(0.05, 0.35);
        var rnd = Phaser.Math.FloatBetween(0.15, 0.2);
        this.entity.scaleX = rnd;
        this.entity.scaleY = rnd;
        this.radius = this.entity.height * this.entity.scaleY / 2;
        this.ElapsedTime = 0;
        this.TargetTime = 5 * 1000;
        this.color = 0x000000;
        this.STEP = 25;
        this.health = 0;
        this.MAX_HEALTH = 500;

        this.powerup_sound = game.sound.add('powerup_planet');

        this.asteroids = [];
        this.NUM_FRAMES = 4;
        // this.entity.setPipeline('Light2D');
    }

    update(deltatime) {
        this.ElapsedTime += deltatime;
        this.updateFrames();
        this.tick(deltatime);
        this.entity.angle += this.rotation_step;
    }

    addAsteroid(particle){
        this.asteroids.add(particle);
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
        if (this.health == this.MAX_HEALTH) return;
        if (this.health < this.MAX_HEALTH) {
            this.health += this.STEP;
        } else {
            if (this.health + this.STEP > this.MAX_HEALTH) {
                this.health = this.MAX_HEALTH;
                this.powerup_sound.play();
            }
        }

    }
    tick(deltaTime) {
        this.ElapsedTime += deltaTime;
        if (this.ElapsedTime >= this.TargetTime) {
            var percent = this.health / this.MAX_HEALTH;
            this.ElapsedTime = 0;
            //if (percent >= 0.95) return;
            if (this.health > 0)
                this.health -= this.STEP;
        }
    }
    updateFrames() {
        var percent = this.health / this.MAX_HEALTH;
        if (percent < 0.1) {
            // this.color = 0x000000;
            this.entity.setFrame(0);
        } else
        if (percent < 0.3) {
            // this.color = 0xFF0000;
            this.entity.setFrame(1);
        } else {
            if (percent < 0.5) {
                // this.color = 0xFFA500;
                this.entity.setFrame(1);
            } else {
                if (percent < 0.70) {
                    // this.color = 0x246B61;
                    this.entity.setFrame(2);
                } else {
                    if (percent > 0.9) {
                        // this.color = 0x008000;
                        this.entity.setFrame(3);
                    }
                }
            }
        }
        // this.entity.setTint(this.color);
    }
}