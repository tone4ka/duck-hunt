import { duckTemplate } from './duck.template';
import { aimTemplate } from './aim.template';
import { textTemplate } from './text.template';
import { bulletTemplate } from './bullet.template';
import { loadingBtnTemplate } from './loading.btn.template';
import { lang, getLang } from "../../core/index";

export class SvgAnimation {

  makeGood() {
    this.loadingBtn(document.body);
    this.bullet(document.querySelector('.animation-bullet'));
    setTimeout(() => this.duck(document.querySelector('.duck-aim')), 1900);
    setTimeout(() => this.aim(document.querySelector('.duck-aim')), 1900);
    setTimeout(() => {
      this.getButton().classList.add('end-loading');
      this.getButton().innerText = `${lang[getLang()].ducksAreDetected}`
    }, 3500);

  }

  bullet(tag) {
    tag.insertAdjacentHTML("afterBegin", bulletTemplate());
  }

  loadingBtn(tag) {
    tag.insertAdjacentHTML("afterBegin", loadingBtnTemplate(getLang()));
  }

  duck(tag) {
    tag.insertAdjacentHTML("afterBegin", duckTemplate());
  }

  aim(tag) {
    tag.insertAdjacentHTML("afterBegin", aimTemplate());
  }

  text(tag) {
    tag.insertAdjacentHTML("afterBegin", textTemplate());
  }

  getButton() {
    return document.querySelector('#svg-button');
  }

  removeAll() {
    const svgContainer = document.querySelector('.svg-animation-container');
    if (svgContainer) {
      svgContainer.remove();
    }
  }
}