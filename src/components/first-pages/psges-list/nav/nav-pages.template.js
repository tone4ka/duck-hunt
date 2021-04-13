import "../../../../assets/css/general-style.scss";
import "./nav-pages.component.scss";
import { getLang } from "../../../../core/index";

export const navPagesTemplate = (lang) => `
<div class="nav">
    <div class="start game-btn" id="start">${lang[getLang()].start}</div>
    <div class="level game-btn" id="level">${lang[getLang()].levels}</div>
    <div class="settings game-btn" id="settings">${lang[getLang()].settings}</div>
    <div class="statistic game-btn" id="statistic">${lang[getLang()].statistic}</div>
</div>
`;
