import '../styles/menu.css';
import Tab from './tab';

export const menu = new Tab('Menu', 'menu');
const menuContent = document.createDocumentFragment();
appendMenuRow(
	'baguette',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita numquam rem, enim fuga et consequatur recusandae omnis blanditiis facilis voluptatum corporis impedit maxime excepturi repudiandae voluptatibus quos dignissimos cumque quia.',
	menuContent
);
appendMenuRow(
	'beer',
	'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime corrupti dolores officia adipisci. Quia, nam!',
	menuContent
);
appendMenuRow(
	'cheese',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	menuContent
);

appendMenuRow(
	'sausage',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	menuContent
);

appendMenuRow(
	'pretzel',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto quibusdam fugit ipsa, beatae incidunt mollitia eum assumenda quod ipsam maxime asperiores in labore veniam harum corporis impedit? Eligendi, officiis.',
	menuContent
);

appendMenuRow(
	'muffin',
	'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo dolorum, dicta laudantium quam repellendus facere? Sed laboriosam quia, ab ullam incidunt eaque dolores vel dolor quod iste excepturi blanditiis quas quos culpa aliquid corrupti id optio. Quas nihil fuga ea!',
	menuContent
);

appendMenuRow(
	'corn',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, dolor.',
	menuContent
);

appendMenuRow(
	'cookie',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	menuContent
);

appendMenuRow(
	'candycane',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam voluptatum provident quisquam dolore alias corrupti expedita ab rerum ea.',
	menuContent
);

appendMenuRow(
	'hamburger',
	'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora labore nostrum nemo eveniet! Architecto nobis fuga harum, ratione sed labore, est doloribus reprehenderit eum autem minima ipsa similique alias adipisci vitae itaque? Earum nulla, nihil error alias maiores eligendi harum.',
	menuContent
);

menu.setContent(menuContent);

function appendMenuRow(SVGFilename, menuText, parentElement) {
	const fragment = document.createDocumentFragment();
	const menuImg = document.createElement('img');
	const menuTextDiv = document.createElement('div');
	menuImg.classList.add('menu-img');
	menuTextDiv.classList.add('menu-text');
	import(`../assets/${SVGFilename}.svg`).then((path) => {
		menuImg.src = `${path.default}`;
	});
	menuTextDiv.textContent = `${menuText}`;
	fragment.appendChild(menuImg);
	fragment.appendChild(menuTextDiv);
	parentElement.appendChild(fragment);
}
