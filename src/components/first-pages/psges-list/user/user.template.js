import "./user.component.scss";
import { getLang } from "../../../../core/index";

export const userTemplate = ` <img class="user-img" src="../../assets/img/troll.png">`;
export const aloneTemplate = ` <img class="user-img" src="../../assets/img/alone.png">`;

export const popUpTemplate = (lang, email) => {
    if (email) {
        return `<div class="help help-logged">${lang[getLang()].hello} ${email}</div>`;
    }
    return `<div class="help help-alone">${lang[getLang()].foreverAlone}</div>`;
};
