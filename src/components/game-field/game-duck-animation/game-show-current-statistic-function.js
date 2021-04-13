import { lang, getLang } from "../../../core/index";

export function showCurrentStatistic(currentProgress) {
    const bulletBox = document.getElementById("bullet");
    const ducsBox = document.getElementById("point");
    const score = document.getElementById("total");
    if (bulletBox) {
        bulletBox.innerHTML = "";
        for (let i = 0; i < currentProgress.bullet; i += 1) {
            bulletBox.insertAdjacentHTML("beforeend", '<img src="../../../assets/img/bullet.png"></img>');
        }
    }
    if (ducsBox) {
        ducsBox.innerHTML = "";
        for (let i = 0; i < currentProgress.shotDucks; i += 1) {
            ducsBox.insertAdjacentHTML(
                "beforeend",
                '<img class="img-duck-popadanie" src="../../../assets/img/utka_popad_big.png"></img>'
            );
        }
        for (let i = 0; i < currentProgress.goAwayducks; i += 1) {
            ducsBox.insertAdjacentHTML(
                "beforeend",
                '<img class="img-duck-conture" src="../../../assets/img/utka_kontur_little_little.png"></img>'
            );
        }
    }
    if (score) {
        score.innerHTML = currentProgress.score;
        score.insertAdjacentHTML("beforeend", `<p>${lang[getLang()].lvl}${currentProgress.level}</p>`);
    }
}

