import '../styles/home.css';
import Tab from './tab';

export const home = new Tab('Home', 'home');
home.isCurrent = true;
const homeContent = document.createElement('div');
homeContent.appendChild(
	createCard(
		'Iconific',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita numquam rem, enim fuga et consequatur recusandae omnis blanditiis facilis voluptatum corporis impedit maxime excepturi repudiandae voluptatibus quos dignissimos cumque quia.m20'
	)
);
homeContent.appendChild(
	createCard(
		'SVGlitious',
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime corrupti dolores officia adipisci. Quia, nam!'
	)
);
homeContent.appendChild(
	createCard(
		'Glassy delivery',
		'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.'
	)
);

const test = document.createElement('div');
test.appendChild(homeContent);

home.setContent(homeContent);

function createCard(cardTitle, cardText) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `<div class="card-title">${cardTitle}</div>
  <div class="card-content">${cardText}</div>`;
	return card;
}
