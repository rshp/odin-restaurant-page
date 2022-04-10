import '../styles/background.css';
export const generateBackround = (() => {
	const HORIZONTAL_ICON_NUM = 30;
	const VERTICAL_ICON_NUM = 20;
	const COLOR_CLEAR_TIMEOUT = 5000;
	const COLOR_CLEAR_VARIATION = 3000;

	let horizontalIconNum, verticalIconNum, numerOfIcons;
	setIconsNum();
	const iconSrc = importAllSVGs(
		require.context('../assets', false, /\.svg$/)
	);

	const uniqueIconList = createUniqueIconsList(iconSrc);

	function createUniqueIconsList(iconSrc) {
		const iconList = [];
		Array.from(iconSrc).forEach((source) => {
			let icon = document.createElement('img');
			icon.classList.add('background-icon');
			icon.setAttribute('draggable', false);
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
		addEL(container);
		return container;
	}

	function setIconsNum(horizontalIconNum, verticalIconNum) {
		horizontalIconNum = horizontalIconNum || HORIZONTAL_ICON_NUM;
		verticalIconNum = verticalIconNum || VERTICAL_ICON_NUM;
		numerOfIcons = horizontalIconNum * verticalIconNum;
	}
	function importAllSVGs(r) {
		return r.keys().map(r);
	}

	function addEL(container) {
		Array.from(container.children).forEach((element) => {
			element.addEventListener('mouseover', styleRandomColor);
		});
	}

	function styleRandomColor(e) {
		const colorsList = [
			[
				'red',
				'invert(12%) sepia(75%) saturate(7066%) hue-rotate(0deg)	brightness(109%) contrast(118%)',
			],
			[
				'#fcb103',
				'invert(81%) sepia(62%) saturate(4567%) hue-rotate(3deg) brightness(108%) contrast(98%)',
			],
			[
				'#adfc03',
				'invert(77%) sepia(85%) saturate(1172%) hue-rotate(26deg) brightness(108%) contrast(98%)',
			],
			[
				'#24fc03',
				'invert(54%) sepia(90%) saturate(472%) hue-rotate(65deg) brightness(108%) contrast(123%)',
			],
			[
				'#03fcce',
				'invert(99%) sepia(99%) saturate(7492%) hue-rotate(88deg) brightness(100%) contrast(98%)',
			],
			[
				'#0384fc',
				'invert(33%) sepia(36%) saturate(5536%) hue-rotate(197deg) brightness(106%) contrast(98%)',
			],
			[
				'#6b03fc',
				'invert(21%) sepia(100%) saturate(7084%) hue-rotate(267deg) brightness(89%) contrast(125%)',
			],
		];
		let randomColor =
			colorsList[Math.floor(Math.random() * colorsList.length)];
		e.target.style.cssText = `filter: ${randomColor[1]} drop-shadow(0px 0px 20px ${randomColor[0]}); transition: all 0.5s ease-out;`;
		setTimeout(() => {
			e.target.style.cssText =
				'filter: invert(80%) sepia(1%) saturate(0%) hue-rotate(38deg) brightness(104%) contrast(97%) drop-shadow(0px 0px 10px transparent); transition: all 0.5s ease-out;';
		}, Math.random() * COLOR_CLEAR_VARIATION + COLOR_CLEAR_TIMEOUT);
	}

	return { createBackgroundContainer, setIconsNum };
})();
