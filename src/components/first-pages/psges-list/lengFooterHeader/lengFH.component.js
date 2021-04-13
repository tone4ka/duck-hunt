import { lang, getLang } from "../../../../core/index";

export function setFootHeadLang() {
    document.querySelector(".pages").innerHTML = `${lang[getLang()].settings}`;
    
    document.querySelector(".panner-container").innerHTML = `
    <span>${lang[getLang()].panLeft}</span>
    <input type="range" id="panner" min="-1" max="1" value="0" step="0.01" class="input-slider">
    <span>${lang[getLang()].panRight}</span>
    `;

    document.querySelector(".theme-wrapp").innerHTML = `
        <span class="title">${lang[getLang()].theme}</span>
        <span class="theme"><input type="radio" name="input_theme" value="0">${lang[getLang()].standart}</span>
        <span class="theme"><input type="radio" name="input_theme" value="1">${lang[getLang()].pencil}</span>
        <span class="theme"><input type="radio" name="input_theme" value="2">${lang[getLang()].vision}</span>
        <span class="theme"><input type="radio" name="input_theme" value="3">${lang[getLang()].night}</span>
    `
    document.getElementById("settings-back").innerHTML = `${lang[getLang()].back}`;

    document.querySelector(".footer").innerHTML = `
    <div class="content">

    <a class="logo-box" href = "https://rs.school/js/"><img class="rs-logo" src="../../assets/img/rs-school-js.svg" alt="rs-logo" /></a>

    <ul class="autor">
        <li><a class="autor-Name" href = https://github.com/tone4ka ><img class="git-logo" src="../../assets/img/github.svg" alt="git-logo" />${
            lang[getLang()].tonia
        }</a></li>
        <li><a class="autor-Name" href = "https://github.com/Mikulich-Fedor"><img class="git-logo" src="../../assets/img/github.svg" alt="git-logo" />${
            lang[getLang()].fedos
        }</a></li>
        <li><a class="autor-Name" href = "https://github.com/nimlu-bot"><img class="git-logo" src="../../assets/img/github.svg" alt="git-logo" />${
            lang[getLang()].sergey
        }</a></li>
        <li><a class="autor-Name" href = "https://github.com/andreykomov"><img class="git-logo" src="../../assets/img/github.svg" alt="git-logo" />${
            lang[getLang()].andrey
        }</a></li>
    </ul>
    <div class="year">2021</div>

    </div>
		`;
    if (document.querySelector(".help-logged")) {
        const email = localStorage.getItem("email");

        document.querySelector(".help").innerHTML = `${lang[getLang()].hello} ${email}`;
    }
    if (document.querySelector(".help-alone")) {
        document.querySelector(".help").innerHTML = `${lang[getLang()].foreverAlone}`;
    }
}
