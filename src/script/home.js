import '../styles/home.css';
import Tab from './tab';

export const home = new Tab('Home', 'home');
home.isCurrent = true;
const homeContent = document.createDocumentFragment();
appendContentRow(
	'Iconific',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita numquam rem, enim fuga et consequatur recusandae omnis blanditiis facilis voluptatum corporis impedit maxime excepturi repudiandae voluptatibus quos dignissimos cumque quia.',
	homeContent
);
appendContentRow(
	'SVGlitious',
	'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime corrupti dolores officia adipisci. Quia, nam!',
	homeContent
);
appendContentRow(
	'Glassy delivery',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	homeContent
);

home.setContent(homeContent);

function appendContentRow(cardTitle, cardText, parentElement) {
	const fragment = document.createDocumentFragment();
	const cardTitleDiv = document.createElement('div');
	const cardTextDiv = document.createElement('div');
	cardTitleDiv.classList.add('card-title');
	cardTextDiv.classList.add('card-text');
	cardTitleDiv.textContent = `${cardTitle}`;
	cardTextDiv.textContent = `${cardText}`;
	fragment.appendChild(cardTitleDiv);
	fragment.appendChild(cardTextDiv);
	parentElement.appendChild(fragment);
}
