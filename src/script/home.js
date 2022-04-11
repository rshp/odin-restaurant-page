import '../styles/home.css';
import Tab from './tab';

export const home = new Tab('Home', 'home');
home.isCurrent = true;
const homeContent = 'Weeee its homeeeeeeeeeeeeeeeeeeeeeeee';
home.setContent(homeContent);
