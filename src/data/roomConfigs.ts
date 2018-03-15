namespace RoomConfigs {
    // If rooms aren't in roomProbabilities, they won't be selected ...
    export var roomProbabilities = {
        corridor: 100,
        treasure: 5,
        miniboss: 20,
        boss: 10,
    };

    export var config = {
            start: [
                {
                    name: "basicStart",
                    tWidth: 3,
                    tHeight: 3,
                    weight: 50,
                    colour: 0xFF0000
                },
                {
                    name: "rareStart",
                    tWidth: 5,
                    tHeight: 5,
                    weight: 1,
                    colour: 0x00FF00
                }
            ],

            corridor: [
                {
                    name: "horizontal",
                    tWidth: 3,
                    tHeight: 3,
                    weight: 1,
                    colour: 0xFFFFFF
                },
                {
                    name: "vertical",
                    tWidth: 3,
                    tHeight: 3,
                    weight: 1,
                    colour: 0xFFFFFF
                }
            ],

            treasure: [
                {
                    name: "small",
                    tWidth: 2,
                    tHeight: 2,
                    weight: 1,
                    colour: 0xFFFF00
                }
            ],

            miniboss: [
                {
                    name: "testMiniBoss",
                    tWidth: 10,
                    tHeight: 10,
                    weight: 1,
                    colour: 0xFFA500
                }
            ],

            boss: [
                {
                    name: "testBoss",
                    tWidth: 20,
                    tHeight: 20,
                    weight: 1,
                    colour: 0xFF0000
                }
            ]
        }
    }