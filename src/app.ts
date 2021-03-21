const grid = [
	11, 12, 13, 14, 15,
	21, 22, 23, 24, 25,
	31, 32, 33, 34, 35,
	41, 42, 43, 44, 45,
	51, 52, 53, 54, 55,
];

function createElement(type: string, classes: string[]): HTMLElement {
	const element = document.createElement(type.toUpperCase());
	classes.forEach((c) => element.classList.add(c));
	return element;
}

function hover(event: any) {
	const x = event.clientX;
	const y = event.clientY;
	document.getElementById('output')!
			.innerText = `x: ${x}, y: ${y}`;
}

function addArrows(carElement: HTMLElement) {
	if (!carElement.classList.contains('player-focus')) {
		carElement.classList.add('player-focus');
		const arrowContainerTop = createElement('DIV', ['arrow-container', 'top']);
		const arrowContainerCenter = createElement('DIV', ['arrow-container', 'center']);
		const arrowContainerBottom = createElement('DIV', ['arrow-container', 'bottom']);
		const up = createElement('DIV', ['arrow-up']);
		const down = createElement('DIV', ['arrow-down']);
		const left = createElement('DIV', ['arrow-left']);
		const right = createElement('DIV', ['arrow-right']);
		arrowContainerTop.appendChild(up);
		arrowContainerCenter.appendChild(left);
		arrowContainerCenter.appendChild(right);
		arrowContainerBottom.appendChild(down);
		carElement.appendChild(arrowContainerTop);
		carElement.appendChild(arrowContainerCenter);
		carElement.appendChild(arrowContainerBottom);
	}
}

function removeArrows(carElement: HTMLElement) {
	if (carElement.classList.contains('player-focus')) {
		Array.from(document.getElementsByClassName('arrow-container'))
			 .forEach((container) => {
				 carElement.removeChild(container);
			 });
		carElement.classList.remove('player-focus');
	}
}

export default function start() {
	console.log('Lets build an app!');
	console.log(grid);
	document.querySelectorAll('.car')
			.forEach((carElement) => {
				carElement.addEventListener('mousemove', (event) => hover(event));
				carElement.addEventListener('mouseover', () => addArrows(carElement as HTMLElement));
				carElement.addEventListener('mouseleave', () => removeArrows(carElement as HTMLElement));
			});
}

start();
