import '../styles/menu.css';
import Tab from './tab';

export const menu = new Tab('Menu');
menu.tabTitle.id = 'menu';
menu.content = document.createElement('div');
menu.content.classList.add('menutab-content');
menu.content.innerHTML = 'Weeee its Menuuu! Fooooood omg Fuuuuuud!!!!!!!';
