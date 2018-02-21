namespace Generators {
    export class LevelGenerator {

        public generateLevel(roomCount: number, seed?: string) : Level.LevelContainer {
            // Kick off the generator by seeding the random generator's seed ...
            Math.seedrandom(seed || this.generateSeed());

            let compas = new Level.Compas();
            let levelContainer = new Level.LevelContainer();

            // Tile placing start x/y ...
            let placeX = 0;
            let placeY = 0;

            if (roomCount) {
                for (let i = 0; i < roomCount; i ++) {
                    // Start tile size ...
                    // Keep it square for now ...
                    let tWidth = 3;
                    let tHeight = 3;

                    // Begin basic placement rules ...
                    // Iterating over each tile each iteration will be shit ...
                    var tilePlaced = false;
                    while (!tilePlaced) {
                        if (i === 0) {
                            // Set up start room ...
                            var tile = new Level.LevelTile(
                                placeX,
                                placeY,
                                tWidth,
                                tHeight
                            );
                            
                            levelContainer.add(tile);

                            tilePlaced = true;
                        } else {
                            // Set direction to place tile ...
                            let direction = tools.choose("up", "down", "left", "right");
                            if (compas[direction]) {
                                // Handle placement for each direction ...
                                switch (direction) {
                                    case "up":
                                        compas = new Level.Compas();
                                        compas.down = false;

                                        placeY -= Config.generator.tileSize * tHeight;
                                    break;

                                    case "down":
                                        compas = new Level.Compas();
                                        compas.up = false;

                                        placeY += Config.generator.tileSize * tHeight;
                                    break;

                                    case "left":
                                        compas = new Level.Compas();
                                        compas.right = false;
                                    
                                        placeX -= Config.generator.tileSize * tWidth;
                                    break;

                                    case "right":
                                        compas = new Level.Compas();
                                        compas.left = false;
                                        placeX += Config.generator.tileSize * tWidth;
                                    break;
                                }

                                var tile = new Level.LevelTile(
                                    placeX,
                                    placeY,
                                    tWidth,
                                    tHeight
                                );

                                levelContainer.add(tile);

                                tilePlaced = true;
                            }
                        }
                    }
                }

                return levelContainer;
            } else {
                console.warn("Room count must be atleast 1 ...");
                return null;
            }
        }

        public generateSeed() {
            var id = "";
            var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                id += alpha.charAt(Math.floor(Math.random() * alpha.length));

            return id;
        }
    }
}