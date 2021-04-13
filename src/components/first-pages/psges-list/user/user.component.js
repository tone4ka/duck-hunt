import { userTemplate, popUpTemplate, aloneTemplate } from "./user.template";
import { getLang } from "../../../../core/index";

export class User {
    constructor() {
        this.lang = getLang();
    }

    login(lang) {
        const user = document.querySelector(".user");
        document.querySelector(".user-img").remove();
        user.insertAdjacentHTML("beforeend", userTemplate);
        const email = localStorage.getItem("email");
        user.insertAdjacentHTML("beforeend", popUpTemplate(lang, email));
    }

    alone(lang) {
        const user = document.querySelector(".user");
        document.querySelector(".user-img").remove();
        user.insertAdjacentHTML("beforeend", aloneTemplate);
        user.insertAdjacentHTML("beforeend", popUpTemplate(lang, null));
    }
}
