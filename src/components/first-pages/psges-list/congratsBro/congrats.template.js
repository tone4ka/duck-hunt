import "../../../../assets/css/nullstyle.scss";
import "./congrats.component.scss";

export const congrats = (win,rest) => 
`
<div class="wrap-congrats">
    <div class = "win"><h2>${win}!</h2></div>
    <div class = "result"><h3>${rest}</h3></div>
    <div class = "meat"></div>
</div>
`
