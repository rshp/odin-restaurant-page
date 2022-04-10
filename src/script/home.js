import '../styles/home.css';
import Tab from './tab';

export const home = new Tab('Home');
home.tabTitle.id = 'home';
home.content = document.createElement('div');
home.content.classList.add('hometab-content');
home.content.innerHTML = 'Weeee its homeeeeeeeeeeeeeeeeeeeeeeee';
