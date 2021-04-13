// потом удалить
import {
    statisticPagesTemplate,
    statisticsTemplate,
    statisticTableHeader,
    scoreTableHeader,
    statisticSwicher,
    scoreTemplate
} from "./statistic-pages.template";
import { getLang, getStatEventHandler, lang, getScoreEventHandler } from "../../../../core/index";

export class Statistics {
    constructor() {
        this.lang = getLang();
    }

    init() {
        const main = document.querySelector(".game-menu");

        main.insertAdjacentHTML("afterbegin", statisticPagesTemplate(this.lang));
        const statWrapper = document.querySelector(".statistic-table-wrapper");
        statWrapper.insertAdjacentHTML("afterbegin", statisticSwicher(this.lang));
        const tabs = document.querySelectorAll(".stat-tab");
        [...tabs].forEach((el) => {
            el.classList.add("disabled");
        });
        getStatEventHandler();

        document.querySelector(".stat-user").addEventListener("click", (e) => {
            document.querySelector(".stat-table").remove();
            this.setUserTable(statWrapper);
            [...tabs].forEach((el) => el.classList.remove("selected"));
            e.target.classList.add("selected");
        });
        document.querySelector(".stat-total").addEventListener("click", (e) => {
            document.querySelector(".stat-table").remove();
            getScoreEventHandler();

            this.setScoreTable(statWrapper);
            [...tabs].forEach((el) => {
                el.classList.remove("selected");
                el.classList.add("disabled");
            });
            e.target.classList.add("selected");
        });

        document.addEventListener("getStat", () => {
            [...tabs].forEach((el) => {
                el.classList.remove("disabled");
            });
            this.setUserTable(statWrapper);
        });
        document.addEventListener("getScore", () => {
            const statTable = document.querySelector(".stat-table");
            if (statTable) statTable.remove();
            [...tabs].forEach((el) => {
                el.classList.remove("disabled");
            });
            this.setScoreTable(statWrapper);
        });
    }

    getStat(key, template) {
        const statArray = JSON.parse(localStorage.getItem(key)) || [];
        const statTableBody = document.querySelector(".stat-table-body");
        if (statTableBody) {
            const sortedStatArr = statArray.sort((a, b) => b.score - a.score);
            const items = document.querySelectorAll(".stat-table-item");
            if (items) items.forEach((e) => e.remove());
            let numberOfResult = null;
            if (sortedStatArr.length < 10) {
                numberOfResult = sortedStatArr.length;
            } else numberOfResult = 10;
            for (let i = 0; i < numberOfResult; i += 1) {
                statTableBody.insertAdjacentHTML("beforeend", template(sortedStatArr[i], i + 1));
            }
        }
    }

    setUserTable(item) {
        item.insertAdjacentHTML("beforeend", statisticTableHeader(this.lang));
        document.querySelector(".stat-message").innerText = "";
        if (localStorage.getItem("userStat")) {
            this.getStat("userStat", statisticsTemplate);
        } else {
            document.querySelector(".stat-message").innerText = `${lang[getLang()].NoAuthorization}`;
            this.getStat("currentUserStat", statisticsTemplate);
        }
    }

    setScoreTable(item) {
        item.insertAdjacentHTML("beforeend", scoreTableHeader(this.lang));
        document.querySelector(".stat-message").innerText = "";
        if (localStorage.getItem("totalScores")) {
            this.getStat("totalScores", scoreTemplate);
        } else {
            document.querySelector(".stat-message").innerText = `${lang[getLang()].NoAuthorization}`;
        }
    }
}
