"use strict"

class Block{

	static textPadding = 18;	
	static xmlns = "http://www.w3.org/2000/svg";
	static rRad = 8;
	// static hghT = 50;	
	//min H xPos = 100;
	
	constructor(wrapper,config){
		const defaultConfig = {};
		this.config = Object.assign(defaultConfig, config);
		this.wrapper = wrapper;		
		console.log(this.config);						
	}

	//инициализация перемещена в конструктор → хер знает куда вынести атрибуты, учитывая что ширина svgbody адаптивна
	init(){
		let svgBody = this.svgBody = document.createElementNS(Block.xmlns, "svg");		
		svgBody.setAttributeNS(null, "id", "svg_body");
		svgBody.setAttributeNS(null, "height", "60");
		svgBody.setAttributeNS(null, "fill", this.config.colors.bg);
		this.wrapper.append(svgBody);
		this.keyBlock = this.drawKeyBlock();
		this.setSvgWdt();
		this.eventsHandler();					
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
		textEl.setAttributeNS(null, "font-size", "18");
		textEl.setAttributeNS(null, "x", xPos);
		textEl.setAttributeNS(null, "y", "50%");
		textEl.setAttributeNS(null, "fill", this.config.colors.font);
		textEl.setAttributeNS(null, "font-weight", "bold");
		textEl.setAttributeNS(null, "font-family", "Segoe UI")
		textEl.setAttributeNS(null, "alignment-baseline", "middle");
		
		this.svgBody.append(textEl);
		let textWdt = parseInt(textEl.getBBox().width)+(Block.textPadding*2);	
		
		return {el: textEl, wdt: textWdt};
	}

	drawKeyBlock(){
		let keyText = this.drawText(this.config.textVal.keyText, 0);
		let endPosX = keyText.wdt < 80 ? 80 : keyText.wdt;

		//text alignment, when its width is less than 80 (note that drawText.wdt includes double padding)
		let offsetX = ((endPosX - (keyText.wdt - Block.textPadding*2)) / 2);
		keyText.el.setAttributeNS(null, "x", offsetX);

		let keyBlock = document.createElementNS(Block.xmlns, "path");		
		let keyBlockPath1 = `M0 ${Block.rRad} Q0,0 ${Block.rRad},0 H30 L40 10 H60 L70 0 H${endPosX-Block.rRad} Q ${endPosX},0 ${endPosX},${Block.rRad}`;
		let keyBlockPath2 = `V${50-Block.rRad} Q${endPosX},50 ${endPosX-Block.rRad},50 H70 L60 60 H40 L30 50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
		
		if(this.constructor.name !== 'Block'){
			keyBlockPath1 = `M0 ${Block.rRad} Q0,0 ${Block.rRad},0 H30 L40 10 H60 L70 0 H${endPosX}`;
			keyBlockPath2 = `V50 H70 L60 60 H40 L30 50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
		}

		keyBlock.setAttributeNS(null, "d", `${keyBlockPath1} ${keyBlockPath2}`);
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
		//off default D&D
		this.wrapper.ondragstart = function() {
		  return false;
		};
		this.wrapper.addEventListener('mousedown', blMouseDown);
		this.wrapper.addEventListener('mouseup', blMouseUp);			
	}
}

class InputBlock extends Block{

	constructor(wrapper,config){
		super(wrapper,config);										
	}

	init(){
		let svgBody = this.svgBody = document.createElementNS(Block.xmlns, "svg");		
		svgBody.setAttributeNS(null, "id", "svg_body");
		svgBody.setAttributeNS(null, "height", "60");
		svgBody.setAttributeNS(null, "fill", this.config.colors.bg);
		this.wrapper.append(svgBody);
		this.keyBlock = this.drawKeyBlock();
		this.inputBlock = this.drawInputBlock();
		this.descBlock = this.drawDescBlock();
		this.setSvgWdt();
		this.eventsHandler();			
	}

	drawInputBlock(){
		let stPosX = this.keyBlock.wdt;
		let endPosX = this.addInputArea(stPosX) + stPosX;

		let inputBlock = document.createElementNS(Block.xmlns, "path");		
		inputBlock.setAttributeNS(null,"d", (`M${stPosX} 0 H${endPosX} V50 H${stPosX} Z`));
		inputBlock.setAttributeNS(null,"id","input_block");
		inputBlock.setAttributeNS(null,"fill",this.config.colors.bg);
	
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

		input.style.top = measureSpan.style.top = 7 + "px";
		input.style.left = measureSpan.style.left = stPosX + "px";
		let endPosX = parseInt(window.getComputedStyle(input, null).getPropertyValue('width'));	
		
		return(endPosX);	
	}

	drawDescBlock(){
		let stPosX = this.inputBlock.wdt + this.keyBlock.wdt;
		let descText = this.drawText(this.config.textVal.descText,stPosX);
		let endPosX = descText.wdt+stPosX;

		let descBlock = document.createElementNS(Block.xmlns, "path");		
		descBlock.setAttributeNS(null, "d", (`M${stPosX} 0 H${endPosX-Block.rRad} Q${endPosX},0 ${endPosX},${Block.rRad} V${50-Block.rRad} Q${endPosX},50 ${endPosX-Block.rRad},50 H${stPosX} Z`));
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
		super.eventsHandler();
		//use arrow-function from save link `this`
		this.wrapper.addEventListener('input',()=>{			

			let inputEl = this.wrapper.querySelector('.input_area');
			let spanEl = this.wrapper.querySelector('.measure_span');

			// resize inputArea
			spanEl.textContent = inputEl.value;	
			let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';
			
			let stPosX = this.keyBlock.wdt;
			let endPosX = stPosX + parseInt(inputWidth);
			this.inputBlock.el.setAttributeNS(null,"d", (`M${stPosX} 0 H${endPosX} V50 H${stPosX} Z`));

			// resize descArea
			let offsetX = parseInt(inputWidth) - 36;
			this.descBlock.el.setAttributeNS(null, "transform",`translate(${offsetX},0)`);

			//* svg g не имеет пути тк логический объект
			// stPosX = this.inputBlock.wdt + offsetX;
			// this.descBlock.el.setAttributeNS(null, "d",`M${stPosX} 0 H${endPosX-Block.rRad} Q${endPosX},0 ${endPosX},${Block.rRad} V${50-Block.rRad} Q${endPosX},50 ${endPosX-Block.rRad},50 H${stPosX} Z`);

			// resize svgBody
			console.log(offsetX);
			let svgBodyWdt = this.keyBlock.wdt + this.inputBlock.wdt + this.descBlock.wdt + offsetX;
			this.svgBody.setAttributeNS(null,"width",svgBodyWdt);
		})
	}		
}

class ColorBlock extends InputBlock{

	constructor(wrapper,config){
		super(wrapper,config);										
	}

	addInputArea(stPosX){
		let input = document.createElement('input');		
		input.className = "input_area";		
		input.setAttribute("type","color");		
					
		this.wrapper.append(input);		

		input.style.top = 7 +"px";
		input.style.left = stPosX +"px";
		let endPosX = parseInt(window.getComputedStyle(input, null).getPropertyValue('width'));	
		
		return(endPosX);	
	}
}

const blockAttr = {
	takeOff : {type:'default', colors:{bg:"#ed4a0f", font:'#fff'}, textVal:{keyText:'TAKE OFF'}},
	moveFwd : {type:'input', colors:{bg:"#4d97ff", font:'#fff'}, textVal:{keyText:'MOVE', descText:'forward'}},
	setCol : {type:'input', colors:{bg:"#04d200", font:'#fff'}, textVal:{keyText:'SET', descText:'color'}},
}

// console.log(blockAttr.takeOff);


let blockDef = document.getElementById('takeOff');
let blockMoveFwd = document.getElementById('moveFwd');
let blockColor = document.getElementById('setCol');

let block1 = new Block(blockDef, blockAttr.takeOff);
block1.init();

let block2 = new InputBlock(blockMoveFwd, blockAttr.moveFwd);
block2.init();

let block3 = new ColorBlock(blockColor, blockAttr.setCol);
block3.init();



//D&D methods on mouse events
//set dropzone
let dropArea = document.getElementById('block_drop_area');

function blMouseDown(){
	console.log(block1);
	// let parent = this.id;
	//identify the parent before creating a new block ?
	// console.log(this.textVal.keyText);


	let newBlockCont = document.createElement('div');
	newBlockCont.classList.add('block_container');
	newBlockCont.style.position = 'absolute';

	moveAt(event.pageX, event.pageY);

	function moveAt(ev) {
    	newBlockCont.style.left = ev.pageX - newBlockCont.offsetWidth / 2 + 'px';
    	newBlockCont.style.top = ev.pageY - newBlockCont.offsetHeight / 2 + 'px';
  	}

	newBlockCont.setAttribute('id','block_def');
	document.body.append(newBlockCont);

	let newBlock = new Block(newBlockCont, blockAttr.takeOff);
	newBlock.init();

	document.onmousemove = function(ev) {
    	moveAt(ev);
  	}
}

function blMouseUp(){
	// console.log(this);
	document.onmousemove = null;
	// this.onmouseup = null;
}