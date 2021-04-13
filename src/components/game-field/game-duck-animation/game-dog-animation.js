/* eslint-disable no-param-reassign */
import AudioProcessor from "../../audio-processor/audio-processor.component";

const dogImg = document.createElement("img");
dogImg.src = "../../../assets/img/pes.png";
let frameNum = 0;
let frameString = 0;
let frameNumLaught = 3;
let dogGoX = 0;
let dogGoY = 410;
let dogIngrassX = 290;
let dogInGrassY = 370;
let frameCounter = 0;
let frameCounterLaught = 0;

export const dog = {
    go: true,
    jump: false,
    findOneDuck: false,
    findTwoDucks: false,
    laught: false,
    scaredDucks: false
};

export function newDogParameters() {
    frameNum = 0;
    frameString = 0;
    frameNumLaught = 3;
    dogGoX = 0;
    dogGoY = 410;
    dogIngrassX = 290;
    dogInGrassY = 370;
    frameCounter = 0;
    frameCounterLaught = 0;
    dog.go = true;
    dog.jump = false;
    dog.findOneDuck = false;
    dog.findTwoDucks = false;
    dog.laught = false;
    dog.scaredDucks = false;
}

export function dogMove(ctx, time, gameProcess, progress, showCurrentStatistic) {
    clearInterval(time.moveIntervalId);
    time.frameTime = 100;
    time.moveIntervalId = setInterval(() => gameProcess(), time.frameTime);
    if (dog.go) {
        if (frameCounter === 0) {
            progress.bullet = 0;
            showCurrentStatistic(progress);
        }
        if (frameCounter === 1) {
            AudioProcessor.reset("intro");
            AudioProcessor.play("intro");
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(dogImg, 560 * frameNum, 390 * frameString, 555, 410, dogGoX, dogGoY, 250, 180);
        if (frameCounter < 35) {
            dogGoX += 5;
            frameNum += 1;
            if (frameNum > 4) frameNum = 0;
            // иначе замирает и принюхивается
        } else {
            frameNum === 3 ? (frameNum = 4) : (frameNum = 3);
        }
        frameCounter += 1;
        if (frameCounter === 43) {
            AudioProcessor.pause("intro");
        }
        if (frameCounter === 45) {
            dog.go = false;
            dog.jump = true;
            frameCounter = 0;
            frameNum = 0;
            dogGoY = 350;
        }
    }

    if (dog.jump) {
        if (frameCounter === 0) {
            frameCounter += 1;
        } else {
            ctx.globalCompositeOperation = "source-over";
            frameString = 1;
            if (frameCounter < 7) {
                ctx.drawImage(dogImg, 560 * frameNum, 410 * frameString, 560, 600, dogGoX, dogGoY - 20, 264, 270);
            }
            if (frameCounter === 2) {
                AudioProcessor.reset("bark");
                AudioProcessor.play("bark");
            }
            if (frameCounter === 15) {
                AudioProcessor.reset("bark");
                AudioProcessor.play("bark");
            }
            if (frameCounter === 20) {
                AudioProcessor.reset("bark");
                AudioProcessor.play("bark");
                progress.bullet = 4;
                showCurrentStatistic(progress);
            }
            if (frameCounterLaught === 30) {
                AudioProcessor.reset("bark");
                AudioProcessor.play("bark");
            }
            frameCounter += 1;
            if (frameCounter > 2) {
                // замерла с поднятыми ушами
                if (frameNum < 2) frameNum += 1;
                dogGoX += 10;
                dogGoY -= 10;
                if (frameCounter > 30) {
                    // прыгнула
                    dog.jump = false;
                    dog.scaredDucks = true;
                    frameNum = 0;
                    frameString = 0;
                    dogGoX = 0;
                    dogGoY = 410;
                    frameCounter = 0;
                }
            }
        }
    }
    if (dog.findOneDuck) {
        clearInterval(time.moveIntervalId);
        progress.bullet = 0;
        if (frameCounter === 0) showCurrentStatistic(progress);
        time.frameTime = 40;
        time.moveIntervalId = setInterval(() => gameProcess(/* level */), time.frameTime);
        frameString = 0;
        frameNum = 5;
        if (frameCounter < 40) {
            if (frameCounter === 2) {
                AudioProcessor.reset("dogShowsDucks");
                AudioProcessor.play("dogShowsDucks");
            }
            if (frameCounter === 38) {
                AudioProcessor.pause("dogShowsDucks");
            }
            ctx.drawImage(dogImg, 559 * frameNum, 402 * frameString, 520, 402, dogIngrassX, dogInGrassY, 220, 190);
        }
        if (frameCounter < 12) {
            dogInGrassY -= 3;
        } else {
            dogInGrassY += 2;
        }
        frameCounter += 1;
        if (frameCounter === 80) {
            AudioProcessor.reset("bark");
            AudioProcessor.play("bark");
        }
        if (frameCounter === 90) {
            AudioProcessor.reset("bark");
            AudioProcessor.play("bark");
        }
        if (frameCounter === 120) {
            dog.findOneDuck = false;
            dogIngrassX = 290;
            dogInGrassY = 370;
            frameCounter = 0;
            frameString = 0;
            frameNum = 0;
            progress.bullet = 4;
            showCurrentStatistic(progress);
            dog.scaredDucks = true;
        }
    }
    if (dog.findTwoDucks) {
        clearInterval(time.moveIntervalId);
        progress.bullet = 0;
        if (frameCounter === 0) showCurrentStatistic(progress);
        time.frameTime = 30;
        time.moveIntervalId = setInterval(() => gameProcess(/* level */), time.frameTime);
        frameString = 1;
        frameNum = 5;
        if (frameCounter < 48) {
            if (frameCounter === 7) {
                AudioProcessor.reset("dogShowsDucks");
                AudioProcessor.play("dogShowsDucks");
            }
            if (frameCounter === 48) {
                AudioProcessor.pause("dogShowsDucks");
            }
            ctx.drawImage(dogImg, 540 * frameNum, 430 * frameString, 600, 590, dogIngrassX, dogInGrassY - 10, 250, 240);
        }
        if (frameCounter < 19) {
            dogInGrassY -= 3;
        } else {
            dogInGrassY += 2;
        }
        frameCounter += 1;
        if (frameCounter === 90) {
            AudioProcessor.reset("bark");
            AudioProcessor.play("bark");
        }
        if (frameCounter === 105) {
            AudioProcessor.reset("bark");
            AudioProcessor.play("bark");
        }
        if (frameCounter === 118) {
            dog.findTwoDucks = false;
            dogIngrassX = 290;
            dogInGrassY = 370;
            frameCounter = 0;
            frameString = 0;
            frameNum = 0;
            progress.bullet = 4;
            showCurrentStatistic(progress);
            dog.scaredDucks = true;
        }
    }
    if (dog.laught) {
        clearInterval(time.moveIntervalId);
        progress.bullet = 0;
        if (frameCounterLaught === 0) showCurrentStatistic(progress);
        time.frameTime = 100;
        time.moveIntervalId = setInterval(() => gameProcess(/* level */), time.frameTime);
        frameString = 1;
        if (frameCounterLaught < 20) {
            if (frameCounterLaught === 1) {
                AudioProcessor.reset("dogLaughs");
                AudioProcessor.play("dogLaughs");
            }
            ctx.drawImage(
                dogImg,
                540 * frameNumLaught,
                430 * frameString,
                500,
                590,
                dogIngrassX,
                dogInGrassY - 50,
                220,
                230
            );
            if (frameCounterLaught < 15) {
                dogInGrassY === 370 ? (dogInGrassY += 10) : (dogInGrassY = 370);
            } else {
                dogInGrassY += 10;
            }
        }
        frameNumLaught === 3 ? (frameNumLaught = 4) : (frameNumLaught = 3);
        frameCounterLaught += 1;
        if (frameCounterLaught === 21) {
            AudioProcessor.pause("dogLaughs");
        }
        if (frameCounterLaught === 30) {
            AudioProcessor.reset("bark");
            AudioProcessor.play("bark");
        }
        if (frameCounterLaught === 38) {
            AudioProcessor.reset("bark");
            AudioProcessor.play("bark");
        }
        if (frameCounterLaught === 50) {
            dog.laught = false;
            dogInGrassY = 370;
            frameString = 0;
            frameCounterLaught = 0;
            progress.bullet = 4;
            showCurrentStatistic(progress);
            dog.scaredDucks = true;
        }
    }
}
