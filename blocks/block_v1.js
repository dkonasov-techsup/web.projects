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
		this.textVal = {key: 'DEF BLOCK'};		
		this.keyBlock = this.drawKeyBlock();
		this.init();
		this.eventsHandler();				
	}

	//инициализация перемещена в конструктор → хер знает куда вынести атрибуты, учитывая что ширина svgbody адаптивна
	init(){
		this.svgBody.setAttributeNS(null,"id","svg_body");
		this.svgBody.setAttributeNS(null,"height","60");
		this.svgBody.setAttributeNS(null,"fill","white");
		
		// let svgBodyWdt = this.keyBlock.wdt;
		// this.svgBody.setAttributeNS(null,"width",svgBodyWdt);		
		let body = this.svgBody;
		console.log(body.children.length);
		// for(let i=0; i<body.children.length; i++){
		// 	console.log(body.children[i]);
		// }

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
		let keyText = this.drawText(this.textVal.key, 0);
		let endPosX = keyText.wdt;
		let keyBlock = document.createElementNS(Block.xmlns, "path");
		keyBlock.setAttributeNS(null, "d", `${Block.keyBlockPath1} ${endPosX} ${Block.keyBlockPath2}`);
		keyBlock.setAttributeNS(null,"id","key_block");

		let keyGroup = document.createElementNS(Block.xmlns, "g");
		keyGroup.setAttributeNS(null, "id","key_block_group");
		keyGroup.append(keyBlock);
		keyGroup.append(keyText.el);

		this.svgBody.prepend(keyGroup);

		let groupWidth = keyGroup.getBBox().width;
		return {el: keyGroup, wdt: groupWidth};
	}

	eventsHandler(){		
	}
}

class InputBlock extends Block{

	static keyBlockPath1 = `M0 0 H30 L40 10 H60 L70 0 H`;
	static keyBlockPath2 = `V50 H70 L60 60 H40 L30 50 H0 Z`;

	constructor(wrapper){
		super(wrapper);
		this.textVal = {key: 'INP BLOCK'};
		this.inputBlock = this.drawInputBlock(this.svgBody);
		this.descBlock = this.drawDescBlock();				
	}

	drawKeyBlock(){
		let keyText = this.drawText(this.textVal.key, 0);
		let endPosX = keyText.wdt;
		let keyBlock = document.createElementNS(Block.xmlns, "path");
		keyBlock.setAttributeNS(null, "d", `${Block.keyBlockPath1} ${endPosX} ${Block.keyBlockPath2}`);
		keyBlock.setAttributeNS(null,"id","key_block");

		let keyGroup = document.createElementNS(Block.xmlns, "g");
		keyGroup.setAttributeNS(null, "id","key_block_group");
		keyGroup.append(keyBlock);
		keyGroup.append(keyText.el);

		this.svgBody.prepend(keyGroup);

		let groupWidth = keyGroup.getBBox().width;
		return {el: keyGroup, wdt: groupWidth};
	}

	drawInputBlock(){
		let stPosX = this.keyBlock.wdt;
		let endPosX = this.addInputArea(stPosX)+stPosX;

		let inputBlock = document.createElementNS(Block.xmlns, "path");		
		inputBlock.setAttributeNS(null,"d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));
		inputBlock.setAttributeNS(null,"id","input_block");
		inputBlock.setAttributeNS(null,"fill","gray");
	
		this.svgBody.prepend(inputBlock);
		let blockWidth = inputBlock.getBBox().width;
		return {el: inputBlock, wdt: blockWidth};
	}

	addInputArea(stPosX){
		let input = document.createElement('input');
		let measureSpan = document.createElement('span');
		input.className = "input_area";
		measureSpan.className = "measure_span";
		input.setAttribute("type","text");
		input.setAttribute("maxlength","6"); //for HTML5
					
		this.wrapper.append(input);
		this.wrapper.append(measureSpan);

		input.style.top = measureSpan.style.top = 7+"px";
		input.style.left = measureSpan.style.left = stPosX+"px";
		let endPosX = parseInt(window.getComputedStyle(input, null).getPropertyValue('width'));	
		
		return(endPosX);	
	}

	drawDescBlock(){
		let stPosX = this.inputBlock.wdt + this.keyBlock.wdt;
		let descText = this.drawText('forward',stPosX);
		let endPosX = descText.wdt+stPosX;

		let descBlock = document.createElementNS(Block.xmlns, "path");		
		descBlock.setAttributeNS(null, "d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));
		descBlock.setAttributeNS(null, "id","desc_block");

		let descGroup = document.createElementNS(Block.xmlns, "g");
		descGroup.setAttributeNS(null, "id","desc_block_group");

		descGroup.append(descText.el);
		descGroup.prepend(descBlock);

		this.svgBody.prepend(descGroup);
		let blockWidth = descBlock.getBBox().width;
		return {el: descGroup, wdt: blockWidth};
	}

	eventsHandler(){
		//use arrow-function from save link `this`
		this.wrapper.addEventListener('input',()=>{			

			let inputEl = this.wrapper.querySelector('.input_area');
			let spanEl = this.wrapper.querySelector('.measure_span');

			// resize inputArea
			spanEl.textContent = inputEl.value;	
			let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';

			// resize descArea
			let stPosX = this.keyBlock.wdt;
			let endPosX = stPosX + parseInt(inputWidth);
			this.inputBlock.el.setAttributeNS(null,"d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));

			let offsetX = parseInt(inputWidth)-36;
			this.descBlock.el.setAttributeNS(null, "transform",`translate(${offsetX},0)`);

			// resize svgBody
			console.log(offsetX);
			let svgBodyWdt = this.keyBlock.wdt + this.inputBlock.wdt + this.descBlock.wdt + offsetX;
			this.svgBody.setAttributeNS(null,"width",svgBodyWdt);
		})
	}		
}


let blockDef = document.getElementById('block_def');
let blockInput = document.getElementById('block_input');
let block1 = new Block(blockDef);
let block2 = new InputBlock(blockInput);