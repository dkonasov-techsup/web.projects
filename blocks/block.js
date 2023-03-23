"use strict"

class Blocks{
	
	constructor(target){

	}
}

let blockMove = document.getElementById('block_move');

//regEventsHandler
blockMove.addEventListener('input', queryForResize);

const textPadding = 16;
const inputBlockWidth = 36;
const xmlns = "http://www.w3.org/2000/svg";

drawSVG()

function drawSVG(){
	
	let svgBody = document.createElementNS(xmlns, "svg");
	
	svgBody.setAttributeNS(null,"height","60");
	svgBody.setAttributeNS(null,"fill","white");
	blockMove.append(svgBody);

	let text1width = drawText(svgBody,'move',0);	
	let endPoint = drawKeyBlock(svgBody,text1width);
	let inputWidth = addInputArea(endPoint);
	endPoint = drawInputBlock(svgBody,inputWidth);	
	let text2width = drawText(svgBody,'forward',endPoint);
	// endPoint = drawDescBlock(svgBody,text2width,endPoint);

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
	keyBlock.setAttributeNS(null,"id","key_block");
	obj.prepend(keyBlock);
	return(endPoint);
}

function drawInputBlock(obj,inputWidth){
	let previous = obj.querySelector('#key_block');
	let startPoint = parseInt(previous.getBBox().width);	
	let endPoint = (startPoint+inputWidth);
	// console.log(endPoint);
	if (obj.querySelector('#input_block')==null){
		let inputBlock = document.createElementNS(xmlns, "path");
	}
	else{
		console.log('not null');
	}	
	let inputBlock = document.createElementNS(xmlns, "path");	
	inputBlock.setAttributeNS(null,"d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
	inputBlock.setAttributeNS(null,"id","input_block");
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
	// resize inputArea
	let inputEl = this.querySelector('.input_area');
	let spanEl = this.querySelector('.measure_span');
	spanEl.textContent = inputEl.value;	
	let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';

	// resize inputBlock
	let svg = this.querySelector('svg');	
	// let inputBlock = this.querySelector('#input_block');
	// let path = inputBlock.getAttribute('d');
	inputWidth = parseInt(inputEl.style.width);
	drawInputBlock(svg,inputWidth)
	
}


function addInputArea(startPoint){
	let input = document.createElement('input');
	let measureSpan = document.createElement('span');
	input.className = "input_area";
	measureSpan.className = "measure_span";
	input.setAttribute("type","text");
	input.setAttribute("maxlength","5"); //for HTML5
				
	blockMove.append(input);
	blockMove.append(measureSpan);

	input.style.top = measureSpan.style.top = 7+"px";
	input.style.left = measureSpan.style.left = startPoint+"px";
	let inputWidth = parseFloat(window.getComputedStyle(input, null).getPropertyValue('width'));	
	// let inputPadding = parseFloat(window.getComputedStyle(input, null).getPropertyValue('padding-left'));

	return inputWidth;	
}


