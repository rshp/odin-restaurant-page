import '../styles/menu.css';
import { appendImgText } from './appendImgText';
import Tab from './tab';

export const menu = new Tab('Menu', 'menu');
const menuContent = document.createDocumentFragment();
appendImgText(
	'baguette',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita numquam rem, enim fuga et consequatur recusandae omnis blanditiis facilis voluptatum corporis impedit maxime excepturi repudiandae voluptatibus quos dignissimos cumque quia.',
	menuContent
);
appendImgText(
	'beer',
	'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime corrupti dolores officia adipisci. Quia, nam!',
	menuContent
);
appendImgText(
	'cheese',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	menuContent
);

appendImgText(
	'sausage',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	menuContent
);

appendImgText(
	'pretzel',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto quibusdam fugit ipsa, beatae incidunt mollitia eum assumenda quod ipsam maxime asperiores in labore veniam harum corporis impedit? Eligendi, officiis.',
	menuContent
);

appendImgText(
	'muffin',
	'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo dolorum, dicta laudantium quam repellendus facere? Sed laboriosam quia, ab ullam incidunt eaque dolores vel dolor quod iste excepturi blanditiis quas quos culpa aliquid corrupti id optio. Quas nihil fuga ea!',
	menuContent
);

appendImgText(
	'corn',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, dolor.',
	menuContent
);

appendImgText(
	'cookie',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veritatis voluptatem laborum odit vero inventore aperiam deserunt delectus vel quidem.',
	menuContent
);

appendImgText(
	'candycane',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta laboriosam voluptatum provident quisquam dolore alias corrupti expedita ab rerum ea.',
	menuContent
);

appendImgText(
	'hamburger',
	'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora labore nostrum nemo eveniet! Architecto nobis fuga harum, ratione sed labore, est doloribus reprehenderit eum autem minima ipsa similique alias adipisci vitae itaque? Earum nulla, nihil error alias maiores eligendi harum.',
	menuContent
);

menu.setContent(menuContent);
