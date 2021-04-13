import { API_BASE_URL_PROD, API_BASE_URL_DEV, CURRENT_API } from "../constants";

const axios = require("axios");

const apiUrl = CURRENT_API === "dev" ? API_BASE_URL_DEV : API_BASE_URL_PROD;

const getStatEvent = new CustomEvent("getStat", {
    detail: { data: undefined },
    bubbles: true,
    cancelable: true
});

const getScoreEvent = new CustomEvent("getScore", {
    detail: { data: undefined },
    bubbles: true,
    cancelable: true
});
export function statEventHandler(stat) {
    if (stat) {
        const token = localStorage.getItem("token");
        try {
            axios
                .post(`${apiUrl}/api/stat/save`, stat, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(
                    (response) => {
                        console.log(response);
                    },
                    (error) => {
                        console.log(error.response.data.message);
                    }
                );
        } catch {
            console.log("save error");
        }
    }
}

export async function getStatEventHandler() {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${apiUrl}/api/stat`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        localStorage.setItem("userStat", JSON.stringify(response.data));
        getStatEvent.detail.data = true;
        document.dispatchEvent(getStatEvent);
    } catch {
        localStorage.removeItem("userStat");
        getStatEvent.detail.data = false;
        document.dispatchEvent(getStatEvent);
        console.log("stat error");
    }
}

export async function getScoreEventHandler() {
    try {
        const response = await axios.get(`${apiUrl}/api/stat/all`);
        const scores = response.data;
        console.log(response);
        for (let i = 0; i < scores.length; i += 1) {
            // eslint-disable-next-line no-underscore-dangle
            delete scores[i]._id;
            if (scores[i].stats.length !== 0) {
                const maxScoreItem = scores[i].stats.reduce((acc, el) => (acc.score > el.score ? acc : el));
                scores[i].score = maxScoreItem.score;
            } else {
                scores[i].score = 0;
            }
        }
        localStorage.setItem("totalScores", JSON.stringify(scores));
        getScoreEvent.detail.data = true;
        document.dispatchEvent(getScoreEvent);
    } catch {
        console.log("score error");
        getScoreEvent.detail.data = false;
        document.dispatchEvent(getScoreEvent);
    }
}
