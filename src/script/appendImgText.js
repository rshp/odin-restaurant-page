export function appendImgText(SVGFilename, menuText, parentElement) {
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
