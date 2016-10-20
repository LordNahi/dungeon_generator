var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var maingame = (function () {
    function maingame() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content');
        //State creation
        this.game.state.add('game', new gameScreen(), true);
    }
    return maingame;
}());
window.onload = function () {
    var game = new maingame();
};
var gameScreen = (function (_super) {
    __extends(gameScreen, _super);
    function gameScreen() {
        _super.apply(this, arguments);
    }
    gameScreen.prototype.preload = function () {
    };
    gameScreen.prototype.create = function () {
    };
    gameScreen.prototype.update = function () {
    };
    return gameScreen;
}(Phaser.State));
/// <reference path='./tsdef/pixi.d.ts'/>
/// <reference path='./tsdef/phaser.d.ts'/>
/// <reference path='./src/game.ts'/>
/// <reference path='./src/screens/gameScreen.ts'/>
