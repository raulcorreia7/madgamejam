class Sky {
    constructor(game, width, height) {
        this.entity = game.add.image(width / 2, height / 2, 'sky');
        this.entity.setDisplaySize(width, height);
    }
}