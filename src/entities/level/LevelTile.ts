namespace Level {
  export class LevelTile extends Phaser.Group {
    public readonly config: ILevelConfig;
    public readonly cursorX: number;
    public readonly cursorY: number;
    public readonly roomNumber: number;
    private tTexture: Phaser.Image;

    constructor(
      x: number,
      y: number,
      config,
      cursorX: number,
      cursorY: number,
      roomNumber: number
    ) {
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
      bmd.drawRect(
        0,
        0,
        Config.generator.tileSize * this.config.tWidth,
        Config.generator.tileSize * this.config.tHeight
      );

      return this.game.make.image(0, 0, bmd.generateTexture());
    }
  }
}
