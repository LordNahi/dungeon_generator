namespace Screens {
  export class MainScreen extends Phaser.State {
    public cursors: Phaser.CursorKeys;
    public levelGenerator: Generators.LevelGenerator;
    public level: Level.LevelContainer;

    constructor() {
      super();
    }

    public create() {
      game.stage.backgroundColor = 0xffffff;
      this.cursors = game.input.keyboard.createCursorKeys();

      // Currently not handling when attempting to look outside array
      // boundaries, just making the map massive and starting from the
      // center to minimize the chance ...
      let mapSize = 500;

      game.world.setBounds(
        0,
        0,
        Config.generator.tileSize * mapSize,
        Config.generator.tileSize * mapSize
      );

      this.levelGenerator = new Generators.LevelGenerator();
      this.level = this.levelGenerator.generateLevel(
        mapSize,
        mapSize,
        3,
        20,
        3,
        20,
        30
      );
      this.level.position.setTo(
        game.world.bounds.width / 2,
        game.world.bounds.height / 2
      );

      game.camera.x += game.world.bounds.width / 2 - game.width / 2;
      game.camera.y += game.world.bounds.height / 2 - game.height / 2;
    }

    public update() {
      if (this.cursors.up.isDown) {
        game.camera.y -= 10;
      } else if (this.cursors.down.isDown) {
        game.camera.y += 10;
      }

      if (this.cursors.left.isDown) {
        game.camera.x -= 10;
      } else if (this.cursors.right.isDown) {
        game.camera.x += 10;
      }
    }

    public render() {
      game.debug.cameraInfo(game.camera, 32, 32);
    }
  }
}
