import { seedrandom } from "seedrandom";
import { LevelTile } from "../entities/level/LevelTile";
import { LevelContainer } from "../entities/level/LevelContainer";
import { roomSpecs, roomProbabilities } from "../data/roomSpecs";
import { generatorConfig } from "../data/generatorConfig";
import Tools from "../tools";
export var GeneratorState;
(function (GeneratorState) {
    GeneratorState[GeneratorState["Spawn"] = 0] = "Spawn";
    GeneratorState[GeneratorState["MainPath"] = 1] = "MainPath";
    GeneratorState[GeneratorState["Treasure"] = 2] = "Treasure";
    GeneratorState[GeneratorState["MiniBosses"] = 3] = "MiniBosses";
    GeneratorState[GeneratorState["Boss"] = 4] = "Boss";
})(GeneratorState || (GeneratorState = {}));
export class LevelGenerator {
    constructor() {
        this.tileStack = [];
    }
    generateLevel(mapWidth, mapHeight, roomCount, seed) {
        // Kick off the generator by seeding the random generator's seed ...
        seedrandom(seed || this.generateSeed());
        let levelContainer = new LevelContainer();
        let levelGrid = this.generateGrid(mapWidth, mapHeight);
        // Tile placing start x/y ...
        // integer within the bounds of mapWidth / mapHeight ...
        let cursorX = Math.round(mapWidth / 2);
        let cursorY = Math.round(mapHeight / 2);
        // Position of actual room placement ...
        // This will likely be unimportant for you to keep an eye on ...
        let placeX = 0;
        let placeY = 0;
        // Place first tile ...
        let startRoom = this.getRoom("spawn" /* spawn */);
        let tile = new LevelTile(placeX, placeY, startRoom, cursorX, cursorY, 0);
        this.placeTile(cursorX, cursorY, startRoom.tWidth, startRoom.tHeight, levelGrid);
        this.tileStack.push(tile);
        levelContainer.add(tile);
        tile.setColour(startRoom.colour);
        if (roomCount) {
            let currentRoomCount = 0;
            let tileStackPosition = 1;
            while (currentRoomCount < roomCount) {
                // Begin basic placement rules ...
                // Iterating over each tile each iteration will be shit ...
                // Set direction to place tile ...
                let roomConfig = this.getRoom();
                let direction = null;
                while (!direction) {
                    direction = this.getValidDirection(cursorX, cursorY, roomConfig.tWidth, roomConfig.tHeight, this.tileStack[tileStackPosition - 1].config.tWidth, this.tileStack[tileStackPosition - 1].config.tHeight, levelGrid);
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
                let number = game.add.text(0, 0, currentRoomCount.toString(), {
                    fontSize: "16px"
                });
                switch (direction) {
                    case "up":
                        placeY -= generatorConfig.tileSize * roomConfig.tHeight;
                        cursorY -= roomConfig.tHeight;
                        break;
                    case "down":
                        placeY +=
                            generatorConfig.tileSize *
                                this.tileStack[tileStackPosition - 1].config.tHeight;
                        cursorY += this.tileStack[tileStackPosition - 1].config.tHeight;
                        break;
                    case "left":
                        placeX -= generatorConfig.tileSize * roomConfig.tWidth;
                        cursorX -= roomConfig.tWidth;
                        break;
                    case "right":
                        placeX +=
                            generatorConfig.tileSize *
                                this.tileStack[tileStackPosition - 1].config.tWidth;
                        cursorX += this.tileStack[tileStackPosition - 1].config.tWidth;
                        break;
                }
                console.log(`Room ${currentRoomCount} going ${direction} from room ${this.tileStack[tileStackPosition - 1].roomNumber} - Room:`, roomConfig);
                let tile = new LevelTile(placeX, placeY, roomConfig, cursorX, cursorY, currentRoomCount);
                this.placeTile(cursorX, cursorY, roomConfig.tWidth, roomConfig.tHeight, levelGrid);
                this.tileStack.push(tile);
                levelContainer.add(tile);
                currentRoomCount++;
                tileStackPosition++;
                number.x = tile.centerX;
                number.y = tile.centerY;
                number.anchor.setTo(0.5);
                levelContainer.add(number);
            }
            console.log(this.tileStack);
            return levelContainer;
        }
        else {
            console.warn("Room count must be atleast 1 ...");
            return null;
        }
    }
    generateSeed() {
        let id = "";
        let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            id += alpha.charAt(Math.floor(Math.random() * alpha.length));
        }
        console.log("Generated Seed:", id);
        return id;
    }
    generateGrid(width, height) {
        let levelGrid = [];
        for (let i = 0; i < width; i++) {
            let gridColumn = [];
            for (let j = 0; j < height; j++) {
                gridColumn.push(0);
            }
            levelGrid.push(gridColumn);
        }
        console.log("////////////////////////////// Level Grid //////////////////////////////////");
        console.log(levelGrid);
        console.log("////////////////////////////////////////////////////////////////////////////");
        return levelGrid;
    }
    getValidDirection(cursorX, cursorY, tWidthCurrent, tHeightCurrent, tWidthPrev, tHeightPrev, levelGrid) {
        let validDirections = ["up", "down", "left", "right"];
        let direction;
        // Check Up ...
        for (let i = 0; i < tWidthCurrent; i++) {
            if (levelGrid[cursorX + i]
                .slice(cursorY - tHeightCurrent, cursorY)
                .reduce((a, b) => a + b)) {
                validDirections.splice(validDirections.indexOf("up"), 1);
                break;
            }
        }
        // Check Down ...
        for (let i = 0; i < tWidthCurrent; i++) {
            if (levelGrid[cursorX + i]
                .slice(cursorY + tHeightPrev, cursorY + tHeightPrev + tHeightCurrent)
                .reduce((a, b) => a + b)) {
                validDirections.splice(validDirections.indexOf("down"), 1);
                break;
            }
        }
        // Check Left ...
        for (let i = 0; i < tWidthCurrent; i++) {
            if (levelGrid[cursorX - tWidthCurrent + i]
                .slice(cursorY, cursorY + tHeightCurrent)
                .reduce((a, b) => a + b)) {
                validDirections.splice(validDirections.indexOf("left"), 1);
                break;
            }
        }
        // Check Right ...
        for (let i = 0; i < tWidthCurrent; i++) {
            if (levelGrid[cursorX + tWidthPrev + i]
                .slice(cursorY, cursorY + tHeightCurrent)
                .reduce((a, b) => a + b)) {
                validDirections.splice(validDirections.indexOf("right"), 1);
                break;
            }
        }
        direction =
            validDirections[Math.floor(Math.random() * validDirections.length)];
        return direction;
    }
    placeTile(cursorX, cursorY, tWidth, tHeight, levelGrid) {
        for (let i = 0; i < tWidth; i++) {
            for (let j = 0; j < tHeight; j++) {
                if (levelGrid[cursorX + i][cursorY + j] != undefined) {
                    levelGrid[cursorX + i][cursorY + j] = 1;
                }
            }
        }
    }
    getRoom(category) {
        let result = category;
        if (!roomSpecs[category]) {
            /**
             * TODO: If for whatever reason roomSpecs[category] doesn't return
             * anything, then this will grab ANY random level, we should be
             * able to restrict what room types are selected by default ...
             */
            const randomRoomType = Tools.choices(roomProbabilities);
            if (randomRoomType) {
                result = randomRoomType;
            }
        }
        let levelMap = {};
        let levels = roomSpecs[result];
        for (let i = 0; i < roomSpecs[result].length; i++) {
            let level = roomSpecs[result][i];
            levelMap[i] = level.weight;
        }
        const choice = Tools.choices(levelMap);
        const levelIndex = choice
            ? parseInt(choice)
            : Math.floor(Math.random() * levels.length);
        return levels[levelIndex];
    }
}
//# sourceMappingURL=LevelGenerator.js.map