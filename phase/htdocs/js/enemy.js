class Enemy {
    constructor(game, earth, player) {
        this.counterstep = 0;
        this.direction = Math.random();

        game.anims.create({
            key: 'enemyleft',
            frames: game.anims.generateFrameNumbers('enemy', {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        game.anims.create({
            key: 'enemyright',
            frames: game.anims.generateFrameNumbers('enemy', {
                start: 0,
                end: 2
            }),
            frameRate: 10,
            repeat: -1
        });
        game.anims.create({
            key: 'enemyidle',
            frames: game.anims.generateFrameNumbers('enemy', {
                start: 0,
                end: 0
            }),
            frameRate: 10,
            repeat: -1
        });

        this.entity = game.physics.add.sprite(earth.x, earth.y - earth.radius, 'enemy');
        this.entity.scaleX = 0.5;
        this.entity.scaleY = 0.5;
        this.entity.width *= this.entity.scaleX;
        this.entity.height *= this.entity.scaleY;

        this.entity.y -= this.entity.height / 2;
        this.radius = earth.radius + this.entity.height / 2;
        this.angle = player.angle + Math.PI;

        this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
        this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
        this.entity.rotation = -Math.PI / 2;
        this.entity.setCollideWorldBounds(true);
        this.rotation_step = Math.PI / 256;
    }

    changeDirection() {
        if (this.direction < 0.5) {
            this.direction = 1;
        } else {
            this.direction = 0;
        }
    }

    x() {
        return this.entity.x;
    }
    y() {
        return this.entity.y;
    }

    width() {
        return this.entity.width;
    }

    height() {
        return this.entity.height;
    }



    update(earth, player) {
        if (this.RectCircleColliding(this, player.entity)) {
            //this.entity.disableBody(true, true);
        }
        if (player.lives() == 0) {
            this.entity.anims.play('enemyidle', true);
            return;
        }

        //Left
        if (this.direction < 0.5) {
            this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
            this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
            this.entity.rotation += this.rotation_step;
            this.angle += this.rotation_step;
            this.entity.anims.play('enemyright', true);
            //Right
        } else {
            this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
            this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
            this.entity.rotation -= this.rotation_step;
            this.angle -= this.rotation_step;
            this.entity.anims.play('enemyleft', true);
        }
    }

    RectCircleColliding(circle, rect) {
        var distX = Math.abs(circle.x() - rect.x - rect.width / 2);
        var distY = Math.abs(circle.y() - rect.y - rect.height / 2);

        if (distX >= (rect.width / 2 + circle.radius)) {
            return false;
        }
        if (distY >= (rect.height / 2 + circle.radius)) {
            return false;
        }

        if (distX < (rect.weight / 2)) {
            return true;
        }
        if (distY < (rect.height / 2)) {
            return true;
        }

        var dx = distX - rect.width / 2;
        var dy = distY - rect.height / 2;
        return (dx * dx + dy * dy <= (circle.radius * circle.radius));
    }

    setIdle() {
        this.entity.anims.play('enemyidle', true);
    }

}