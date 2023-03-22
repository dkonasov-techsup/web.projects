"use strict"

class Blocks{
	
	constructor(target){

	}
}

let blockMove = document.getElementById('block_move');
console.log(blockMove);

const textPadding = 16;
const inputBlockWidth = 40;
const xmlns = "http://www.w3.org/2000/svg";

drawSVG()

function drawSVG(){
	// let svgWidth = drawText(svgBody);
	let svgBody = document.createElementNS(xmlns, "svg");
	
	svgBody.setAttributeNS(null,"height","60");
	svgBody.setAttributeNS(null,"fill","white");
	blockMove.append(svgBody);

	let text1width = drawText(svgBody,'move',0);	
	let endPoint = drawKeyBlock(svgBody,text1width);
	endPoint = drawInputBlock(svgBody,endPoint);
	let text2width = drawText(svgBody,'forward',endPoint);
	endPoint = drawDescBlock(svgBody,text2width,endPoint);

	svgBody.setAttributeNS(null,"width",endPoint);
}


function drawText(obj,textVal,startPoint){
	let xPos = startPoint+textPadding;
	let textEl = document.createElementNS(xmlns, "text");
	let textNode = document.createTextNode(textVal);
	textEl.appendChild(textNode);
	textEl.setAttributeNS(null,"font-size","20");
	textEl.setAttributeNS(null,"x",xPos);
	textEl.setAttributeNS(null,"y","30");
	textEl.setAttributeNS(null,"fill","gray");
	textEl.setAttributeNS(null,"font-weight","bold");
	textEl.setAttributeNS(null,"font-family","Segoe UI")
	textEl.setAttributeNS(null,"dominant-baseline","middle");

	obj.append(textEl);
	let textWidth = parseInt(textEl.getBBox().width);
	return(textWidth);
}

function drawKeyBlock(obj,textWidth){	
	let endPoint = (textPadding*2)+textWidth;
	let keyBlock = document.createElementNS(xmlns, "path");
	keyBlock.setAttributeNS(null, "d", ("M0 0 H30 L40 10 H60 L70 0 H"+endPoint+" V50 H70 L60 60 H40 L30 50 H0 Z"));
	obj.prepend(keyBlock);
	return(endPoint);
}

function drawInputBlock(obj,startPoint){	
	let inputBlock = document.createElementNS(xmlns, "path");
	let endPoint = (startPoint+inputBlockWidth);
	inputBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
	inputBlock.setAttributeNS(null,"fill","gray");
	obj.prepend(inputBlock);
	return(endPoint);
}

function drawDescBlock(obj,textWidth,startPoint){		
	let endPoint = startPoint+(textPadding*2)+textWidth;
	let descBlock = document.createElementNS(xmlns, "path");	
	descBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
	descBlock.setAttributeNS(null,"fill","white");
	obj.prepend(descBlock);
	return(endPoint);
}



function queryForResize(){
	console.log('try');
	// this.style.width = 0; this.style.width = this.scrollWidth + 'px'; ?

}

addInputArea()
function addInputArea(){
	let input = document.createElement('input');
	// input.setAttribute("type","number");
	input.className = "brickInput";
	input.style.width = 30+"px";
	input.style.left = 87+"px";
	input.style.top = 8+"px";
	blockMove.append(input);
	input.addEventListener('keyup', queryForResize);

}


