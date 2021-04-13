// import { Body } from "node-fetch";
import { autoLogin, loginTemplate } from "./login.template";
import { validateEmail, lang, getLang } from "../../core/index";
import { API_BASE_URL_PROD, API_BASE_URL_DEV, CURRENT_API } from "../../core/constants";

const axios = require("axios");

const apiUrl = CURRENT_API === "dev" ? API_BASE_URL_DEV : API_BASE_URL_PROD;

export class Login {
    constructor() {
        this.lang = getLang();
    }

    init() {
        const main = document.querySelector(".game-menu");
        main.insertAdjacentHTML("afterbegin", loginTemplate(getLang()));

        let email = null;
        if (localStorage.getItem("email") && localStorage.getItem("token")) {
            email = localStorage.getItem("email");
            const tokenDate = new Date(JSON.parse(localStorage.getItem("tokenCreate")));
            const now = new Date();
            const expire = (now - tokenDate) / (60 * 60 * 1000);
            if (expire < 9.9) {
                document.querySelector(".login-wrapper").insertAdjacentHTML("afterbegin", autoLogin(getLang(), email));
                document.querySelector(".login-as").addEventListener("click", this.loginASEventHandler);
            }
        }

        document.querySelector(".login").addEventListener("click", this.loginEventHandler.bind(this)); 
        document.querySelector(".signup").addEventListener("click", this.signUpEventHandler.bind(this)); 
        document.querySelector(".login-without").addEventListener("click", this.withoutEventHandler);
    }

    async loginEventHandler() {

        const email = document.querySelector(".login-email");
        const password = document.querySelector(".login-password");
        const isEmail = validateEmail(email.value);
        const loginEvent = new CustomEvent("login", {
            detail: { data: undefined },
            bubbles: true,
            cancelable: true
        });

        if (isEmail) {
            const user = {
                email: email.value,
                password: password.value
            };
            try {
                const response = await axios.post(`${apiUrl}/api/auth/login`, user);
                console.log(response);
                if (response.statusText !== "OK") {
                    throw new Error(response) || lang[getLang()].SomethingWentWrongTryAgain;
                } else {
                    const now = new Date();
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("id", response.data.userId);
                    localStorage.setItem("email", user.email);
                    localStorage.setItem("tokenCreate", JSON.stringify(now));

                    loginEvent.detail.data = true;
                    document.dispatchEvent(loginEvent);
                }
            } catch (e) {
                const message = document.querySelector(".login-message");
                message.innerText = "";
                message.style.color = "brown";
                console.log(e.response.data.message);
                if (e.response) {
                    message.innerText = lang[getLang()][e.response.data.message];
                } else if (e.request) {
                    message.innerText = lang[getLang()].serverError; // 'Server access error'
                } else {
                    message.innerText = lang[getLang()].unknowError; // 'Unknow Error'
                }
            }
        } else {
            const message = document.querySelector(".login-message");
            message.innerText = "";
            message.style.color = "brown";
            message.innerText = lang[getLang()].invalidEmail;
        }
    }

    async signUpEventHandler() {
        const email = document.querySelector(".login-email");
        const password = document.querySelector(".login-password");
        const isEmail = validateEmail(email.value);

        if (isEmail) {
            const user = {
                email: email.value,
                password: password.value
            };
            try {
                const response = await axios.post(`${apiUrl}/api/auth/register`, user);
                if (response.statusText !== "Created") {
                    console.log(response);
                    throw new Error(response) || lang[getLang()].SomethingWentWrongTryAgain;
                } else {
                    const message = document.querySelector(".login-message");
                    message.style.color = "green";
                    message.innerText = lang[getLang()][response.data.message];
                    console.log(response);
                    await this.loginEventHandler();
                }
            } catch (e) {
                const message = document.querySelector(".login-message");
                message.innerText = "";
                message.style.color = "brown";
                if (e.response) {
                    message.innerText = lang[getLang()][e.response.data.message];
                } else if (e.request) {
                    message.innerText = lang[getLang()].serverError; // 'Server access error'
                } else {
                    message.innerText = lang[getLang()].unknowError; // 'Unknow Error'
                }
                console.log("registration error");
            }
        } else {
            const message = document.querySelector(".login-message");
            message.innerText = "";
            message.style.color = "brown";
            message.innerText = lang[getLang()].invalidEmail;
        }
    }

    withoutEventHandler() {
        const loginEvent = new CustomEvent("login", {
            detail: { data: undefined },
            bubbles: true,
            cancelable: true
        });

        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        loginEvent.detail.data = false;
        document.dispatchEvent(loginEvent);
    }

    loginASEventHandler() {
        const loginEvent = new CustomEvent("login", {
            detail: { data: undefined },
            bubbles: true,
            cancelable: true
        });
        loginEvent.detail.data = true;
        document.dispatchEvent(loginEvent);
    }
}
