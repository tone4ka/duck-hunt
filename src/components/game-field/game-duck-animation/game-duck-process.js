/* eslint-disable no-use-before-define */
import { CANVAS_HEIGTH, CANVAS_WIDTH, lang, getLang } from "../../../core/index";
import { duckMove, duckGoAway, duckShot, newDucksParameters } from "./game-duck-duck-move";
import { ducksForGame, progressForGame, newLvlProgressParameters, startGameProgressParameters } from "./game-constants";
import { dog, dogMove, newDogParameters } from "./game-dog-animation";
import { showCurrentStatistic } from "./game-show-current-statistic-function";
import { ModalWindow } from "../../modal-window/modal-window.component";
import {
    startGameStat,
    statStart,
    newRound,
    isBuletsEnd,
    isLevelEnd,
    isWin,
    LooseOrEnd
} from "../../../core/user-statistic";
import { cloudsAdd } from "./game-clouds";
import AudioProcessor from "../../audio-processor/audio-processor.component";
import { CondratsBro } from "../../first-pages/psges-list/congratsBro/congrats.component";

const treeGrass = document.createElement("img");
treeGrass.src = "../../../assets/img/background_full.png";
let ctx;
let canvas;
let pauseFlag = false;
let gameFlag = false;
let reloadGameFlag = false;
const time = {
    frameTime: 80,
    moveIntervalId: null
};
let shotListenerFlag = false;
const reloadEvent = new Event("reloadGameEvent");

function continueGame(event) {
    if (event.target.classList.contains("continue-btn") || event.target.id === "to-main") {
        if (event.target.id === "to-main" && reloadGameFlag) {
            shotListenerFlag = false;
            document.body.dispatchEvent(reloadEvent);
            reloadGameFlag = false;
        } else if (gameFlag && pauseFlag) {
            startGame(null, null); // возвращаемся в игру, не меняя параметры
        }
        pauseFlag = false;
    }
}

document.body.addEventListener("click", (event) => continueGame(event));

function pauseGame() {
    if (gameFlag && !pauseFlag) {
        pauseFlag = true;
        clearInterval(time.moveIntervalId);
        AudioProcessor.pause("intro");
    }
}

// для модальных окон
const modalWindowPerfect = new ModalWindow("perfect");
const modalWindowGameOver = new ModalWindow("game-over");
const congradituate = new CondratsBro();

function showModalWindow() {
    if (progressForGame.shotDucks >= 5) {
        modalWindowPerfect.showWindow();
        newLvlProgressParameters();
        progressForGame.level += 1;
    } else {
        // при проигрыше
        reloadGameFlag = true;
        modalWindowGameOver.showWindow();
        startGameProgressParameters();
    }
    pauseGame();
}

function gameProcess() {
    gameFlag = true;
    pauseFlag = false;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGTH);
    ctx.drawImage(treeGrass, 0, 0, 1008, 724, 0, 80, CANVAS_WIDTH, CANVAS_HEIGTH);
    dogMove(ctx, time, gameProcess, progressForGame, showCurrentStatistic);
    if (dog.scaredDucks) {
        // ускоряем движение
        clearInterval(time.moveIntervalId);
        time.frameTime = 85 - progressForGame.level * 7;
        time.moveIntervalId = setInterval(() => gameProcess(), time.frameTime);
        ctx.globalCompositeOperation = "destination-over";
        // если еще не закончилось время
        if (ducksForGame.duck1.timeAfterStartFly < Math.ceil(200 * (80 / time.frameTime))) {
            if (ducksForGame.duck1.isLive) {
                if (progressForGame.bullet !== 0) {
                    duckMove(ctx, ducksForGame.duck1, ducksForGame, progressForGame);
                    ducksForGame.duck1.timeAfterStartFly += 1;
                } else {
                    duckGoAway(ducksForGame.duck1, ctx, progressForGame);
                }
            } else {
                duckShot(ducksForGame.duck1, ctx, progressForGame);
            }
        } else if (ducksForGame.duck1.isLive) {
            duckGoAway(ducksForGame.duck1, ctx, progressForGame);
        }
        if (ducksForGame.duck2.timeAfterStartFly < Math.ceil(200 * (80 / time.frameTime))) {
            if (ducksForGame.duck2.isLive) {
                if (progressForGame.bullet !== 0) {
                    duckMove(ctx, ducksForGame.duck2, ducksForGame, progressForGame);
                    ducksForGame.duck2.timeAfterStartFly += 1;
                } else {
                    duckGoAway(ducksForGame.duck2, ctx, progressForGame);
                }
            } else {
                duckShot(ducksForGame.duck2, ctx, progressForGame);
            }
        } else if (ducksForGame.duck2.isLive) {
            duckGoAway(ducksForGame.duck2, ctx, progressForGame);
        }
        // выбыла пара уток
        if (progressForGame.currentTwoDucksCruck === 2) {
            newRound(); // ! статистика
            if (progressForGame.currentTwoShotDucks === 1) dog.findOneDuck = true; // если поймали одну утку
            if (progressForGame.currentTwoShotDucks === 2) dog.findTwoDucks = true; // если поймали две утки
            if (progressForGame.currentTwoShotDucks === 0) dog.laught = true; // если не поймали ни одной утки
            progressForGame.currentTwoDucksCruck = 0;
            progressForGame.currentTwoShotDucks = 0;
            newDucksParameters(ducksForGame);
            dog.scaredDucks = false;
            showCurrentStatistic(progressForGame);
        }
        // конец уровня
        if (progressForGame.cruckDuck === 10) {
            // ! статистика
            if (isLevelEnd()) {
                isWin();
                statStart();
            }
            if (progressForGame.level < 10) {
                showCurrentStatistic(progressForGame);
                showModalWindow();
                newDogParameters(); // для выхода собаки между уровнями
            } else {
                // конец игры
                showCurrentStatistic(progressForGame);
                if (progressForGame.shotDucks < 5) {
                    // проигрыш
                    reloadGameFlag = true;
                    showModalWindow();
                } else {
                    // победа
                    congradituate.init(`${lang[getLang()].win}`, progressForGame.score);
                    document.body.dispatchEvent(reloadEvent);
                    LooseOrEnd();
                }
                startGameProgressParameters();
                pauseGame();
                newDogParameters();
                dog.go = false;
                clearInterval(time.moveIntervalId);
            }
        }
    }
    cloudsAdd(ctx, progressForGame.level);
}

function shot(event) {
    if (ducksForGame.duck1.isLive || ducksForGame.duck2.isLive) {
        // увеличиваем радиус попадания при увеличении скорости
        let hittingError = 0;
        switch (progressForGame.level) {
            case 6:
                hittingError = 5;
                break;
            case 7:
                hittingError = 10;
                break;
            case 8:
                hittingError = 15;
                break;
            case 9:
                hittingError = 18;
                break;
            case 10:
                hittingError = 20;
                break;
            default:
                break;
        }
        if (progressForGame.bullet > 0) {
            progressForGame.bullet -= 1;
            AudioProcessor.reset("shot");
            AudioProcessor.play("shot");
            isBuletsEnd(); // ! статистика
            const clickX = event.clientX - canvas.getBoundingClientRect().left + 25;
            const clickY = event.clientY - canvas.getBoundingClientRect().top + 25;
            if (clickY < 480) {
                if (
                    clickX > ducksForGame.duck1.moveX + 5 - hittingError &&
                    clickX < ducksForGame.duck1.moveX + 101 - 5 + hittingError &&
                    clickY > ducksForGame.duck1.moveY + 5 - hittingError &&
                    clickY < ducksForGame.duck1.moveY + 90 - 5 + hittingError
                ) {
                    ducksForGame.duck1.isLive = false;
                }
                if (
                    clickX > ducksForGame.duck2.moveX + 5 - hittingError &&
                    clickX < ducksForGame.duck2.moveX + 101 - 5 + hittingError &&
                    clickY > ducksForGame.duck2.moveY + 5 - hittingError &&
                    clickY < ducksForGame.duck2.moveY + 90 - 5 + hittingError
                ) {
                    ducksForGame.duck2.isLive = false;
                }
            }
        }
        showCurrentStatistic(progressForGame);
    }
}

export function startGame(context, lvl) {
    canvas = document.querySelector(".game-canvas");
    const theme = +localStorage.getItem("theme");
    switch (theme) {
        case 1:
            canvas.style.cursor =
                "url(../../../assets/img/aim50chB.png), url(../../../assets/img/aim50chB.png) 25 25, default";
            break;
        case 2:
            canvas.style.cursor =
                "url(../../../assets/img/aim50green.png), url(../../../assets/img/aim50green.png) 25 25, default";
            break;
        case 3:
            canvas.style.cursor =
                "url(../../../assets/img/aim50Inv.png), url(../../../assets/img/aim50Inv.png) 25 25, default";
            break;
        default:
            canvas.style.cursor =
                "url(../../../assets/img/aim50.png), url(../../../assets/img/aim50.png) 25 25, default";
            break;
    }
    AudioProcessor.pause("breakTime");
    showCurrentStatistic(progressForGame);
    canvas = document.querySelector(".game-canvas");
    clearInterval(time.moveIntervalId);
    if (context) {
        // запуск начала игры(при продолжении взамен контекста ставлю null)
        shotListenerFlag = false;
        startGameStat(lvl);
        statStart(); // ! статистика
        startGameProgressParameters();
        if (lvl) progressForGame.level = lvl;
        newDogParameters();
        newDucksParameters(ducksForGame);
        ctx = context;
        showCurrentStatistic(progressForGame);
        newDucksParameters(ducksForGame);
    }
    const pauseBtn = document.querySelector(".pause-btn-header");
    pauseBtn.addEventListener("click", () => {
        pauseGame();
        AudioProcessor.reset("breakTime");
        AudioProcessor.play("breakTime");
    });

    time.moveIntervalId = setInterval(() => gameProcess(), time.frameTime);

    if (!shotListenerFlag) {
        canvas.addEventListener("click", (event) => shot(event));
        document.body.addEventListener("changeLang", () => showCurrentStatistic(progressForGame));
    }
    shotListenerFlag = true;
}
