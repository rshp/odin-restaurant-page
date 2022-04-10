export default class Tab {
	constructor(tabName, id) {
		this.tabTitle = document.createElement('div');
		this.tabTitle.classList.add('tab');
		this.tabTitle.id = id;
		this.tabTitle.textContent = tabName;
		this.content = document.createElement('div');
		this.content.classList.add(`${id}tab-content`);
		this.isCurrent = false;
	}

	static tabBarContainer;
	static contentContainer;

	tabInit() {
		Tab.tabBarContainer.appendChild(this.tabTitle);
		this.#addEL();
		if (this.isCurrent) Tab.contentContainer.appendChild(this.content);
	}

	#addEL() {
		this.tabTitle.addEventListener('click', (e) => {
			if (e.target.id === this.tabTitle.id) {
				this.tabTitle.classList.add('tab-highlight');
				Tab.contentContainer.innerHTML = '';
				Tab.contentContainer.appendChild(this.content);
				this.isCurrent = true;
			} else {
				this.tabTitle.classList.remove('tab-highlight');
				this.isCurrent = false;
			}
		});
	}
}
