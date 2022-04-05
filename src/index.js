import Iconify from '@iconify/iconify';
import createContent from './homePage';
import './style.css';

const contentContainer = document.querySelector('.content');
console.log(contentContainer);
createContent(contentContainer);
