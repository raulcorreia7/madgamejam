class NyanCat {
    constructor(game, width, height) {
        this.MAX_FRAMES = 12;
        this.entity = game.add.sprite(width + 100, height / 4, 'nyancat', 0);
        this.entity.scaleX = 0.2;
        this.entity.scaleY = 0.2;
        this.velocity = 1;
        this.TIME_INTERVAL = 0.5 * 1000;
        this.ElapsedTime = 0;
        this.SPRITE_INDEX = 0;
    }


    update(deltaTime) {
        this.ElapsedTime += deltaTime;
        if (this.ElapsedTime >= this.TIME_INTERVAL) {
            this.SPRITE_INDEX = (this.SPRITE_INDEX % this.MAX_FRAMES) + 1;
            this.entity.setFrame(this.SPRITE_INDEX);
            this.ElapsedTime = 0;
        }
        this.entity.x -= this.velocity;

    }

    setPos(x, y) {
        this.entity.x = x;
        this.entity.y = y;
    }
}