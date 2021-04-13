import "../../../../assets/css/general-style.scss";
import "./backBtnHeader.component.scss";

export const backBtnHeader = (pause) => `
<div class="pause-btn-header game-btn">
    ${pause}
</div>
`;

export const continueBtn = (continuestr) => `
<div class="continue-btn game-btn">
    ${continuestr}
</div>
`;
