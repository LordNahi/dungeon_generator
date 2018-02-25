namespace Generators {
    export class LevelGenerator {
        private tiles: Level.LevelTile[];

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

            this.tiles = [];

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
            this.placeTile(cursorX, cursorY, 3, 3, levelGrid);
            this.tiles.push(tile);
            levelContainer.add(tile);
            tile.setColour(0xFF0000);

            if (roomCount) {
                for (let i = 1; i < roomCount; i ++) {
                    // Start tile size ...
                    // Keep it square for now ...
                    let tWidthPrev = this.tiles[i - 1].tWidth;
                    let tHeightPrev = this.tiles[i - 1].tHeight;

                    // Begin basic placement rules ...
                    // Iterating over each tile each iteration will be shit ...
                    // Set direction to place tile ...
                    let tWidth = Math.max(minRoomWidth, Math.round(Math.random() * maxRoomWidth));
                    let tHeight = Math.max(minRoomHeight, Math.round(Math.random() * maxRoomHeight));

                    let direction = this.getValidDirection(
                        cursorX,
                        cursorY,
                        tWidth,
                        tHeight,
                        tWidthPrev,
                        tHeightPrev,
                        levelGrid
                    );

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
                            cursorY -= tHeight;

                            arrow.rotation = (2 * Math.PI) * 0.75;
                            break;

                        case "down":
                            placeY += Config.generator.tileSize * tHeightPrev;
                            cursorY += tHeightPrev;

                            arrow.rotation = (2 * Math.PI) * 0.25;
                            break;

                        case "left":
                            placeX -= Config.generator.tileSize * tWidth;
                            cursorX -= tWidth;

                            arrow.rotation = (2 * Math.PI) * 0.5;
                            break;

                        case "right":
                            placeX += Config.generator.tileSize * tWidthPrev;
                            cursorX += tWidthPrev;

                            arrow.rotation = (2 * Math.PI) * 0;
                            break;
                    }

                    let tile = new Level.LevelTile(
                        placeX,
                        placeY,
                        tWidth,
                        tHeight
                    );

                    this.placeTile(cursorX, cursorY, tWidth, tHeight, levelGrid);

                    this.tiles.push(tile);
                    levelContainer.add(tile);

                    arrow.x = tile.centerX;
                    arrow.y = tile.centerY;
                    arrow.anchor.setTo(0.5);

                    levelContainer.add(arrow);

                    tile.setColour(0xFFFFFF);

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

            for (let i = 0; i < 5; i++) {
                id += alpha.charAt(Math.floor(Math.random() * alpha.length));
            }

            console.log("Generated Seed:", id);

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

        public getValidDirection(
            cursorX: number,
            cursorY: number,
            tWidthCurrent: number,
            tHeightCurrent: number,
            tWidthPrev: number,
            tHeightPrev: number,
            levelGrid: number[][]
        ) {
            let validDirections = ["up", "down", "left", "right"];
            let direction;

            // Check Up ...
            for (let i = 0; i < tWidthCurrent; i ++) {
                if (levelGrid[cursorX + i].slice(cursorY - tHeightCurrent, cursorY).reduce((a, b) => a + b)) {
                    validDirections.splice(validDirections.indexOf("up"), 1);
                    break;
                }
            }

            // Check Down ...
            for (let i = 0; i < tWidthCurrent; i ++) {
                if (levelGrid[cursorX + i].slice(cursorY + tHeightPrev, cursorY + tHeightPrev + tHeightCurrent + 1).reduce((a, b) => a + b)) {
                    validDirections.splice(validDirections.indexOf("down"), 1);
                    break;
                }
            }

            // Check Left ...
            for (let i = 0; i < tWidthCurrent; i ++) {
                if (levelGrid[(cursorX - tWidthCurrent) + i].slice(cursorY, cursorY + tHeightCurrent).reduce((a, b) => a + b)) {
                    validDirections.splice(validDirections.indexOf("left"), 1);
                    break;
                }
            }

            // Check Right ...
            for (let i = 0; i < tWidthCurrent; i ++) {
                if (levelGrid[(cursorX + tWidthPrev) + i].slice(cursorY, cursorY + tHeightCurrent).reduce((a, b) => a + b)) {
                    validDirections.splice(validDirections.indexOf("right"), 1);
                    break;
                }
            }

            direction = validDirections[Math.floor(Math.random() * validDirections.length)];

            console.log("Valid Directions:", validDirections);
            console.log("Chose:", direction);

            return direction;
        }

        public placeTile(cursorX, cursorY, tWidth, tHeight, levelGrid) {
            for (let i = 0; i < tWidth; i ++) {
                for (let j = 0; j < tHeight; j ++) {
                    if (levelGrid[cursorX + i][cursorY + j] != undefined) {
                        levelGrid[cursorX + i][cursorY + j] = 1;
                    }
                }
            }
        }
    }
}