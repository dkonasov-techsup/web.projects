"use strict"



class Block{

	static textPadding = 18;	
	static xmlns = "http://www.w3.org/2000/svg";
	static keyBlockPath1 = `M0 0 H30 L40 10 H60 L70 0 H`;
	static keyBlockPath2 = `V50 H70 L60 60 H40 L30 50 H0 Z`;
	
	constructor(wrapper){
		this.wrapper = wrapper;
		this.svgBody = document.createElementNS(Block.xmlns, "svg");
		this.wrapper.append(this.svgBody);
		
		this.keyBlock = this.drawKeyBlock();
		this.init();
		this.eventsHandler();				
	}

	//инициализация перемещена в конструктор → хер знает куда вынести атрибуты, учитывая что ширина svgbody адаптивна
	init(){		
		this.svgBody.setAttributeNS(null,"id","svg_body");
		this.svgBody.setAttributeNS(null,"height","60");
		this.svgBody.setAttributeNS(null,"fill","white");
		// this.svgBody.setAttributeNS(null,"width",200);		
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
		let textWdt = parseInt(textEl.getBBox().width)+(Block.textPadding*2);
		return {el: textEl, wdt: textWdt};
	}

	drawKeyBlock(){
		let endPosX = this.drawText('TAKE OFF', 0).wdt;		
		let keyBlock = document.createElementNS(Block.xmlns, "path");
		keyBlock.setAttributeNS(null, "d", `${Block.keyBlockPath1} ${endPosX} ${Block.keyBlockPath2}`);
		keyBlock.setAttributeNS(null,"id","key_block");
		this.svgBody.prepend(keyBlock);
		let blockWidth = keyBlock.getBBox().width;
		return {el: keyBlock, wdt: blockWidth};
	}

	eventsHandler(){		
	}
}

class InputBlock extends Block{

	static keyBlockPath1 = `M0 0 H30 L40 10 H60 L70 0 H`;
	static keyBlockPath2 = `V50 H70 L60 60 H40 L30 50 H0 Z`;

	constructor(wrapper){
		super(wrapper)
		this.inputBlock = this.drawInputBlock(this.svgBody);
		this.descBlock = this.drawDescBlock();
	}

	drawKeyBlock(){
		let endPosX = this.drawText('INPUT BLOCK', 0).wdt;
		let keyBlock = document.createElementNS(Block.xmlns, "path");
		keyBlock.setAttributeNS(null, "d", `${Block.keyBlockPath1} ${endPosX} ${Block.keyBlockPath2}`);
		keyBlock.setAttributeNS(null,"id","key_block");
		this.svgBody.prepend(keyBlock);
		let blockWidth = keyBlock.getBBox().width;
		return {el: keyBlock, wdt: blockWidth};
	}

	drawInputBlock(){
		// let keyBlock = this.svgBody.querySelector('#key_block');
		// let stPosX = keyBlock.getBBox().width;
		let stPosX = this.keyBlock.wdt;
		let endPosX = this.addInputArea(stPosX)+stPosX;

		let inputBlock = document.createElementNS(Block.xmlns, "path");		
		inputBlock.setAttributeNS(null,"d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));
		inputBlock.setAttributeNS(null,"id","input_block");
		inputBlock.setAttributeNS(null,"fill","gray");
	
		this.svgBody.prepend(inputBlock);
		return(endPosX);
	}

	addInputArea(stPosX){
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
		let endPosX = parseInt(window.getComputedStyle(input, null).getPropertyValue('width'));	
		
		return(endPosX);	
	}

	drawDescBlock(){
		
		let descText = this.drawText('forward',this.inputBlock);			

		let stPosX = this.inputBlock;
		let endPosX = descText.wdt+stPosX;

		let descBlock = document.createElementNS(Block.xmlns, "path");		
		descBlock.setAttributeNS(null, "d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));
		descBlock.setAttributeNS(null, "id","desc_block");

		let descGroup = document.createElementNS(Block.xmlns, "g");
		descGroup.setAttributeNS(null, "id","desc_block_group");

		descGroup.append(descText.el);
		descGroup.prepend(descBlock);

		this.svgBody.prepend(descGroup);
		return(endPosX);
	}

	eventsHandler(){
		//use arrow-function from save link `this`
		this.wrapper.addEventListener('input',()=>{
			console.log(this);
			let inputBlock = this.wrapper.querySelector('#input_block');
			let descBlockGroup = this.wrapper.querySelector('#desc_block_group');
			let inputEl = this.wrapper.querySelector('.input_area');
			let spanEl = this.wrapper.querySelector('.measure_span');

			// resize inputArea
			spanEl.textContent = inputEl.value;	
			let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';
			// resize descArea
			let stPosX = this.keyBlock.wdt;
			let endPosX = stPosX + parseInt(inputWidth);
			inputBlock.setAttributeNS(null,"d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));

			let trX = parseInt(inputWidth)-36;
			descBlockGroup.setAttributeNS(null, "transform",`translate(${trX},0)`);
			// this.svgBody.setAttributeNS(null,"width",endPosX);
		});
	}		
}


let blockDef = document.getElementById('block_def');
let blockInput = document.getElementById('block_input');
let block1 = new Block(blockDef);
let block2 = new InputBlock(blockInput);


// let blockMove = document.getElementById('block_move');
// //regEventsHandler
// // blockMove.addEventListener('input', queryForResize);

// const textPadding = 16;
// const inputBlockWidth = 36;
// const xmlns = "http://www.w3.org/2000/svg";

// drawSVG()

// function drawSVG(){
	
// 	let svgBody = document.createElementNS(xmlns, "svg");
	
// 	svgBody.setAttributeNS(null,"height","60");
// 	svgBody.setAttributeNS(null,"fill","white");
// 	blockMove.append(svgBody);

// 	let text1width = drawText(svgBody,'move',0);	
// 	let endPoint = drawKeyBlock(svgBody,text1width);
// 	let inputWidth = addInputArea(endPoint);
// 	endPoint = drawInputBlock(svgBody,inputWidth);	
// 	// let text2width = drawText(svgBody,'forward',endPoint);
// 	endPoint = drawDescBlock(svgBody,endPoint);

// 	svgBody.setAttributeNS(null,"width",endPoint);
// }

// function drawText(obj,textVal,textX){
// 	let xPos = textX+textPadding;
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

// 	obj.append(textEl);
// 	let textWidth = parseInt(textEl.getBBox().width)+(textPadding*2);
// 	return(textWidth);
// }

// function drawKeyBlock(obj,textWidth){	
// 	let endPoint = textWidth;
// 	let keyBlock = document.createElementNS(xmlns, "path");
// 	keyBlock.setAttributeNS(null, "d", ("M0 0 H30 L40 10 H60 L70 0 H"+endPoint+" V50 H70 L60 60 H40 L30 50 H0 Z"));
// 	keyBlock.setAttributeNS(null,"id","key_block");
// 	obj.prepend(keyBlock);
// 	return(endPoint);
// }

// function drawInputBlock(obj,inputWidth){
// 	let previous = obj.querySelector('#key_block');
// 	let startPoint = parseInt(previous.getBBox().width);	
// 	let endPoint = (startPoint+inputWidth);
// 	// console.log(endPoint);
// 	let inputBlock;
// 	if (obj.querySelector('#input_block')==null){
// 		inputBlock = document.createElementNS(xmlns, "path");
// 	}
// 	else{
// 		obj.querySelector('#input_block').remove();
// 		inputBlock = document.createElementNS(xmlns, "path");
// 	}		
// 	inputBlock.setAttributeNS(null,"d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
// 	inputBlock.setAttributeNS(null,"id","input_block");
// 	inputBlock.setAttributeNS(null,"fill","gray");
	
// 	obj.prepend(inputBlock);
// 	return(endPoint);
// }

// function addInputArea(startPoint){
// 	let input = document.createElement('input');
// 	let measureSpan = document.createElement('span');
// 	input.className = "input_area";
// 	measureSpan.className = "measure_span";
// 	input.setAttribute("type","text");
// 	input.setAttribute("maxlength","5"); //for HTML5
				
// 	blockMove.append(input);
// 	blockMove.append(measureSpan);

// 	input.style.top = measureSpan.style.top = 7+"px";
// 	input.style.left = measureSpan.style.left = startPoint+"px";
// 	let inputWidth = parseFloat(window.getComputedStyle(input, null).getPropertyValue('width'));	
// 	// let inputPadding = parseFloat(window.getComputedStyle(input, null).getPropertyValue('padding-left'));

// 	return inputWidth;	
// }

// function drawDescBlock(obj,startPoint){
// 	//Переопределить метод в классе для инпут блоков?	
// 	let blockX;	
// 	if(obj.querySelector('#input_block')==null){
// 		blockX = parseInt(obj.querySelector('#key_block').getBBox().width);
// 	}
// 	else{
// 		blockX = parseInt(obj.querySelector('#key_block').getBBox().width + obj.querySelector('#input_block').getBBox().width);
// 	}

// 	let text2width = drawText(obj,'forward',blockX);
// 	let endPoint = blockX+text2width;
	
// 	let descBlock = document.createElementNS(xmlns, "path");	
// 	descBlock.setAttributeNS(null, "d", ("M"+startPoint+" 0 H"+endPoint+" V50 H"+startPoint+"Z"));
// 	descBlock.setAttributeNS(null,"fill","white");
// 	obj.prepend(descBlock);
// 	return(endPoint);
// }

// function queryForResize(){
// 	// resize InputArea
// 	let inputEl = this.querySelector('.input_area');
// 	let spanEl = this.querySelector('.measure_span');
// 	spanEl.textContent = inputEl.value;	
// 	let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';

// 	// resize InputBlock
// 	let svg = this.querySelector('svg');
// 	inputWidth = parseInt(inputEl.style.width);
// 	drawInputBlock(svg,inputWidth);
// 	// resize DescBlock
// 	drawDescBlock(svg,inputWidth);
// }





