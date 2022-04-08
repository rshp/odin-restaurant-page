import createContent from './homePage';
import { generateBackround } from './script/background';
import './style.css';

const contentContainer = document.querySelector('.content');
// createContent(contentContainer);
generateBackround.setIconsNum(20, 20);
const backgroundContainer = generateBackround.createBackgroundContainer();
document.querySelector('body').appendChild(backgroundContainer);
