class LoadingScreen extends Phaser.Scene {
  public preload() {
    this.load.setPath("./assets/debug/");

    this.load.image("arrow");

    this.load.once("file");
  }

  private onLoadStart() {
    console.log("Loading assets ...");
  }

  private onLoadComplete() {
    console.log("Assets loaded! Moving to next state ...");
    this.game.state.start("main", true, false);
  }
}

export default LoadingScreen;
