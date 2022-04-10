import '../styles/home.css';
import Tab from './tab';

export const home = new Tab('Home', 'home');
home.isCurrent = true;
home.content.innerHTML = 'Weeee its homeeeeeeeeeeeeeeeeeeeeeeee';
