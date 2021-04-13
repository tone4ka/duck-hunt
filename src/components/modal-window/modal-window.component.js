/* eslint-disable no-param-reassign */
import { modalWindowTemplate } from "./modal-window.template";
import { getLang } from "../../core/index";
import AudioProcessor from "../audio-processor/audio-processor.component";

export class ModalWindow {
  constructor(name) {
    this.windowName = name;
  }

  theme(){
    if (localStorage.getItem("theme") === null) {
      document.querySelectorAll(".modal-list").forEach(elem => {
        elem.setAttribute("style", "none");
    })} else if (`${localStorage.getItem("theme")}` === "0") {
      document.querySelectorAll(".modal-list").forEach(elem => {
        elem.setAttribute("style", "none");
    })} else if (`${localStorage.getItem("theme")}` === "1") {
      document.querySelectorAll(".modal-list").forEach(elem => {
        elem.setAttribute("style", "none");
        elem.style.backgroundImage = "none";
        elem.style.backgroundColor = "#FAF0E6";
        elem.style.color = "#2e0d67";
    })} else if (`${localStorage.getItem("theme")}` === "2") {
      document.querySelectorAll(".modal-list").forEach(elem => {
      elem.setAttribute("style", "none");
    })} else if (`${localStorage.getItem("theme")}` === "3") {
      document.querySelectorAll(".modal-list").forEach(elem => {
        elem.setAttribute("style", "none");
        elem.style.backgroundImage = "none";
        elem.style.backgroundColor = "#1C1C1C";
        elem.style.color = "#fff";
    })
    }
  }

  createWindow() {
    document.querySelector('.wrapper').insertAdjacentHTML("afterBegin", modalWindowTemplate(this.windowName, getLang()));

    const coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';
    if (!document.querySelector('#cover-div')) {
      document.body.querySelector('.wrapper').append(coverDiv);
    }

    document.querySelector('#to-main').addEventListener('click', () => {
      document.body.style.overflowY = '';
      document.querySelector('.modal-game-over-hidden').style.display = 'none';
      document.querySelector('.modal-perfect-hidden').style.display = 'none';
      document.querySelector('#cover-div').style.display = 'none';
      AudioProcessor.pause('gameOver');
      AudioProcessor.reset('gameOver');
      AudioProcessor.pause('dogLaughs');
      AudioProcessor.reset('dogLaughs');
      AudioProcessor.pause('perfect');
      AudioProcessor.reset('perfect');
    });
  }

  showWindow() {
    document.body.style.overflowY = 'hidden';
    if (this.windowName === 'game-over') {
      this.theme();
      document.querySelector('.modal-game-over-hidden').style.display = 'block';
      document.querySelector('#cover-div').style.display = 'block';
      AudioProcessor.play('gameOver');
    }

    if (this.windowName === 'perfect') {
      this.theme();
      document.querySelector('.modal-perfect-hidden').style.display = 'block';
      document.querySelector('#cover-div').style.display = 'block';
      AudioProcessor.play('perfect');
      
    }

  }
}

/*
import { ModalWindow } from "./components/index";
new ModalWindow('perfect').showWindow();    param: 'game-over' or 'perfect'
*/
