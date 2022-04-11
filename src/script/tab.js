export default class Tab {
	constructor(tabName, id) {
		this.tabTitleDiv = document.createElement('div');
		this.tabTitleDiv.classList.add('tab');
		this.tabTitleDiv.id = id;
		this.tabTitleDiv.textContent = tabName;
		this.contentDiv = document.createElement('div');
		this.contentDiv.classList.add(`${id}tab-content`);
		this.isCurrent = false;
	}

	static tabBarContainer;
	static contentContainer;

	tabInit() {
		Tab.tabBarContainer.appendChild(this.tabTitleDiv);
		this.#tabSwitchEL();
		if (this.isCurrent) Tab.contentContainer.appendChild(this.contentDiv);
	}

	setContent(content) {
		this.contentDiv.innerHTML = '';
		this.contentDiv.innerHTML = content;
	}

	#tabSwitchEL() {
		Tab.tabBarContainer.addEventListener('click', (e) => {
			if (!e.target.classList.contains('tab')) {
				console.log('clicked on empty space');
				return;
			}
			if (e.target.id === this.tabTitleDiv.id) {
				this.tabTitleDiv.classList.add('tab-highlight');
				Tab.contentContainer.innerHTML = '';
				Tab.contentContainer.appendChild(this.contentDiv);
				this.isCurrent = true;
			} else {
				this.tabTitleDiv.classList.remove('tab-highlight');
				this.isCurrent = false;
			}
		});
	}
}
