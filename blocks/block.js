"use strict"

class Blocks{
	
	constructor(target){

	}
}

let blockMove = document.getElementById('block_move');
console.log(blockMove);

// let contMove = `<svg width=100% height="60" fill="white" xmlns="http://www.w3.org/2000/svg"></svg>`;

const textPadding = 16;
const xmlns = "http://www.w3.org/2000/svg";

drawSVG()

function drawSVG(){
	let svgWidth = drawText(svgBody);
	let svgBody = document.createElementNS(xmlns, "svg");
	// svgBody.setAttributeNS(null,"width",svgWidth);
	svgBody.setAttributeNS(null,"height","60");
	svgBody.setAttributeNS(null,"fill","white");

	// let svgWidth = drawDescBlock(svgBody);

	blockMove.append(svgBody);	
}


// function drawText(textVal,startPoint){
// 	let xPos = startPoint+textPadding;
// 	let textEl = document.createElementNS(xmlns, "text");
// 	let textNode = document.createTextNode(textVal);
// 	textEl.appendChild(textNode);
// 	textEl.setAttributeNS(null,"font-size","20");
// 	textEl.setAttributeNS(null,"x",xPos);
// 	textEl.setAttributeNS(null,"y","30");
// 	textEl.setAttributeNS(null,"fill","gray");
// 	textEl.setAttributeNS(null,"font-weight","bold");
// 	textEl.setAttributeNS(null,"font-family","Segoe UI")
// 	textEl.setAttributeNS(null,"dominant-baseline","middle");

// 	// document.svgBody.append(textEl);
// }

// function drawKeyBlock(svgBody){
// 	drawText('move',0);
// 	let text = svgBody.getElementsByTagName('text')[0];
// 	let textBox = text.getBBox();
// 	let endPoint = (textPadding*2)+textBox.width;	
// 	// console.log(textBox);
// 	let keyBlock = document.createElementNS(xmlns, "path");
// 	keyBlock.setAttributeNS(null, "d", ("M0 0 H30 L40 10 H60 L70 0 H"+endPoint+" V50 H70 L60 60 H40 L30 50 H0 Z"));

// 	// svg.prepend(keyBlock);
// 	return(endPoint);
// }

// function drawInputBlock(svgBody){
// 	let startPoint = drawKeyBlock(svgBody);
// 	let inputBlock = document.createElementNS(xmlns, "path");
// 	let endPoint = (startPoint+40);
// 	inputBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
// 	inputBlock.setAttributeNS(null,"fill","gray");
// 	// svg.prepend(inputBlock);
// 	return(endPoint);
// }

// function drawDescBlock(svgBody){
// 	let startPoint = drawInputBlock(svgBody);
	
	
// 	drawText('forward',startPoint);
// 	let text = svg.getElementsByTagName('text')[1];	
// 	let textBox = text.getBBox();
	
// 	let endPoint = startPoint+(textPadding*2)+textBox.width;	

// 	let descBlock = document.createElementNS(xmlns, "path");	
// 	descBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
// 	descBlock.setAttributeNS(null,"fill","white");
// 	// svg.prepend(descBlock);
// 	return(endPoint);
// }



