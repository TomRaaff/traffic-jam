import { GridItem } from './types/DataTypes';

const clickArrow = function (direction: 'up' | 'down' | 'left' | 'right') {
	return (event: Event) => {
		const gridId = (event.currentTarget as HTMLElement)?.parentNode?.parentElement?.id;
		console.log('clicked', direction, gridId);
	};
};

function createElement(type: string, classes: string[], clickListener?: (ev: MouseEvent) => any): HTMLElement {
	const element = document.createElement(type.toUpperCase());
	classes.forEach((c) => element.classList.add(c));
	if (clickListener) {
		element.addEventListener('click', clickListener);
	}
	return element;
}

function addArrows(carElement: HTMLElement) {
	if (!carElement.classList.contains('player-focus')) {
		carElement.classList.add('player-focus');
		const arrowContainerTop = createElement('DIV', ['arrow-container', 'top']);
		const arrowContainerCenter = createElement('DIV', ['arrow-container', 'center']);
		const arrowContainerBottom = createElement('DIV', ['arrow-container', 'bottom']);
		const up = createElement('DIV', ['up'], clickArrow('up'));
		const down = createElement('DIV', ['down'], clickArrow('down'));
		const left = createElement('DIV', ['left'], clickArrow('left'));
		const right = createElement('DIV', ['right'], clickArrow('right'));
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

export function determineType(classList: string[]): 'player' | 'car' | 'free' {
	if (classList.includes('player')) return 'player';
	if (classList.includes('car')) return 'car';
	return 'free';
}

function getGrid(): GridItem[] {
	return Array.from(document.querySelectorAll('[data-type="grid-item"]'))
				.map((item: unknown) => item as HTMLDivElement)
				.map((item) => {
					const classes = Array.from(item.classList.values());
					const gridItem = {
						id: parseInt(item.id, 10),
						type: determineType(classes),
					} as GridItem;
					return gridItem;
				});
}

export default function app() {
	console.log('Lets build an app!');
	console.log(getGrid());
	document.querySelectorAll('.car')
			.forEach((carElement) => {
				carElement.addEventListener('mouseover', () => addArrows(carElement as HTMLElement));
				carElement.addEventListener('mouseleave', () => removeArrows(carElement as HTMLElement));
			});
}
