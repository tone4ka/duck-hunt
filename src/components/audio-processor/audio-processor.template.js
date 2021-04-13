import "./audio-processor.component.scss";
import bark from "../../assets/audio/bark.mp3";
import bonusRound from "../../assets/audio/bonus_round.mp3"
import breakTime from "../../assets/audio/break_time.mp3"
import clay from "../../assets/audio/clay_shooting.mp3"
import countingHits from "../../assets/audio/counting_hits.mp3"
import deadDuckFalls from "../../assets/audio/dead_duck_falls.mp3";
import dogLaughs from "../../assets/audio/dog_laughs.mp3";
import dogShowsDucks from "../../assets/audio/dog_shows_ducks.mp3";
import intro from "../../assets/audio/duck_hunt_intro.mp3";
import quack from "../../assets/audio/duck_quack.mp3";
import gameOver from "../../assets/audio/game_over.mp3";
import registration from "../../assets/audio/name_registration.mp3";
import perfect from "../../assets/audio/perfect.mp3";
import clear from "../../assets/audio/round_clear.mp3";
import shot from "../../assets/audio/shot.mp3";
import tittle from "../../assets/audio/tittle.mp3";
import fail from "../../assets/audio/you_failed.mp3";

export const audioProcessorTemplate = () => {
  return `

  <div class="all-sounds">
  <audio controls src=${bark} id="bark"></audio>
    <audio controls src=${bonusRound} id="bonus-round"></audio>
    <audio controls src=${breakTime} id="break-time"></audio>
    <audio controls src=${clay} id="clay"></audio>
    <audio controls src=${countingHits} id="counting-hits"></audio>
    <audio controls src=${deadDuckFalls} id="dead-duck-falls"></audio>
    <audio controls src=${dogLaughs} id="dog-laughs"></audio>
    <audio controls src=${dogShowsDucks} id="dog-shows-ducks"></audio>
    <audio controls src=${intro} id="duck-hunt-intro"></audio>
    <audio controls src=${quack} id="duck-quack"></audio>
    <audio controls src=${gameOver} id="game-over"></audio>
    <audio controls src=${registration} id="name-registration"></audio>
    <audio controls src=${perfect} id="perfect"></audio>
    <audio controls src=${clear} id="round-clear"></audio>
    <audio controls src=${shot} id="shot"></audio>
    <audio controls src=${tittle} id="tittle"></audio>
    <audio controls src=${fail} id="you-failed"></audio>
  </div>
  
  `;
};
