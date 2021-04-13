export const ducksForGame = {
    duck1: {
        isLive: true,
        goAway: false,
        duckFall: false,
        moveX: 500,
        moveY: 480,
        fallY: 0,
        fallX: 0,
        goAwX: 0,
        goAwY: 0,
        num: 0,
        timeAfterDeath: 0,
        timeAfterStartFly: 0
    },
    duck2: {
        isLive: true,
        goAway: false,
        duckFall: false,
        moveX: 250,
        moveY: 480,
        fallY: 0,
        fallX: 0,
        goAwX: 0,
        goAwY: 0,
        num: 3,
        timeAfterDeath: 0,
        timeAfterStartFly: 0
    }
};

export const progressForGame = {
    level: 1,
    cruckDuck: 0, // ушедшие любым способом утки
    shotDucks: 0, // застреленные утки
    goAwayducks: 0, // улетевшие утки
    currentTwoDucksCruck: 0, // ушла ли любым свособом текущая пара уток
    currentTwoShotDucks: 0,
    bullet: 4, // оставшиеся пули
    score: 0 // очки
};
export function startGameProgressParameters() {
    progressForGame.level = 1;
    progressForGame.cruckDuck = 0; // ушедшие любым способом утки
    progressForGame.shotDucks = 0; // застреленные утки
    progressForGame.goAwayducks = 0; // улетевшие утки
    progressForGame.currentTwoDucksCruck = 0; // ушла ли любым свособом текущая пара уток
    progressForGame.currentTwoShotDucks = 0;
    progressForGame.bullet = 4; // оставшиеся пули
    progressForGame.score = 0; // очки
}

export function newLvlProgressParameters() {
    progressForGame.cruckDuck = 0; // ушедшие любым способом утки
    progressForGame.shotDucks = 0; // застреленные утки
    progressForGame.goAwayducks = 0; // улетевшие утки
    progressForGame.currentTwoDucksCruck = 0; // ушла ли любым свособом текущая пара уток
    progressForGame.currentTwoShotDucks = 0;
    progressForGame.bullet = 4; // оставшиеся пули
}
