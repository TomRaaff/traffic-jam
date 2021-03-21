const grid = [
	11, 12, 13, 14, 15,
	21, 22, 23, 24, 25,
	31, 32, 33, 34, 35,
	41, 42, 43, 44, 45,
	51, 52, 53, 54, 55,
];

function hover(event: any) {
	const x = event.clientX;
	const y = event.clientY;
	document.getElementById('output')!
			.innerText = `x: ${x}, y: ${y}`;
}

function addArrows(carElement: HTMLElement) {
	if (!carElement.classList.contains('tagged')) {
		carElement.classList.add('tagged');
		const up = document.createElement('DIV');
		up.classList.add('arrow-up');
		const down = document.createElement('DIV');
		down.classList.add('arrow-down');
		carElement.appendChild(up);
		carElement.appendChild(down);
		// const left = document.createElement('DIV');
		// up.classList.add('arrow-left');
		// const right = document.createElement('DIV');
		// down.classList.add('arrow-right');
		// carElement.appendChild(left);
		// carElement.appendChild(right);
	}
}

function removeArrows(carElement: HTMLElement) {
	carElement.classList.remove('tagged');
	const up = document.getElementsByClassName('arrow-up')
					   .item(0)!;
	const down = document.getElementsByClassName('arrow-down')
						 .item(0)!;
	carElement.removeChild(up);
	carElement.removeChild(down);
	// const left = document.getElementsByClassName('arrow-left').item(0)!;
	// const right = document.getElementsByClassName('arrow-right').item(0)!;
	// carElement.removeChild(left);
	// carElement.removeChild(right);
}

export default function start() {
	console.log('Lets build an app!');
	console.log(grid);
	document.querySelectorAll('.car')
			.forEach((carElement) => {
				carElement.addEventListener('mousemove', (event) => hover(event));
				carElement.addEventListener('mouseover', () => addArrows(carElement as HTMLElement));
				carElement.addEventListener('mouseleave', () => removeArrows(carElement as HTMLElement));
				console.log('added eventListener');
			});
}

start();
