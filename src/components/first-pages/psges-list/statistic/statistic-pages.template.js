import "../../../../assets/css/general-style.scss";
import "./statistic-pages.component.scss";

import { lang } from "../../../../core/config";

export const statisticPagesTemplate = ( language ) =>`
<div class="statistic-wrap">
	<div class = "statistic-table-wrapper"></div>
	<div class ="stat-message"></div>
    <div class="statistic-btn game-btn" id="statistic-back">${lang[language].back}</div>
</div>
`;

export const statisticSwicher = (language) => {
    return `
	<div class = "stat-switcher">
	<div class= "stat-user stat-tab selected">${lang[language].statisticsTable}</div>
	<div class = "stat-total stat-tab">${lang[language].totalScoreTable}</div>
	</div>
	`;
};

export const statisticTableHeader = (language) => {
    return `
<table border class="stat-table">
	<tbody class= "stat-table-body">
		<tr class = "stat-table-header" >
			<th>№</th>
			<th>${lang[language].time}</th>
			<th>${lang[language].ducks}</th>
			<th>${lang[language].hits}</th>
			<th>${lang[language].persent}</th>
			<th>${lang[language].score}</th>
		</tr>
	</tbody>
</table>
`;
};

export const statisticsTemplate = (userStat, number) => {
    const persent = Math.ceil((userStat.kills / userStat.ducks) * 100);
    const date = new Date(userStat.time);
    const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    };
    return `
		<tr class = "stat-table-item" ><td>${number}</td><td>${date.toLocaleString("ru-RU", options)}</td><td>${
        userStat.ducks
    }</td><td>${userStat.kills}</td><td>${persent}</td><td>${userStat.score}</td></tr>
`;
};

export const scoreTableHeader = (language) => {
    return `
<table border class="stat-table">
<tbody class= "stat-table-body">
	<tr class = "stat-table-header" >
		<th>№</th>
		<th>${lang[language].eMail}</th>
		<th>${lang[language].score}</th>
	</tr>
</tbody>
</table>
`;
};
export const scoreTemplate = (serverStat, number) => {
    return `
 <tr class = "stat-table-item" ><td>${number}</td><td>${serverStat.email}</td><td>${serverStat.score}</td></tr>
`;
};
