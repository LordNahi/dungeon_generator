namespace Screens {
  export class LoadingScreen extends Phaser.State {
    constructor() {
      super();
    }

    public create() {
      game.load.onLoadStart.addOnce(this.onLoadStart, this);
      game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

      this.prepareLoadStack();
    }

    private prepareLoadStack() {
      // Prepare load queue ...
      this.game.load.image("arrow", "./assets/debug/arrow.png");

      // Kick off loader ...
      this.game.load.start();
    }

    private onLoadStart() {
      console.log("Loading assets ...");
    }

    private onLoadComplete() {
      console.log("Assets loaded! Moving to next state ...");
      this.game.state.start("main", true, false);
    }
  }
}
