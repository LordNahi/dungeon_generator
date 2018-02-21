namespace Level {
    export class LevelTile extends Phaser.Group {
        private tWidth: number;
        private tHeight: number;
        private tTexture: Phaser.Image;

        constructor(
            x: number,
            y: number,
            tWidth: number,
            tHeight: number
        ) {
            super(game);

            this.tWidth = tWidth;
            this.tHeight = tHeight;
            this.position.setTo(x, y);

            this.add(this.generateTile());

            this.game.add.existing(this);
        }

        private generateTile(): Phaser.Image {
            var bmd: Phaser.Graphics;
            bmd = this.game.make.graphics();
            bmd.lineStyle(2, 0x000, 1);
            bmd.drawRect(
                0,
                0,
                Config.generator.tileSize * this.tWidth,
                Config.generator.tileSize * this.tHeight
                );

            return this.game.make.image(0, 0, bmd.generateTexture());
        }
    }
}