import "./modal-window.component.scss";
import perfectDog from "../../assets/img/dog_perfect.png";
import gameOverDog from "../../assets/img/game_over_dog.png";
import { lang } from '../../core/index';


export const modalWindowTemplate = (name, language) => {
  const gameOverWindow = `
  <div id="modal-window" class="modal-list modal-game-over-hidden">
    <h2 class="modal-game-over-h2 modal-for-theme">${lang[language].badHuntDude}</h2>
    <img src=${gameOverDog} alt="dog" class="dog-origin">
    <button type="button" class="modal-list" id="to-main">${lang[language].close}</button>
  </div>
  `;

  const perfectWindow = `
  <div id="modal-window" class="modal-list  modal-perfect-hidden">
    <h2 class="modal-perfect-h2 modal-for-theme">${lang[language].awesomeHunter}</h2>
    <img src=${perfectDog} alt="dog" class="dog-origin">
    <button type="button" class="modal-list" id="to-main">${lang[language].close}</button>
  </div>
  `;

  if (name === 'game-over') {
    return gameOverWindow
  };
  
  if (name === 'perfect') {
    return perfectWindow
  };

  return '';
};
