class NyanCat {

    constructor(game, width, height) {
        this.entity = game.add.sprite(-100, height / 2, 'nyancat', 0);
        this.MAX_FRAMES = 12;
        this.entity.scaleX = 0.3;
        this.entity.scaleY = 0.3;
        this.velocity = 10;
        this.TIME_INTERVAL = 0.05 * 1000;
        this.ElapsedTime = 0;
        this.SPRITE_INDEX = 0;
        this.SCREEN_WIDTH = width;
        this.SCREEN_HEIGHT = height;
        this.COOLDOWN = 1 * 1000;
    }


    update(deltaTime) {
        this.ElapsedTime += deltaTime;
        if (this.ElapsedTime >= this.TIME_INTERVAL) {
            this.SPRITE_INDEX = (this.SPRITE_INDEX % this.MAX_FRAMES) + 1;
            this.entity.setFrame(this.SPRITE_INDEX);
            this.ElapsedTime = 0;
        }
        this.entity.x += 10;
        if (this.entity.x > this.SCREEN_WIDTH + 200) {
            this.entity.x = -1000;
            this.entity.y = Phaser.Math.FloatBetween(this.SCREEN_HEIGHT * 0.1, this.SCREEN_HEIGHT * 0.9);
        }
    }

    setPos(x, y) {
        this.entity.x = x;
        this.entity.y = y;
    }
}