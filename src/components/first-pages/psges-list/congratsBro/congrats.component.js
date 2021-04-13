import {congrats} from "./congrats.template";

import AudioProcessor from "../../../audio-processor/audio-processor.component";


export class CondratsBro {
    constructor() {
        this.title = "Condrats";
    }

    theme(){
        if (localStorage.getItem("theme") === null) {
            document.querySelector(" .wrap-congrats ").setAttribute("style", "none");
        } else if (`${localStorage.getItem("theme")}` === "0") {
            document.querySelector(".wrap-congrats").setAttribute("style", "none");
        } else if (`${localStorage.getItem("theme")}` === "1") {
            document.querySelector(".wrap-congrats").setAttribute("style", "none");
            document.querySelector(".wrap-congrats").style.backgroundImage = "none";
            document.querySelector(".wrap-congrats").style.backgroundColor = " rgb(250, 240, 230)"
        } else if (`${localStorage.getItem("theme")}` === "2") {
            document.querySelector(".wrap-congrats").setAttribute("style", "none");
        } else if (`${localStorage.getItem("theme")}` === "3") {
            document.querySelector(".wrap-congrats").setAttribute("style", "none");
            document.querySelector(".wrap-congrats").style.backgroundImage = "none";
            document.querySelector(".wrap-congrats").style.backgroundColor = "rgb(28, 28, 28)";
        }
    }

    init( win ,rest){
        AudioProcessor.reset('gameOver');
        setTimeout(()=>{
            AudioProcessor.play('gameOver');
        },1000)
            

        document.querySelector(".game-menu").insertAdjacentHTML("afterbegin", congrats(win,rest));
        this.theme();
        document.querySelector(".wrap-congrats").addEventListener("click", () => {
            AudioProcessor.pause('gameOver');
            document.querySelector(".wrap-congrats").remove();
        })
    }
}