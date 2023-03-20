"use strict"

class Blocks{
	
	constructor(container){

	}

}

let blockMove = document.getElementById('block_move');
console.log(blockMove);

let contMove = `<svg width=100% height="60" fill="white" xmlns="http://www.w3.org/2000/svg"></svg>`;
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
	textEl.setAttributeNS(null,"font-family","Segoe UI")
	textEl.setAttributeNS(null,"dominant-baseline","middle");

	svg.append(textEl);
}


function drawKeyBlock(){
	let text = svg.getElementsByTagName('text')[0];
	let textBox = text.getBBox();
	let endPoint = (16*2)+textBox.width;	
	console.log(textBox);
	let keyBlock = document.createElementNS("http://www.w3.org/2000/svg", "path");
	keyBlock.setAttributeNS(null, "d", ("M0 0 H30 L40 10 H60 L70 0 H"+endPoint+" V50 H70 L60 60 H40 L30 50 H0 Z"));
	// svg.innerHTML += `<g><path d="M0 0 H30 L40 10 H60 L70 0 H80 V50
	// 								H70 L60 60 H40 L30 50 H0 Z "/></g>`
	svg.prepend(keyBlock);
	return(endPoint);
}

function drawInputBlock(){
	let startPoint = drawKeyBlock();
	let inputBlock = document.createElementNS("http://www.w3.org/2000/svg", "path");
	inputBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+(startPoint+40)+" V50 H"+startPoint+"Z"));
	inputBlock.setAttributeNS(null,"fill","gray");
	svg.prepend(inputBlock);
}

drawText1('move');
drawInputBlock()
// drawKeyBlock();