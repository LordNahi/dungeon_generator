namespace RoomConfigs {
  // If rooms aren't in roomProbabilities, they won't be selected ...
  export var roomProbabilities = {
    corridor: 100,
    misc: 70,
    miniboss: 10,
    boss: 2
  };

  export var config = {
    start: [
      {
        name: "basicStart",
        tWidth: 3,
        tHeight: 3,
        weight: 50,
        colour: 0x5980f7
      },
      {
        name: "rareStart",
        tWidth: 5,
        tHeight: 5,
        weight: 1,
        colour: 0x5980f7
      }
    ],

    corridor: [
      {
        name: "regular",
        tWidth: 3,
        tHeight: 3,
        weight: 1,
        colour: 0xd3d3d3
      }
    ],

    misc: [
      {
        name: "barrels",
        tWidth: 6,
        tHeight: 2,
        weight: 1,
        colour: 0x4df950
      },
      {
        name: "skull",
        tWidth: 5,
        tHeight: 5,
        weight: 1,
        colour: 0x4df950
      },
      {
        name: "stranger",
        tWidth: 4,
        tHeight: 9,
        weight: 1,
        colour: 0x4df950
      },
      {
        name: "bloody",
        tWidth: 3,
        tHeight: 3,
        weight: 1,
        colour: 0x4df950
      },
      {
        name: "crater",
        tWidth: 3,
        tHeight: 3,
        weight: 1,
        colour: 0x4df950
      }
    ],

    item: [
      {
        name: "familiar",
        tWidth: 5,
        tHeight: 5,
        weight: 1,
        colour: 0x7ff8ff
      },
      {
        name: "weapon",
        tWidth: 5,
        tHeight: 5,
        weight: 1,
        colour: 0x7ff8ff
      },
      {
        name: "buff",
        tWidth: 5,
        tHeight: 5,
        weight: 1,
        colour: 0x7ff8ff
      }
    ],

    treasure: [
      {
        name: "small",
        tWidth: 2,
        tHeight: 2,
        weight: 1,
        colour: 0xffcc35
      }
    ],

    miniboss: [
      {
        name: "testMiniBoss",
        tWidth: 10,
        tHeight: 10,
        weight: 1,
        colour: 0xff7c7c
      }
    ],

    boss: [
      {
        name: "testBoss",
        tWidth: 20,
        tHeight: 20,
        weight: 1,
        colour: 0xff3838
      }
    ]
  };
}
