class Player {
    constructor(game, earth) {
        game.anims.create({
            key: 'left',
            frames: game.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        game.anims.create({
            key: 'turn',
            frames: [{
                key: 'player',
                frame: 4
            }],
            frameRate: 20
        });
        game.anims.create({
            key: 'right',
            frames: game.anims.generateFrameNumbers('player', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.entity = game.physics.add.sprite(earth.x, earth.y - earth.radius, 'player');
        this.hands = game.physics.add.sprite(this.entity.x, this.entity.y, 'hand');

        this.entity.setDepth(2);
        this.hands.setDepth(1);


        this.hands.rotation = Math.PI / 2;
        this.hands.y -= this.hands.height / 2;
        this.entity.y -= this.entity.height / 2;
        this.entity.height *= 0.7;
        this.entity.width *= 0.7;
        this.entity.scaleX = 0.7;
        this.entity.scaleY = 0.7;

        this.hands.height *= 0.7;
        this.hands.width *= 0.7;
        this.hands.scaleX = 0.7;
        this.hands.scaleY = 0.7;
        this.radius = earth.radius + this.entity.height / 2;
        this.angle = 0;

        this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
        this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
        this.hands.x = earth.x() + Math.cos(this.angle) * this.radius;
        this.hands.y = earth.y() + Math.sin(this.angle) * (this.radius + this.hands.height / 2);
        this.entity.rotation = Math.PI / 2;
        this.entity.setCollideWorldBounds(true);
        this.rotation_step = Math.PI / 256;

        this.TIME_ELAPSED = 0;
        this.DAMAGE_COOLDOWN = 2 * 1000;
        this.INVUNERABLE = false;
        this.MAX_LIVES = 3;
        this.health = this.MAX_LIVES;
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

    update(deltaTime, earth, cursors) {
        if (cursors.left.isDown) {
            this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
            this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
            this.hands.x = this.entity.x + Math.cos(this.angle) * this.entity.height / 2;
            this.hands.y = this.entity.y + Math.sin(this.angle) * this.entity.height / 2;
            this.hands.rotation -= this.rotation_step;
            this.entity.rotation -= this.rotation_step;
            this.angle -= this.rotation_step;
            this.entity.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
            this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
            this.hands.x = this.entity.x + Math.cos(this.angle) * this.entity.height / 2;
            this.hands.y = this.entity.y + Math.sin(this.angle) * this.entity.height / 2;
            this.hands.rotation += this.rotation_step;
            this.entity.rotation += this.rotation_step;
            this.angle += this.rotation_step;
            this.entity.anims.play('right', true);
        } else {
            // player.setVelocityX(0);
            this.hands.x = 500000;
            this.entity.anims.play('turn');
        }
        if (this.INVUNERABLE) {
            this.TIME_ELAPSED += deltaTime;
            if (this.TIME_ELAPSED >= this.DAMAGE_COOLDOWN) {
                this.INVUNERABLE = false;
                this.TIME_ELAPSED = 0;

            }
            this.entity.setTint(0xFF0000);
        }else{
            this.entity.setTint(0xFFFFFF);
        }
    }

    lives() {
        return this.health;
    }

    takeDamage() {
        if (!this.INVUNERABLE) {
            this.INVUNERABLE = true;
            if (this.health > 0) {
                this.health--;
            }
        }
    }

    setIdle() {
        this.entity.anims.play('turn', true);
    }
}