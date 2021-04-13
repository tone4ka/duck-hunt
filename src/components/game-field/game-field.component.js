import { gameFieldTemplate } from "./game-field.template";
import { Game } from "./game/index";

export class GameField {
    constructor() {
        this.game = new Game();
    }

    init(lvl) {
        const list = document.querySelector(".game-place");
        list.style.zIndex = "15";
        list.insertAdjacentHTML("beforeend", gameFieldTemplate);
        this.game.init(lvl);
    }
}
