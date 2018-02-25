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
            this.tTexture = this.generateTile(0xFFF);
            this.position.setTo(x, y);

            this.add(this.tTexture);

            this.game.add.existing(this);
        }

        public setColour(colour: number) {
            // Debug jazz ...
            if (this.tTexture) {
                this.tTexture.destroy();
                this.tTexture = this.generateTile(colour);

                this.add(this.tTexture);
            }
        }

        private generateTile(colour: number): Phaser.Image {
            var bmd: Phaser.Graphics;
            bmd = this.game.make.graphics();
            bmd.beginFill(colour, 1); 
            bmd.lineStyle(2, 0x000000, 1);
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