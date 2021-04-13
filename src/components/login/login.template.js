import "./login.component.scss";
import { lang } from "../../core/index";
import "../../assets/css/general-style.scss";

export const loginTemplate = (language) => {
    
    return `
	<div class = "login-wrapper">
		<input class = "login-email" autocomplete="off" placeholder="${lang[language].eMail}" type="email" name="email" required >
		<input class = "login-password" autocomplete="off" placeholder="${lang[language].password}" type="password" required >
		<span class ="login-password-length">${lang[language].passwordLength}</span>
		
		<div class = "login-buttons-wrapper">
			<button class = "login-button login game-btn">${lang[language].Login}</button>
			<button class = "login-button signup game-btn">${lang[language].signUp}</button>
		</div>
		<div class="login-message"></div>
		<div class= "login-without">${lang[language].continueWithoutRegistration}</div>
	</div>
`;
};

export const autoLogin = (language, email) => {
    return `
	<div class= "login-as">${lang[language].loginAs} ${email}</div>
`;
};
