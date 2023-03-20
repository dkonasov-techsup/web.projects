"use strict"

class Blocks{
	
	constructor(container){

	}

}

let blockMove = document.getElementById('block_move');
console.log(blockMove);

let contMove = `<svg width=100% height="60" viewBox="0 0 144 60" fill="white" xmlns="http://www.w3.org/2000/svg"></svg>`;
blockMove.innerHTML += (contMove);
let svg = blockMove.children[0];

console.log(svg);

function drawText1(textVal){
	let textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
	let textNode = document.createTextNode(textVal);
	textEl.appendChild(textNode);
	textEl.setAttributeNS(null,"font-size","20");
	textEl.setAttributeNS(null,"x","16");
	textEl.setAttributeNS(null,"y","30");
	textEl.setAttributeNS(null,"fill","gray");
	textEl.setAttributeNS(null,"font-weight","bold");
	textEl.setAttributeNS(null,"dominant-baseline","middle");


	// cont.innerHTML = (`<text x="15" y="27" font-size="20" font-weight="bold" font-family="Montserrat" fill="gray" stroke="none">`+ text +`</text>`);
	svg.append(textEl);
}


function drawKeyBlock(){
	console.log(svg.text);
	let keyBlock = document.createElementNS("http://www.w3.org/2000/svg", "path");
	keyBlock.setAttributeNS(null, "d", "M0 0 H30 L40 10 H60 L70 0 H80 V50 H70 L60 60 H40 L30 50 H0 Z");
	// svg.innerHTML += `<g><path d="M0 0 H30 L40 10 H60 L70 0 H80 V50
	// 								H70 L60 60 H40 L30 50 H0 Z "/></g>`
	svg.prepend(keyBlock);
}

drawText1('move');
drawKeyBlock();