import "../../../../assets/css/general-style.scss";
import "./score.component.scss";
import { getLang } from "../../../../core/index";

export const scoreTemplate = (lang)=>`

<div class="score">
    <div class="bullet-box" id="bullet">
        <img src="../../../assets/img/bullet.png">
        <img src="../../../assets/img/bullet.png">
        <img src="../../../assets/img/bullet.png">
        <img src="../../../assets/img/bullet.png">
    </div>
    <div class="point-box" id="point">
    </div>
    <div class="total-box" id="total">0 <p>${lang[getLang()].lvl}1</p></div>
</div>
`;
