class maingame {
    game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content');

        //State creation
        this.game.state.add('game', new gameScreen(), true);
    }
}

window.onload = () => {
    var game = new maingame();
}
