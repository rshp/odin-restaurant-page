import { generateBackround } from './script/background';
import './styles/style.css';
import { home } from './script/home';
import { menu } from './script/menu';
import { contact } from './script/contact';
import Tab from './script/tab';

generateBackround.setIconsNum(20, 20);
const backgroundContainer = generateBackround.createBackgroundContainer();
const body = document.querySelector('body');
body.appendChild(backgroundContainer);

const heroWrapper = document.createElement('div');
heroWrapper.classList.add('hero-wrapper');
const header = document.createElement('header');
const nav = document.createElement('nav');
heroWrapper.appendChild(header);
heroWrapper.appendChild(nav);
header.innerHTML =
	'<p class="title">Icon Restaurant</p><p class="title-low">Your iconic food source</p>';
const main = document.createElement('main');
main.classList.add('content');

body.appendChild(heroWrapper);
body.appendChild(main);

Tab.tabBarContainer = nav;
Tab.contentContainer = main;

home.tabInit();
menu.tabInit();
contact.tabInit();
