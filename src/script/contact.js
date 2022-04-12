import '../styles/contact.css';
import Tab from './tab';
import { appendImgText } from './appendImgText';

export const contact = new Tab('Contact', 'contact');

const contactContent = document.createDocumentFragment();

appendImgText(
	'vector-square',
	'MDI Icons @materialdesignicons.com',
	contactContent
);
appendImgText(
	'language-css3',
	'Glassmorphism generator @css.glass',
	contactContent
);
appendImgText('pizza', 'Lots of pizza', contactContent);

contact.setContent(contactContent);
