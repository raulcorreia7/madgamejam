class Healthbar {

    constructor(game, player, width, height) {
        this.lifes = player.lives();
        this.hearts = [];
        for (var i = 0; i < this.lifes; i++) {
            this.hearts.push(
                game.add.sprite(
                    width * 0.025 + (width * 0.05 * i), height * 0.9,
                    'heart', 0
                )
            );
        };
        this.hearts = this.hearts.reverse();
    }

    update(player) {
        var dif = player.MAX_LIVES - player.health;
        for (var i = 0; i < dif; i++) {
            this.hearts[i].setFrame(1);
        }

    }

}