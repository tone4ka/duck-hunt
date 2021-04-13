import { statEventHandler } from "./utils/serverAPI";

const levelSettings = {
    ducksTogether: 2,
    ducksPerRound: 10,
    ducksNeed: 5,
    shots: 4
};

const gameStat = {
    time: null,
    ducks: null,
    hits: null,
    kills: null,
    score: null
};

const lvlStat = {
    ducksKillPerRound: 0,
    duckKillPerLevel: 0,
    duckCount: 0,
    ducksFlyAway: 0,
    ducksFlyAwayPerRound: 0,
    bulets: 0,
    hits: 0,
    score: 0,
    currentLvl: 0
};
function saveStat() {
    const statArray = JSON.parse(localStorage.getItem("currentUserStat")) || [];
    statArray.push(gameStat);
    localStorage.setItem("currentUserStat", JSON.stringify(statArray));
}

// начало игры
export function startGameStat(lvl) {
    gameStat.time = 0;
    gameStat.ducks = 0;
    gameStat.hits = 0;
    gameStat.kills = 0;
    gameStat.score = 0;
    lvlStat.currentLvl = lvl - 1;
}

// начало уровня
export function statStart() {
    lvlStat.ducksKillPerRound = 0;
    lvlStat.duckKillPerLevel = 0;
    lvlStat.duckCount = 0;
    lvlStat.ducksFlyAway = 0;
    lvlStat.ducksFlyAwayPerRound = 0;
    lvlStat.bulets = 0;
    lvlStat.hits = 0;
    lvlStat.score = 0;
    lvlStat.currentLvl += 1;
}

// утка выбыла любым способом
export function isRoundEnd() {
    if (lvlStat.ducksKillPerRound + lvlStat.ducksFlyAwayPerRound === levelSettings.ducksTogether) {
        return true;
    }
    return false;
}

// если убили 2 утки из 2, т.е isRoundEnd вернул true
export function newRound() {
    lvlStat.ducksKillPerRound = 0;
    lvlStat.ducksFlyAwayPerRound = 0;
    lvlStat.bulets = 0;
    lvlStat.duckCount += levelSettings.ducksTogether;
}

// если утка улетела
export function incDuckFlyAway() {
    lvlStat.ducksFlyAway += 1;
    lvlStat.ducksFlyAwayPerRound += 1;
}

// при выстреле
export function isBuletsEnd() {
    if (lvlStat.bulets < levelSettings.shots) {
        lvlStat.hits += 1;
        lvlStat.bulets += 1;
        return true;
    }
    return false;
}

// после окончания каждого уровня
export function isLevelEnd() {
    if (
        lvlStat.duckCount === levelSettings.ducksPerRound &&
        lvlStat.duckKillPerLevel + lvlStat.ducksFlyAway === levelSettings.ducksPerRound
    ) {
        return true;
    }
    return false;
}

export function LooseOrEnd() {
    saveStat();
    statEventHandler(gameStat);
}
// при окончании уровня  т.е isLevelEnd вернул true
export function isWin() {
    gameStat.time = new Date();
    gameStat.ducks += levelSettings.ducksPerRound;
    gameStat.hits += lvlStat.hits;
    gameStat.kills += lvlStat.duckKillPerLevel;
    gameStat.score += lvlStat.score;
    if (lvlStat.duckKillPerLevel >= levelSettings.ducksNeed) {
        return true;
    }
    LooseOrEnd();
    return false;
}

export function getStat() {
    return gameStat;
}

export function getLvlStat() {
    return lvlStat;
}

export function killed() {
    lvlStat.ducksKillPerRound += 1;
    lvlStat.score += 8 + 2 * lvlStat.currentLvl;
    lvlStat.duckKillPerLevel += 1;
}
