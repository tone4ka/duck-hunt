import "../../assets/css/nullstyle.scss";
import "./first-pages.component.scss";
import { getLang } from "../../core/index";

export const firstPagesTemplate = (lang) => `
<div class="wrapper">

<!-- header -->
    <div class="header">
    <div class="content">
        
        <h1>Duck Hunt</h1>
        <div class="pages">${lang[getLang()].gameMenu}</div>
        
        <div class="pause-btn">
        <div class="user">
            <img class="user-img" src="../../assets/img/troll.png">
        </div>
        </div>
    </div>
    </div>

<!-- main -->
    <div class="main">
    <div class="content">

    <div class="game-place"></div>
    <div class="game-menu"></div>

    </div>       
    </div> 

<!-- footer-->
    <div class="footer">
    <div class="content">

    <a class="logo-box" href = "https://rs.school/js/"><img class="rs-logo" src="../../assets/img/rs-school-js.svg" alt="rs-logo" /></a>

    <ul class="autor">
        <li><a class="autor-Name" href = "https://github.com/tone4ka"><img class="git-logo" src="../../assets/img/github.svg" alt="git-logo" />${
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
    </div>

</div>
`;
