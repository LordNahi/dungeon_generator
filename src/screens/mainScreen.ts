namespace Screens {
    export class MainScreen extends Phaser.State {

        constructor() {
            super();
        }

        public create() {
            // Place holder shit ...
            game.stage.backgroundColor = 0xa0c4ff;

            let text: Phaser.Text;
            let style: any;

            style = {
                font: "Arial",
                fill: "#FFFFFF",
                fontSize: "50px",
            };
            text = this.game.add.text(game.width / 2, game.height / 2, "TEMPLATE", style);
            text.anchor.setTo(0.5);
            text.rotation -= (2 * Math.PI) * 0.2;

            game.add.tween(text).to(
                {rotation: text.rotation + (2 * Math.PI) * 0.4},
                1000,
                Phaser.Easing.Linear.None,
                true,
                0,
                -1,
                true,
            );
        }
        
        public update() {
            
        }
    }
}
