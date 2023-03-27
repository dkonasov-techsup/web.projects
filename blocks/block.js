"use strict"



class Block{

	static textPadding = 18;	
	static xmlns = "http://www.w3.org/2000/svg";
	
	constructor(wrapper){
		this.wrapper = wrapper;
		this.svgBody = document.createElementNS(Block.xmlns, "svg");
		
		this.keyBlock = this.drawKeyBlock();
		this.init();		
	}

	init(){		
		this.svgBody.setAttributeNS(null,"id","svg_body");
		this.svgBody.setAttributeNS(null,"height","60");
		this.svgBody.setAttributeNS(null,"fill","white");
		this.svgBody.setAttributeNS(null,"width",200);
		this.wrapper.append(this.svgBody);
	}

	drawText(textVal,xPos){
		xPos += Block.textPadding;
		let textEl = document.createElementNS(Block.xmlns, "text");
		let textNode = document.createTextNode(textVal);
		textEl.appendChild(textNode);
		textEl.setAttributeNS(null,"font-size","18");
		textEl.setAttributeNS(null,"x",xPos);
		textEl.setAttributeNS(null,"y","50%");
		textEl.setAttributeNS(null,"fill","gray");
		textEl.setAttributeNS(null,"font-weight","bold");
		textEl.setAttributeNS(null,"font-family","Segoe UI")
		textEl.setAttributeNS(null,"alignment-baseline","middle");

		this.svgBody.append(textEl);
		let textWidth = parseInt(textEl.getBBox().width)+(Block.textPadding*2);
		return(textWidth);	
	}

	drawKeyBlock(){
		let endPosX = this.drawText('TAKE OFF', 0);
			
		let keyBlock = document.createElementNS(Block.xmlns, "path");
		keyBlock.setAttributeNS(null, "d", ("M0 0 H30 L40 10 H60 L70 0 H"+endPosX+" V50 H70 L60 60 H40 L30 50 H0 Z"));
		keyBlock.setAttributeNS(null,"id","key_block");
		this.svgBody.prepend(keyBlock);
		return(endPosX);
	}

	regEventsHandler(){
	}
}


class InputBlock extends Block{

	static inputBlockWidth = 36;

	drawSVGbody(){
		let svgBody = super.drawSVGbody()
		// console.log(svgBody);
		let endPosX = this.drawInputBlock(svgBody);
		// endPosX =  this.drawDescBlock(endPosX);
		svgBody.setAttributeNS(null,"width",endPosX);
	}

	drawKeyBlock(obj){
		let endPosX = this.drawText(obj, 'INPUT BLOCK', 0);
		// console.log(endPosX);		
		let keyBlock = document.createElementNS(Block.xmlns, "path");
		keyBlock.setAttributeNS(null, "d", ("M0 0 H30 L40 10 H60 L70 0 H"+endPosX+" V50 H70 L60 60 H40 L30 50 H0 Z"));
		keyBlock.setAttributeNS(null,"id","key_block");
		obj.prepend(keyBlock);
		return(endPosX);
	}

	drawInputBlock(obj){
		//GET SVGBODY - GET ACT SIZE		
		let keyBlock = obj.querySelector('#key_block');
		let stPosX = keyBlock.getBBox().width;

		let endPosX = this.addInputArea(stPosX)+stPosX;
		console.log(endPosX);

		// let startPoint = parseInt(previous.getBBox().width);	
		// let endPosX = (stPosX+endPosX);
		// console.log(endPoint);
		let inputBlock;
		// if (obj.querySelector('#input_block')==null){
		// 	inputBlock = document.createElementNS(xmlns, "path");
		// }
		// else{
		// 	obj.querySelector('#input_block').remove();
		// 	inputBlock = document.createElementNS(xmlns, "path");
		// }
		inputBlock = document.createElementNS(Block.xmlns, "path");		
		inputBlock.setAttributeNS(null,"d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));
		inputBlock.setAttributeNS(null,"id","input_block");
		inputBlock.setAttributeNS(null,"fill","gray");
	
		obj.prepend(inputBlock);
		return(endPosX);
	}

	addInputArea(stPosX){
		console.log(this.wrapper);
		let input = document.createElement('input');
		let measureSpan = document.createElement('span');
		input.className = "input_area";
		measureSpan.className = "measure_span";
		input.setAttribute("type","text");
		input.setAttribute("maxlength","5"); //for HTML5
					
		this.wrapper.append(input);
		this.wrapper.append(measureSpan);

		input.style.top = measureSpan.style.top = 7+"px";
		input.style.left = measureSpan.style.left = stPosX+"px";
		let inputWidth = parseInt(window.getComputedStyle(input, null).getPropertyValue('width'));	
		
		return inputWidth;	
	}

	drawDescBlock(){
		let blockX;	
		if(obj.querySelector('#input_block')==null){
			blockX = parseInt(obj.querySelector('#key_block').getBBox().width);
		}
		else{
			blockX = parseInt(obj.querySelector('#key_block').getBBox().width + obj.querySelector('#input_block').getBBox().width);
		}

		let text2width = drawText(obj,'forward',blockX);
		let endPoint = blockX+text2width;
	
		let descBlock = document.createElementNS(xmlns, "path");	
		descBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
		descBlock.setAttributeNS(null,"fill","white");
		obj.prepend(descBlock);
		return(endPoint);
	}
}


let blockDef = document.getElementById('block_def');
let blockInput = document.getElementById('block_input');
let block1 = new Block(blockDef);
// let block2 = new InputBlock(blockInput);


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
	// let text2width = drawText(svgBody,'forward',endPoint);
	endPoint = drawDescBlock(svgBody,endPoint);

	svgBody.setAttributeNS(null,"width",endPoint);
}

function drawText(obj,textVal,textX){
	let xPos = textX+textPadding;
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
	let textWidth = parseInt(textEl.getBBox().width)+(textPadding*2);
	return(textWidth);
}

function drawKeyBlock(obj,textWidth){	
	let endPoint = textWidth;
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
	let inputBlock;
	if (obj.querySelector('#input_block')==null){
		inputBlock = document.createElementNS(xmlns, "path");
	}
	else{
		obj.querySelector('#input_block').remove();
		inputBlock = document.createElementNS(xmlns, "path");
	}		
	inputBlock.setAttributeNS(null,"d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
	inputBlock.setAttributeNS(null,"id","input_block");
	inputBlock.setAttributeNS(null,"fill","gray");
	
	obj.prepend(inputBlock);
	return(endPoint);
}

function drawDescBlock(obj,startPoint){
	//Переопределить метод в классе для инпут блоков?	
	let blockX;	
	if(obj.querySelector('#input_block')==null){
		blockX = parseInt(obj.querySelector('#key_block').getBBox().width);
	}
	else{
		blockX = parseInt(obj.querySelector('#key_block').getBBox().width + obj.querySelector('#input_block').getBBox().width);
	}

	let text2width = drawText(obj,'forward',blockX);
	let endPoint = blockX+text2width;
	
	let descBlock = document.createElementNS(xmlns, "path");	
	descBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
	descBlock.setAttributeNS(null,"fill","white");
	obj.prepend(descBlock);
	return(endPoint);
}


function queryForResize(){
	// resize InputArea
	let inputEl = this.querySelector('.input_area');
	let spanEl = this.querySelector('.measure_span');
	spanEl.textContent = inputEl.value;	
	let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';

	// resize InputBlock
	let svg = this.querySelector('svg');
	inputWidth = parseInt(inputEl.style.width);
	drawInputBlock(svg,inputWidth);
	// resize DescBlock
	drawDescBlock(svg,inputWidth);
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


