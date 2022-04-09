import createContent from './homePage';
import { generateBackround } from './script/background';
import './style.css';

const contentContainer = document.querySelector('.content');
// createContent(contentContainer);
generateBackround.setIconsNum(20, 20);
const backgroundContainer = generateBackround.createBackgroundContainer();
const body = document.querySelector('body');
body.appendChild(backgroundContainer);
// const header = document.createElement('header');
// header.textContent = 'Icon restaurant';
// body.appendChild(header);
