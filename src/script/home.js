import '../styles/home.css';
import Tab from './tab';

export const home = new Tab('Home', 'home');
home.isCurrent = true;
const homeContent = document.createDocumentFragment();
createCard(
	'Iconific',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita numquam rem, enim fuga et consequatur recusandae omnis blanditiis facilis voluptatum corporis impedit maxime excepturi repudiandae voluptatibus quos dignissimos cumque quia.',
	homeContent
);
createCard(
	'SVGlitious',
	'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime corrupti dolores officia adipisci. Quia, nam!',
	homeContent
);
createCard(
	'Glassy delivery',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	homeContent
);

home.setContent(homeContent);

function createCard(cardTitle, cardText, parentElement) {
	const fragment = document.createDocumentFragment();
	const div1 = document.createElement('div');
	const div2 = document.createElement('div');
	div1.textContent = `${cardTitle}`;
	div2.textContent = `${cardText}`;
	fragment.appendChild(div1);
	fragment.appendChild(div2);
	parentElement.appendChild(fragment);
}
