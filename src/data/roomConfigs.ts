namespace RoomConfigs {
    // Balance category probabilities ...
    export var roomProbabilities = {
        corridor: 0.5,
        treasure: 0.001,
        miniboss: 0.01,
        boss: 0.0005,
    };

    export var corridor: Level.ILevelConfig[] = [
        {
            name: "horizontal",
            tWidth: 10,
            tHeight: 3,
            chance: 0.5,
            colour: 0xFFFFFF
        },
        {
            name: "vertical",
            tWidth: 3,
            tHeight: 10,
            chance: 0.5,
            colour: 0xFFFFFF
        },
    ];

    export var treasure: Level.ILevelConfig[] = [
        {
            name: "small",
            tWidth: 3,
            tHeight: 3,
            chance: 1,
            colour: 0xFFFF00
        }
    ];

    export var miniBoss: Level.ILevelConfig[] = [
        {
            name: "testMiniBoss",
            tWidth: 20,
            tHeight: 20,
            chance: 1,
            colour: 0xFFA500
        }
    ];

    export var boss: Level.ILevelConfig[] = [
        {
            name: "testBoss",
            tWidth: 30,
            tHeight: 20,
            chance: 1,
            colour: 0xFF0000
        }
    ];
}