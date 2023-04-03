"use strict"

class Block{


	static textPadding = 18;	
	static xmlns = "http://www.w3.org/2000/svg";
	static rRad = 8;
	// static hghT = 50;
	static keyBlockPath1 = `M0 ${Block.rRad} Q 0,0 ${Block.rRad},0 H30 L40 10 H60 L70 0 H`;
	static keyBlockPath2 = `V50 H70 L60 60 H40 L30 50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
	
	//min H xPos = 100;
	
	constructor(wrapper,textVal){
		this.wrapper = wrapper;		
		this.textVal = textVal;

		this.keyBlockPath1 = Block.keyBlockPath1;
		this.keyBlockPath2 = Block.keyBlockPath2;

		this.init();
		this.setSvgWdt();
		this.eventsHandler();				
	}

	//инициализация перемещена в конструктор → хер знает куда вынести атрибуты, учитывая что ширина svgbody адаптивна
	init(){
		this.svgBody = document.createElementNS(Block.xmlns, "svg");		
		this.svgBody.setAttributeNS(null,"id","svg_body");
		this.svgBody.setAttributeNS(null,"height","60");
		this.svgBody.setAttributeNS(null,"fill","white");
		this.wrapper.append(this.svgBody);

		console.log(this.textVal);
		this.keyBlock = this.drawKeyBlock();
	}

	setSvgWdt(){
		let newWdt = 0;		
		for(let i=0; i<this.svgBody.children.length; i++){
			newWdt += this.svgBody.children[i].getBBox().width;
			this.svgBody.setAttributeNS(null,"width",newWdt);
		}
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
		let keyText = this.drawText(this.textVal, 0);
		let endPosX = keyText.wdt < 100 ? 100 : keyText.wdt;
		let keyBlock = document.createElementNS(Block.xmlns, "path");
		keyBlock.setAttributeNS(null, "d", `${this.keyBlockPath1} ${endPosX} ${this.keyBlockPath2}`);
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

	constructor(wrapper,textVal){
		super(wrapper,textVal);
		this.keyBlockPath1 = `M0 0 H30 L40 10 H60 L70 0 H`;
		this.keyBlockPath2 = `V50 H70 L60 60 H40 L30 50 H0 Z`;		
		this.textVal = textVal;							
	}

	init(){		
		super.init();		
		this.inputBlock = this.drawInputBlock();
		this.descBlock = this.drawDescBlock();
	}

	// drawKeyBlock(){
	// 	let keyText = this.drawText(this.textVal, 0);
	// 	let endPosX = keyText.wdt;
	// 	let keyBlock = document.createElementNS(Block.xmlns, "path");
	// 	keyBlock.setAttributeNS(null, "d", `${this.keyBlockPath1} ${endPosX} ${this.keyBlockPath2}`);
	// 	keyBlock.setAttributeNS(null,"id","key_block");

	// 	let keyGroup = document.createElementNS(Block.xmlns, "g");
	// 	keyGroup.setAttributeNS(null, "id","key_block_group");
	// 	keyGroup.append(keyBlock);
	// 	keyGroup.append(keyText.el);

	// 	this.svgBody.prepend(keyGroup);

	// 	let groupWidth = keyGroup.getBBox().width;
	// 	return {el: keyGroup, wdt: groupWidth};
	// }

	drawInputBlock(){
		let stPosX = this.keyBlock.wdt;
		let endPosX = this.addInputArea(stPosX)+stPosX;

		let inputBlock = document.createElementNS(Block.xmlns, "path");		
		inputBlock.setAttributeNS(null,"d", ("M"+stPosX+" 0 H"+endPosX+" V50 H"+stPosX+"Z"));
		inputBlock.setAttributeNS(null,"id","input_block");
		inputBlock.setAttributeNS(null,"fill","gray");
	
		this.svgBody.append(inputBlock);
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

		this.svgBody.append(descGroup);
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
let block1 = new Block(blockDef,'DEF BLOCK');
let block2 = new InputBlock(blockInput,'INPUT BLOCK');