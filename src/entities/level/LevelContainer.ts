namespace Level {
    export class LevelContainer extends Phaser.Group {

        constructor() {
            super(game);

            this.game.add.existing(this);
        }
    }
}