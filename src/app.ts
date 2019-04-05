import Phaser from "phaser";

export interface SceneOb {
  name: string;
  scene: Phaser.Scene;
}

class Game extends Phaser.Game {
  public readonly scenes: SceneOb[];
  public readonly game: Phaser.Game;

  constructor(width: number, height: number) {
    super();

    this.game = new Phaser.Game({
      width,
      height,
      render: {
        pixelArt: true
      }
    });

    // State creation ...
    this.scenes = [
      { name: "loading", scene: new LoadingScreen() },
      { name: "main", scene: new MainScreen() }
    ];

    this.states.forEach((stateOb: StateOb) => {
      this.game.state.add(stateOb.name, stateOb.state, false);
    }, this);

    this.game.state.start("loading", true, false);
  }
}

new Game(window.innerWidth, window.innerHeight);

// window.onload = () => {
//   gameRoot = new App(window.innerWidth, window.innerHeight);
//   game = gameRoot.game;
// };
