import "./svg-animation.component.scss";
import { lang, getLang } from '../../core/index';

export const loadingBtnTemplate = () => {
  return `
  
  <div class="svg-animation-container">
    <div class="duck-aim"></div>
    <div class="animation-bullet"></div>
    <div class="animation-button">
      <button type="button" id="svg-button"><span>${lang[getLang()].detecting}</span></button>
    </div>
  </div>

  `;
}
