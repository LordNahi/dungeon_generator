class LoadingScreen extends Phaser.Scene {
    preload() {
        this.load.setPath("./assets/debug/");
        this.load.image("arrow");
        this.load.once("file");
    }
    onLoadStart() {
        console.log("Loading assets ...");
    }
    onLoadComplete() {
        console.log("Assets loaded! Moving to next state ...");
        this.game.state.start("main", true, false);
    }
}
export default LoadingScreen;
//# sourceMappingURL=loadingScreen.js.map