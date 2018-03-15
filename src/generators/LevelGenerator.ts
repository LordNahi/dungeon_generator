namespace Generators {
    export class LevelGenerator {
        private tileStack: Level.LevelTile[];

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

            this.tileStack = [];

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

            let startRoomWidth = 3;
            let startRoomHeight = 3;

            // Place first tile ...
            let tile = new Level.LevelTile(
                placeX,
                placeY,
                startRoomWidth,
                startRoomHeight,
                cursorX,
                cursorY,
                0
            );
            this.placeTile(cursorX, cursorY, startRoomWidth, startRoomHeight, levelGrid);
            this.tileStack.push(tile);
            levelContainer.add(tile);
            tile.setColour(0xFF0000);

            if (roomCount) {
                let currentRoomCount = 0;
                let tileStackPosition = 1;
                while (currentRoomCount < roomCount) {
                    // Begin basic placement rules ...
                    // Iterating over each tile each iteration will be shit ...
                    // Set direction to place tile ...
                    this.getRoomConfig();

                    let direction = null;
                    while (!direction) {
                        direction = this.getValidDirection(
                            cursorX,
                            cursorY,
                            tWidth,
                            tHeight,
                            this.tileStack[tileStackPosition - 1].tWidth,
                            this.tileStack[tileStackPosition - 1].tHeight,
                            levelGrid
                        );

                        if (!direction) {
                            this.tileStack.pop();

                            tileStackPosition--;

                            cursorX = this.tileStack[tileStackPosition - 1].cursorX;
                            placeX = this.tileStack[tileStackPosition - 1].x;

                            cursorY = this.tileStack[tileStackPosition - 1].cursorY;
                            placeY = this.tileStack[tileStackPosition - 1].y;

                            console.log(`No direction found, backtracking to room ${this.tileStack[tileStackPosition - 1].roomNumber}`);
                        }
                    }

                    // Handle placement for each direction ...
                    // Don't forget you're forcing the level to generate in the
                    // middle of the grid, you haven't handled checking positions
                    // outside of the grid ...

                    let number = game.add.text(
                        0,
                        0,
                        currentRoomCount.toString(),
                        {
                            fontSize: "16px"
                        }
                    );

                    switch (direction) {
                        case "up":
                            placeY -= Config.generator.tileSize * tHeight;
                            cursorY -= tHeight;
                            break;

                        case "down":
                            placeY += Config.generator.tileSize * this.tileStack[tileStackPosition - 1].tHeight;
                            cursorY += this.tileStack[tileStackPosition - 1].tHeight;
                            break;

                        case "left":
                            placeX -= Config.generator.tileSize * tWidth;
                            cursorX -= tWidth;
                            break;

                        case "right":
                            placeX += Config.generator.tileSize * this.tileStack[tileStackPosition - 1].tWidth;
                            cursorX += this.tileStack[tileStackPosition - 1].tWidth;
                            break;
                    }

                    console.log(`Room ${currentRoomCount} going ${direction} from room ${this.tileStack[tileStackPosition - 1].roomNumber}`);

                    let tile = new Level.LevelTile(
                        placeX,
                        placeY,
                        tWidth,
                        tHeight,
                        cursorX,
                        cursorY,
                        currentRoomCount
                    );

                    this.placeTile(cursorX, cursorY, tWidth, tHeight, levelGrid);

                    this.tileStack.push(tile);
                    levelContainer.add(tile);

                    currentRoomCount ++;
                    tileStackPosition ++;

                    number.x = tile.centerX;
                    number.y = tile.centerY;
                    number.anchor.setTo(0.5);

                    levelContainer.add(number);

                    tile.setColour(0xFFFFFF);
                }

                console.log(this.tileStack);

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
                if (levelGrid[cursorX + i].slice(cursorY + tHeightPrev, cursorY + tHeightPrev + tHeightCurrent).reduce((a, b) => a + b)) {
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

        public getRoomConfig(): Level.ILevelConfig {
            let roll = Math.random();
            for (var name in RoomConfigs.roomProbabilities) {
                if (RoomConfigs.roomProbabilities.hasOwnProperty(name)) {
                    if (roll < RoomConfigs.roomProbabilities[name]) {

                    }
                }
            }

            return 
        }
    }
}