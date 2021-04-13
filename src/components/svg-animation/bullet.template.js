import "./svg-animation.component.scss";

export const bulletTemplate = () => {
  return `

  <div id="bullet-container">
    <div class="bullet-empty"></div>
    <div class="bullet">
      <div class="ink-canvas"></div>
    </div>
  </div>

  `;
}
