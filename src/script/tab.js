export default class Tab {
	constructor(tabName) {
		this.tabTitle = document.createElement('div');
		this.tabTitle.classList.add('tab');
		this.tabTitle.id = '';
		this.tabTitle.textContent = tabName;
		this.content = null;
	}

	tabInit(tabBarContainer, contentContainer) {
		tabBarContainer.appendChild(this.tabTitle);
		this.addEL(contentContainer, tabBarContainer);
		if (this.isCurrent) contentContainer.appendChild(this.content);
	}

	isCurrent = false;

	addEL(contentContainer, tabBarContainer) {
		tabBarContainer.addEventListener('click', (e) => {
			if (e.target.id === this.tabTitle.id) {
				this.tabTitle.classList.add('tab-highlight');
				contentContainer.appendChild(this.content);
				this.isCurrent = true;
			} else {
				contentContainer.remove(this.content);
				this.tabTitle.classList.remove('tab-highlight');
				this.isCurrent = false;
			}
		});
	}
}
