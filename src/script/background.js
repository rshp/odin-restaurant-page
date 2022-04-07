import '../styles/background.css';
export const generateBackround = (() => {
	const HORIZONTAL_ICON_NUM = 30;
	const VERTICAL_ICON_NUM = 20;
	// let horizontalIconNum = HORIZONTAL_ICON_NUM,
	// 	verticalIconNum = VERTICAL_ICON_NUM;
	let horizontalIconNum, verticalIconNum, numerOfIcons;
	setIconsNum();
	const iconSrc = importAll(require.context('../assets', false, /\.svg$/));
	// let numerOfIcons = horizontalIconNum * verticalIconNum;

	const uniqueIconList = createUniqueIconsList(iconSrc);

	function createUniqueIconsList(iconSrc) {
		const iconList = [];
		Array.from(iconSrc).forEach((source) => {
			let icon = document.createElement('img');
			icon.classList.add('background-icon');
			icon.src = source;
			iconList.push(icon);
		});
		return iconList;
	}

	function createBackgroundContainer() {
		const container = document.createElement('div');
		container.classList.add('background-container');
		for (let i = 0; i < numerOfIcons; i++) {
			let randomIcon = Math.floor(Math.random() * uniqueIconList.length);
			container.appendChild(uniqueIconList[randomIcon].cloneNode());
		}
		return container;
	}
	function setIconsNum(horizontalIconNum, verticalIconNum) {
		horizontalIconNum = horizontalIconNum || HORIZONTAL_ICON_NUM;
		verticalIconNum = verticalIconNum || VERTICAL_ICON_NUM;
		numerOfIcons = horizontalIconNum * verticalIconNum;
	}
	function importAll(r) {
		return r.keys().map(r);
	}
	return { createBackgroundContainer, setIconsNum };
})();
