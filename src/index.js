import Iconify from '@iconify/iconify';
import createContent from './homePage';
import './style.css';

const contentContainer = document.querySelector('.content');
console.log(contentContainer);
createContent(contentContainer);

const backgroundContainer = document.createElement('div');
backgroundContainer.classList.add('background-container');
let iconNameList = [
	'mdi:baguette',
	'mdi:candycane',
	'mdi:cheese',
	'mdi:egg-fried',
	'mdi:food-drumstick-outline',
	'mdi:food-apple',
	'mdi:hamburger',
	'mdi:sausage',
	'mdi:popcorn',
];

iconNameList.forEach((icon) => {
	let iconElement = document.createElement('span');
	iconElement.classList.add('iconify-inline');
	iconElement.dataset.icon = icon;
	backgroundContainer.appendChild(iconElement);
});
document.querySelector('body').appendChild(backgroundContainer);
