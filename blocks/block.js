"use strict"

class Blocks{
	
	constructor(container){

	}

}

let blockMove = document.getElementById('block_move');

let contMove = `<svg width=100% height="43" viewBox="0 0 144 60" fill="white" xmlns="http://www.w3.org/2000/svg">
					
						<g><path d="M0 0 H30 L40 10 H60 L70 0 H80 V50
									H70 L60 60 H40 L30 50 H0 Z "></g>
					
				</svg>`;


console.log(blockMove);
blockMove.innerHTML += (contMove);
 

