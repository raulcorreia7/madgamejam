class ControllPad {
    constructor(game, player, width, height) {
        this.left = game.add.image(width * 0.025, height * 0.75, 'button_left');
        this.right = game.add.image(width * 0.025 + 75, height * 0.75, 'button_right');

        this.left.setScale(0.50);
        this.right.setScale(0.50);
        this.player = player;

        this.left.setInteractive().on(
            'pointerdown', () => {
                this.player.changeDirection('left');
            }
        )

        this.left.on(
            'pointerup', () => {
                this.player.changeDirection('idle');
            }
        )
        this.right.setInteractive().on(
            'pointerdown', (pointer) => {
                if (pointer.isDown)
                    this.player.changeDirection('right');
            }
        )
        this.right.on(
            'pointerup', () => {
                this.player.changeDirection('idle');
            }
        )
    }
}