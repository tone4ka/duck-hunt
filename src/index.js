import { FirstPages } from "./components/index";
import { SvgAnimation } from "./components/svg-animation/index";
import { ModalWindow } from "./components/modal-window/index";
import AudioProcessor from "./components/audio-processor/audio-processor.component";
import { setLang } from "./core/config";

setLang(JSON.parse(localStorage.getItem("currentLang")) || "RU");

const firstPages = new FirstPages();

const svgAnimation = new SvgAnimation();
svgAnimation.makeGood();
svgAnimation.getButton().addEventListener("click", () => {
    svgAnimation.removeAll();
    AudioProcessor.init();
    firstPages.init();
    new ModalWindow("perfect").createWindow();
    new ModalWindow("game-over").createWindow();
});

document.body.addEventListener("reloadGameEvent", () => {
    document.querySelector(".game-place").innerHTML = "";
    document.querySelector(".pause-btn-header").remove();
    firstPages.nav();
});
