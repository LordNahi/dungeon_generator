import { generatorConfig } from "../../data/generatorConfig";
export class LevelTile extends Phaser.Group {
    constructor(x, y, config, cursorX, cursorY, roomNumber) {
        super(game);
        this.config = config;
        this.cursorX = cursorX;
        this.cursorY = cursorY;
        this.roomNumber = roomNumber;
        this.tTexture = this.generateTile(this.config.colour);
        this.position.setTo(x, y);
        this.add(this.tTexture);
        this.game.add.existing(this);
    }
    setColour(colour) {
        // Debug jazz ...
        if (this.tTexture) {
            this.tTexture.destroy();
            this.tTexture = this.generateTile(colour);
            this.add(this.tTexture);
        }
    }
    generateTile(colour) {
        var bmd;
        bmd = this.game.make.graphics();
        bmd.beginFill(colour, 1);
        bmd.drawRect(0, 0, generatorConfig.tileSize * this.config.tWidth, generatorConfig.tileSize * this.config.tHeight);
        return this.game.make.image(0, 0, bmd.generateTexture());
    }
}
//# sourceMappingURL=LevelTile.js.map