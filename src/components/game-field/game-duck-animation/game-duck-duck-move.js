/* eslint-disable no-param-reassign */
import { showCurrentStatistic } from "./game-show-current-statistic-function";
import { isRoundEnd, incDuckFlyAway, killed } from "../../../core/user-statistic";
import AudioProcessor from "../../audio-processor/audio-processor.component";

const duckImgR = document.createElement("img");
duckImgR.src = "../../../assets/img/duckR.png";
const duckImgL = document.createElement("img");
duckImgL.src = "../../../assets/img/duckL.png";
const duckGoAw = document.createElement("img");
duckGoAw.src = "../../../assets/img/duckGo.png";
const duckShotImg = document.createElement("img");
duckShotImg.src = "../../../assets/img/duckD.png"; // застреленная в 1м кадре, падающая во втором

let soundCounter = 0;

// функция для рандомного изменения направления
export function randomWithoutZero() {
    const stepPathChangeArr = [-5, -10, 10, 5];
    return stepPathChangeArr[Math.round(Math.random() * 3)];
}

// обнуляем некоторые параметры
export function newDucksParameters(ducks) {
    ducks.duck1.timeAfterStartFly = 0;
    ducks.duck2.timeAfterStartFly = 0;
    ducks.duck1.duckFall = false;
    ducks.duck2.duckFall = false;
    ducks.duck1.timeAfterDeath = 0;
    ducks.duck2.timeAfterDeath = 0;
    ducks.duck1.isLive = true;
    ducks.duck2.isLive = true;
    ducks.duck1.moveX = 500 + randomWithoutZero();
    ducks.duck1.moveY = 480;
    ducks.duck2.moveX = 250 + randomWithoutZero();
    ducks.duck2.moveY = 480;
    // устанавливаем случайное направление для уток
    ducks.duck1.randomPathChangeY = randomWithoutZero();
    ducks.duck1.randomPathChangeX = randomWithoutZero();
    ducks.duck2.randomPathChangeY = randomWithoutZero();
    ducks.duck2.randomPathChangeX = randomWithoutZero();
}

// здесь только логика смены направления движения и отрисовка картинки с учетом направления
export function duckMove(ctx, duck, ducks, progress) {
    // звук с учетом скорости смены кадров
    soundCounter += 1;
    if (soundCounter === 2) {
        AudioProcessor.reset("quack");
        AudioProcessor.play("quack");
    }
    if (progress.level < 6 && soundCounter === 10) {
        soundCounter = 0;
    } else if (progress.level < 8 && soundCounter === 15) {
        soundCounter = 0;
    } else if (soundCounter === 40) {
        soundCounter = 0;
    }
    // отрисовка кадров
    duck.moveY += duck.randomPathChangeY;
    const duckImg = duck.moveX < duck.moveX + duck.randomPathChangeX ? duckImgR : duckImgL;
    duck.moveX += duck.randomPathChangeX;
    ctx.drawImage(duckImg, 101 * duck.num, 0, 101, 90, duck.moveX, duck.moveY, 101, 90);
    duck.num += 1;
    // duck.frameCounter+=1;
    if (duck.num > 3) duck.num = 0;
    // проверяем столкновение со стеной
    if (duck.moveX < 10) duck.randomPathChangeX = Math.abs(randomWithoutZero());
    if (duck.moveY < 10) duck.randomPathChangeY = Math.abs(randomWithoutZero());
    if (duck.moveX > 690) duck.randomPathChangeX = -1 * Math.abs(randomWithoutZero());
    if (duck.moveY > 380) duck.randomPathChangeY = -1 * Math.abs(randomWithoutZero());
    // проверяем столкновение летающих уток
    if (
        Math.max(ducks.duck1.moveY, ducks.duck2.moveY) <= Math.min(ducks.duck1.moveY, ducks.duck2.moveY) + 100 &&
        Math.max(ducks.duck1.moveX, ducks.duck2.moveX) <= Math.min(ducks.duck1.moveX, ducks.duck2.moveX) + 110
    ) {
        ducks.duck1.moveY > ducks.duck2.moveY
            ? (ducks.duck1.randomPathChangeY = Math.abs(randomWithoutZero()))
            : (ducks.duck1.randomPathChangeY = -1 * Math.abs(randomWithoutZero()));
        ducks.duck2.moveY > ducks.duck1.moveY
            ? (ducks.duck2.randomPathChangeY = Math.abs(randomWithoutZero()))
            : (ducks.duck2.randomPathChangeY = -1 * Math.abs(randomWithoutZero()));
        ducks.duck1.moveX > ducks.duck2.moveX
            ? (ducks.duck1.randomPathChangeX = Math.abs(randomWithoutZero()))
            : (ducks.duck1.randomPathChangeX = -1 * Math.abs(randomWithoutZero()));
        ducks.duck2.moveX > ducks.duck1.moveX
            ? (ducks.duck2.randomPathChangeX = Math.abs(randomWithoutZero()))
            : (ducks.duck2.randomPathChangeX = -1 * Math.abs(randomWithoutZero()));
    }
}

export function duckGoAway(duck, ctx, progress) {
    if (duck.moveX !== null) duck.goAwX = duck.moveX;
    if (duck.moveY !== null) duck.goAwY = duck.moveY;
    duck.moveX = null;
    duck.moveY = null;
    if (duck.goAwY > -80) {
        ctx.drawImage(duckGoAw, 100 * duck.num, 0, 100, 90, duck.goAwX, duck.goAwY, 100, 90);
        duck.num += 1;
        if (duck.num > 3) duck.num = 0;
        duck.goAwY -= 10;
    } else if (progress.currentTwoDucksCruck < 2) {
        progress.currentTwoDucksCruck += 1;
        incDuckFlyAway(); // ! статистика
        isRoundEnd(); // ! статистика
        progress.goAwayducks += 1;
        showCurrentStatistic(progress);
        progress.cruckDuck += 1;
    }
}

export function duckFall(duck, ctx, progress) {
    if (!duck.duckFall && duck.fallY < 450) {
        ctx.drawImage(duckShotImg, 105, 0, 105, 90, duck.fallX, duck.fallY, 101, 90);
        duck.fallY += 50;
    } else if (!duck.duckFall) {
        duck.duckFall = true;
        progress.currentTwoDucksCruck += 1;
        killed(); // ! статистика
        isRoundEnd(); // ! статистика
        progress.currentTwoShotDucks += 1;
        progress.shotDucks += 1;
        progress.score += 8 + 2 * progress.level;
        showCurrentStatistic(progress);
        progress.cruckDuck += 1;
        AudioProcessor.pause("duckDeath");
        AudioProcessor.reset("countingHits");
        AudioProcessor.play("countingHits");
    }
}

export function duckShot(duck, ctx, progress) {
    duck.isLive = false;
    if (duck.moveX !== null) {
        duck.fallX = duck.moveX;
    }
    if (duck.moveY !== null) duck.fallY = duck.moveY;
    if (duck.timeAfterDeath === 2) {
        AudioProcessor.reset("duckDeath");
        AudioProcessor.play("duckDeath");
    }
    duck.moveX = null;
    duck.moveY = null;
    if (duck.timeAfterDeath < 4) {
        ctx.drawImage(duckShotImg, 0, 0, 105, 90, duck.fallX, duck.fallY, 101, 90);
        duck.timeAfterDeath += 1;
    } else {
        duckFall(duck, ctx, progress);
    }
}
