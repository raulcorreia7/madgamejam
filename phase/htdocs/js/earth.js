class Earth {

    constructor(game,width,height) {
        this.entity = game.add.sprite(width / 2, height / 2, 'earth');
        this.entity.scaleX = 0.15;
        this.entity.scaleY = 0.15;
        this.radius = ((this.entity.height * this.entity.scaleY) / 2);
        this.entity.setPipeline('Light2D');

    }

    update() {
        //nothing :D, Miguel é um banana
    }

    x() {
        return this.entity.x;
    }

    y() {
        return this.entity.y;
    }

}