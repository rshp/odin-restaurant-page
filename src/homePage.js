export default function createContent(container) {
	const logo = document.createElement('img');
	logo.classList.add('logo');
	logo.src = 'https://source.unsplash.com/1600x300/?food';
	container.appendChild(logo);

	const headline = document.createElement('h1');
	headline.classList.add('headline');
	headline.textContent =
		'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex iste!';
	container.appendChild(headline);

	const descr = document.createElement('p');
	descr.classList.add('description');
	descr.textContent =
		'Lorem ipsum dolor sit amet consectetur, adipisicing elit.  Nostrum maxime numquam nobis quae sed amet vitae tenetur   provident iste repudiandae.';
	container.appendChild(descr);
}
