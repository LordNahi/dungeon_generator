namespace Generators {
    export class LevelGenerator {
        public generateLevel(
            mapSizeX: number,
            mapSizeY: number,
            minRoomWidth: number,
            maxRoomWidth: number,
            minRoomHeight: number,
            maxRoomHeight: number,
            roomCount: number,
            seed?: string
        ) : Level.LevelContainer {
            // Kick off the generator by seeding the random generator's seed ...
            Math.seedrandom(seed || this.generateSeed());

            let levelContainer = new Level.LevelContainer();
            let levelGrid = this.generateGrid(mapSizeX, mapSizeY);

            // Tile placing start x/y ...
            // integer within the bounds of mapSizeX / mapSizeY ...
            let cursorX = Math.round(mapSizeX / 2);
            let cursorY = Math.round(mapSizeY / 2);

            // Position of actual room placement ...
            // This will likely be unimportant for you to keep an eye on ...
            let placeX = 0;
            let placeY = 0;

            // Place first tile ...
            let tile = new Level.LevelTile(
                placeX,
                placeY,
                3,
                3
            );
            levelGrid[cursorX][cursorY] = 1;
            levelContainer.add(tile);
            tile.setColour(0xFF0000);

            if (roomCount) {
                for (let i = 0; i < roomCount; i ++) {
                    // Start tile size ...
                    // Keep it square for now ...
                    // let tWidth = Math.min(minRoomWidth, Math.round(Math.random() * maxRoomWidth));
                    // let tHeight = Math.min(minRoomHeight, Math.round(Math.random() * maxRoomHeight));
                    let tWidth = 3;
                    let tHeight = 3;

                    // Begin basic placement rules ...
                    // Iterating over each tile each iteration will be shit ...
                    let tilePlaced = false;
                    while (!tilePlaced) {
                        // Set direction to place tile ...
                        let direction = this.getValidDirection(cursorX, cursorY, levelGrid);

                        // Handle placement for each direction ...
                        // Don't forget you're forcing the level to generate in the
                        // middle of the grid, you haven't handled checking positions
                        // outside of the grid ...

                        // Debugging ...
                        let arrow = game.add.image(
                            0,
                            0,
                            "arrow"
                        );

                        switch (direction) {
                            case "up":
                                placeY -= Config.generator.tileSize * tHeight;
                                cursorY -= 1;

                                arrow.rotation = (2 * Math.PI) * 0.75;
                                break;

                            case "down":
                                placeY += Config.generator.tileSize * tHeight;
                                cursorY += 1;

                                arrow.rotation = (2 * Math.PI) * 0.25;
                                break;

                            case "left":
                                placeX -= Config.generator.tileSize * tWidth;
                                cursorX -= 1;

                                arrow.rotation = (2 * Math.PI) * 0.5;
                                break;

                            case "right":
                                placeX += Config.generator.tileSize * tWidth;
                                cursorX += 1;

                                arrow.rotation = (2 * Math.PI) * 0;
                                break;
                        }

                        levelGrid[cursorX][cursorY] = 1;

                        let tile = new Level.LevelTile(
                            placeX,
                            placeY,
                            tWidth,
                            tHeight
                        );

                        levelContainer.add(tile);

                        arrow.x = tile.centerX;
                        arrow.y = tile.centerY;
                        arrow.anchor.setTo(0.5);

                        levelContainer.add(arrow);

                        tile.setColour(0xFFFFFF);

                        tilePlaced = true;
                    }

                    console.log("Room created!");
                }

                return levelContainer;
            } else {
                console.warn("Room count must be atleast 1 ...");
                return null;
            }
        }

        public generateSeed() {
            let id = "";
            let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 5; i++)
                id += alpha.charAt(Math.floor(Math.random() * alpha.length));

            return id;
        }

        public generateGrid(width, height) {
            let levelGrid = [];

            for (let i = 0; i < width; i ++) {
                let gridColumn = [];
                for (let j = 0; j < height; j ++) {
                    gridColumn.push(0);
                }
                levelGrid.push(gridColumn);
            }

            return levelGrid;
        }

        public getValidDirection(cursorX, cursorY, levelGrid) {
            let validDirections = [];
            let direction;

            if (levelGrid[cursorX][cursorY - 1] == 0) { validDirections.push("up"); }
            if (levelGrid[cursorX][cursorY + 1] == 0) { validDirections.push("down"); }
            if (levelGrid[cursorX - 1][cursorY] == 0) { validDirections.push("left"); }
            if (levelGrid[cursorX + 1][cursorY] == 0) { validDirections.push("right"); }

            direction = validDirections[Math.floor(Math.random() * validDirections.length)];

            console.log("Valid Directions:", validDirections);
            console.log("Chose:", direction);

            return direction;
        }
    }
}