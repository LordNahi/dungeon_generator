let gameRoot: App;
let game: Phaser.Game;

interface StateOb {
  name: string;
  state: Phaser.State;
}

class App {
  public readonly states: { name: string; state: Phaser.State }[];
  public readonly game: Phaser.Game;

  constructor(width: number, height: number) {
    this.game = new Phaser.Game(width, height, Phaser.AUTO, "content");

    // State creation ...
    this.states = [
      { name: "loading", state: new Screens.LoadingScreen() },
      { name: "main", state: new Screens.MainScreen() }
    ];

    this.states.forEach((stateOb: StateOb) => {
      this.game.state.add(stateOb.name, stateOb.state, false);
    }, this);

    this.game.state.start("loading", true, false);
  }
}

window.onload = () => {
  gameRoot = new App(window.innerWidth, window.innerHeight);
  game = gameRoot.game;
};
