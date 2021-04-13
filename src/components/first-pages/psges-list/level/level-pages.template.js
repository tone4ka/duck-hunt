import "../../../../assets/css/general-style.scss";
import "./level-pages.component.scss";
import { getLang } from "../../../../core/index";

export const levelPagesTemplate = (lang)=>`
<div class="level-wrap">
    <ul>
        <li class="game-btn level-btn" value="1">${lang[getLang()].level} 1</li>
        <li class="game-btn level-btn" value="2">${lang[getLang()].level} 2</li>
        <li class="game-btn level-btn" value="3">${lang[getLang()].level} 3</li>
        <li class="game-btn level-btn" value="4">${lang[getLang()].level} 4</li>
        <li class="game-btn level-btn" value="5">${lang[getLang()].level} 5</li>
        <li class="game-btn level-btn" value="6">${lang[getLang()].level} 6</li>
        <li class="game-btn level-btn" value="7">${lang[getLang()].level} 7</li>
        <li class="game-btn level-btn" value="8">${lang[getLang()].level} 8</li>
        <li class="game-btn level-btn" value="9">${lang[getLang()].level} 9</li>
        <li class="game-btn level-btn" value="10">${lang[getLang()].level} 10</li>
        <li class="game-btn level-btn" id="level-back">${lang[getLang()].back}</li>
    </ul>
</div>
`;