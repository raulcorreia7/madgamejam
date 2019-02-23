class Enemy {
    constructor(game, earth, player) {
        this.counterstep = 0;
        this.direction = Math.random();
 
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
            key: 'right',
            frames: game.anims.generateFrameNumbers('player', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.entity = game.physics.add.sprite(earth.x, earth.y - earth.radius, 'player');

        this.entity.y -= this.entity.height / 2;
        this.radius = earth.radius + this.entity.height / 2;
        this.angle = player.angle + Math.PI;

        this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
        this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
        this.entity.rotation = - Math.PI / 2 ;
        this.entity.setCollideWorldBounds(true);
        this.rotation_step = Math.PI / 256;
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

    update(earth) {
        //Left
        if (this.direction < 0.5) {
            this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
            this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
            this.entity.rotation += this.rotation_step;
            this.angle += this.rotation_step;
            this.entity.anims.play('right', true);
        //Right
        } else {
            this.entity.x = earth.x() + Math.cos(this.angle) * this.radius;
            this.entity.y = earth.y() + Math.sin(this.angle) * this.radius;
            this.entity.rotation -= this.rotation_step;
            this.angle -= this.rotation_step;
            this.entity.anims.play('left', true);
        }
    }
}