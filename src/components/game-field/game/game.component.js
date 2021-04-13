import { gameTemplate } from "./game.template";
import { CANVAS_HEIGTH, CANVAS_WIDTH, lang, getLang } from "../../../core/index";
import { startGame } from "../game-duck-animation/game-duck-process";

export class Game {
    constructor() {
        this.game = `${lang[getLang()].game}`;
    }

    init(lvl) {
        const field = document.querySelector(".game-field-main");
        field.insertAdjacentHTML("beforeend", gameTemplate(CANVAS_WIDTH, CANVAS_HEIGTH));
        const canvas = document.querySelector(".game-canvas");
        const ctx = canvas.getContext("2d");
        startGame(ctx, lvl);
    }
}
