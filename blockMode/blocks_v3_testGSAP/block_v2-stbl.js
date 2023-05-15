"use strict"

// PATH lib
	// sharp corners:
		// let keyBlockPath1 = `M0 ${Block.rRad} Q0,0 ${Block.rRad},0 H30 L40 10 H60 L70 0 H${endPosX-Block.rRad} Q ${endPosX},0 ${endPosX},${Block.rRad}`;
		// let keyBlockPath2 = `V${50-Block.rRad} Q${endPosX},50 ${endPosX-Block.rRad},50 H70 L60 60 H40 L30 50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
	// equal rounding:
		// let keyBlockPath1 = `M0 ${Block.rRad} Q0,0 ${Block.rRad},0 H26 Q31,0 35,5 T44,10 H60 Q65,10 69,5 T78,0 H${endPosX-Block.rRad} Q ${endPosX},0 ${endPosX},${Block.rRad}`;
		// let keyBlockPath2 = `V${50-Block.rRad} Q${endPosX},50 ${endPosX-Block.rRad},50 H78 Q73,50 69,55 T60,60 H44 Q39,60 35,55 T26,50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
	// key less by 2:
		// let keyBlockPath1 = `M0 ${Block.rRad} Q0,0 ${Block.rRad},0 H26 Q31,0 35,5 T44,10 H60 Q65,10 69,5 T78,0 H${endPosX-Block.rRad} Q ${endPosX},0 ${endPosX},${Block.rRad}`;
		// let keyBlockPath2 = `V${50-Block.rRad} Q${endPosX},50 ${endPosX-Block.rRad},50 H76 Q71,50 67,55 T58,60 H46 Q41,60 37,55 T28,50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
		
class Block{

	static textPadding = 18;	
	static xmlns = "http://www.w3.org/2000/svg";
	static rRad = 8;
	// static KBminWdt = 80;
	// static hghT = 60;	
	// static minHxPos = 100;
	
	constructor(wrapper,config){
		const defaultConfig = {};
		this.config = Object.assign(defaultConfig, config);
		this.wrapper = wrapper;		
		// console.log(this.config);						
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
		textEl.setAttributeNS(null, "font-family", "Segoe UI");
		textEl.setAttributeNS(null, "alignment-baseline", "middle");
		
		this.svgBody.append(textEl);
		let textWdt = parseInt(textEl.getBBox().width)+(Block.textPadding*2);	
		
		return {el: textEl, wdt: textWdt};
	}

	drawKeyBlock(){
		let keyText = this.drawText(this.config.textVal.keyText, 0);

		let endPosX = keyText.wdt < 100 ? 100 : keyText.wdt;		
		//text alignment, when its width is less than 100 (note that drawText.wdt includes double padding)		
		let offsetX = ((endPosX - (keyText.wdt - Block.textPadding*2)) / 2);
		keyText.el.setAttributeNS(null, "x", offsetX);

		let keyBlock = document.createElementNS(Block.xmlns, "path");		
		let keyBlockPath1 = `M0 ${Block.rRad} Q0,0 ${Block.rRad},0 H26 Q31,0 35,5 T44,10 H60 Q65,10 69,5 T78,0 H${endPosX-Block.rRad} Q ${endPosX},0 ${endPosX},${Block.rRad}`;
		let keyBlockPath2 = `V${50-Block.rRad} Q${endPosX},50 ${endPosX-Block.rRad},50 H76 Q71,50 67,55 T58,60 H46 Q41,60 37,55 T28,50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
		
		if(this.constructor.name !== 'Block'){
			let endPosX = keyText.wdt < 80 ? 80 : keyText.wdt;
			let offsetX = ((endPosX - (keyText.wdt - Block.textPadding*2)) / 2);
			keyText.el.setAttributeNS(null, "x", offsetX);
			keyBlockPath1 = `M0 ${Block.rRad} Q0,0 ${Block.rRad},0 H26 Q31,0 35,5 T44,10 H60 Q65,10 69,5 T78,0 H${endPosX}`;
			keyBlockPath2 = `V50 H76 Q71,50 67,55 T58,60 H46 Q41,60 37,55 T28,50 H${Block.rRad} Q0,50 0,${50-Block.rRad} Z`;
		}

		keyBlock.setAttributeNS(null, "d", `${keyBlockPath1} ${keyBlockPath2}`);
		keyBlock.setAttributeNS(null,"id","key_block");

		// Gaps between svg paths?	
		// keyBlock.setAttributeNS(null,"stroke",this.config.colors.bg);
		// keyBlock.setAttributeNS(null,"stroke-width",'0');

		let keyGroup = document.createElementNS(Block.xmlns, "g");
		keyGroup.setAttributeNS(null, "id","key_block_group");
		keyGroup.append(keyBlock);
		keyGroup.append(keyText.el);

		this.svgBody.prepend(keyGroup);

		let groupWidth = keyGroup.getBBox().width;
		return {el: keyGroup, wdt: groupWidth};
	}

	eventsHandler(){
		// off default D&D
		this.wrapper.ondragstart = ()=>{
		  return false;
		};
		// set new EventListener
		// this.wrapper.addEventListener('mousedown', ()=>{			
		// 	blMouseDown(this);
		// });

		// from custom d&d:
		// this.wrapper.onmousedown = ()=>{
		// 	blMouseDown(this);
		// };

		let blockDnD = Draggable.create(this.wrapper,{
			dragClickables: false,
			autoScroll : 1,
			type: "left,top",
			onPress: onPress,			
			onDragStart: onDragStart,
			onDragStartParams: [this],
			
			onDrag: onDrag,
			onDragEnd: onDragEnd,
			onDragEndParams: [this],
		});
	}

	// clone only for GSAP D&D
	clone(){
		let palette = document.getElementById('palette');
		let newWrapper = document.createElement('div');
		newWrapper.classList.add('block_container');
		newWrapper.classList.add('clone');
		// newWrapper.style.position = 'absolute';
		// newWrapper.style.zIndex = '500';
		newWrapper.setAttribute('id',this.wrapper.id);		
		palette.insertBefore(newWrapper, this.wrapper);

		//init newBlock
		let newBlock = new this.constructor(newWrapper, this.config);
		newBlock.init();
		return newBlock;
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

		// Gaps between svg paths?
		// inputBlock.setAttributeNS(null,"stroke",this.config.colors.bg);
		// inputBlock.setAttributeNS(null,"stroke-width",'0');
	
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
			console.log(spanEl);
			// resize inputArea
			spanEl.textContent = inputEl.value;	
			let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';
			
			let stPosX = this.keyBlock.wdt;
			let endPosX = stPosX + parseInt(inputWidth);
			this.inputBlock.el.setAttributeNS(null,"d", (`M${stPosX} 0 H${endPosX} V50 H${stPosX} Z`));

			// resize descArea
			let offsetX = parseInt(inputWidth) - 36;
			this.descBlock.el.setAttributeNS(null, "transform",`translate(${offsetX},0)`);

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
	takeOff: {type:'default', colors:{bg:"#ed4a0f", font:'#fff'}, textVal:{keyText:'TAKEOFF'}},
	toLand:  {type:'default', colors:{bg:"#ed4a0f", font:'#fff'}, textVal:{keyText:'LAND'}},
	moveFwd: {type:'input', colors:{bg:"#4d97ff", font:'#fff'}, textVal:{keyText:'MOVE', descText:'forward'}},
	moveBwd: {type: InputBlock, colors:{bg:"#4d97ff", font:'#fff'}, textVal:{keyText:'MOVE', descText:'backward'}},	
	setCol:  {type:'input', colors:{bg:"#04d200", font:'#fff'}, textVal:{keyText:'SET', descText:'color'}},	
}

let blockTakeOff = document.getElementById('takeOff');
let blockLand = document.getElementById('toLand');
let blockMoveFwd = document.getElementById('moveFwd');
let blockMoveBwd = document.getElementById('moveBwd');
let blockColor = document.getElementById('setCol');

let block1 = new Block(blockTakeOff, blockAttr.takeOff);
block1.init();

let block2 = new Block(blockLand, blockAttr.toLand);
block2.init();

let block3 = new InputBlock(blockMoveFwd, blockAttr.moveFwd);
block3.init();

let block4 = new blockAttr.moveBwd.type(blockMoveBwd, blockAttr.moveBwd);
block4.init();

let block5 = new ColorBlock(blockColor, blockAttr.setCol);
block5.init();



//D&D methods on mouse events with GSAP
//set dropzone and palette
let dropArea = document.getElementById('block_drop_area');
let dropCont = document.getElementById('drop_container');

let leftSideBar = document.querySelector('.sidebar_inner');
let palette = document.getElementById('palette');

let shadePaletteTwin = gsap.to(palette,{duration:0.4, opacity:0.8, paused:true});


// Prototype01
function blMouseDown(obj){
	let dragObj = {}	
	let srcElem = obj;
	//get click position
	// console.log(event.clientX)
	// console.log(event.clientY)
	dragObj.srcElem = srcElem;
	dragObj.shiftX = event.clientX - obj.wrapper.getBoundingClientRect().left;
	dragObj.shiftY = event.clientY - obj.wrapper.getBoundingClientRect().top;
	dragObj.downX = event.pageX;
    dragObj.downY = event.pageY;	

  	document.onmousemove = onMouseMove
  	document.onmouseup = onMouseUp;

  	function onMouseMove(){
  		
  		//check mouse key
  		if (event.which != 1) return;
  		// if (!dragObj.srcElem) return;
	  	if (!dragObj.newBlock){
	  		let moveX = event.pageX - dragObj.downX;
	      	let moveY = event.pageY - dragObj.downY;
	      	if (Math.abs(moveX) < 6 && Math.abs(moveY) < 6) {
	        	return;
	      	}
	      	dragObj.newBlock = buildNewBlock();
	      	return;
	    }
	  	onMove(event.pageX, event.pageY);	  	
  	}

  	function onMove(pageX, pageY){	
    	// dragObj.newBlock.wrapper.style.left = pageX - dragObj.shiftX + 'px';
    	// dragObj.newBlock.wrapper.style.top = pageY - dragObj.shiftY + 'px';

    	let onMoveTwin = gsap.to(dragObj.newBlock.wrapper,{duration:0.2, left:pageX - dragObj.shiftX, top:pageY - dragObj.shiftY });
    	dragObj.elemBelow = findDropArea();    	
  	}

  	function buildNewBlock(){
  		shadePaletteTwin.play()	
	  	//build new block_container
		let newBlockCont = document.createElement('div');
		newBlockCont.classList.add('block_container');
		newBlockCont.style.position = 'absolute';
		newBlockCont.style.zIndex = '500';
		newBlockCont.setAttribute('id',obj.wrapper.id);
		// newBlockCont.addEventListener('mouseup',onMouseUp);
		document.body.append(newBlockCont);

		//init newBlock
		let newBlock = new obj.constructor(newBlockCont, obj.config);
		newBlock.init();
		return newBlock;
  	}

  	function onMouseUp(){
  		if (dragObj.newBlock){
  			finishDrag(event);
  		}
		document.onmousemove = null;
		document.onmouseup = null;		
	}

	function finishDrag(){
		let dropArea = findDropArea(event);
		
		dragObj.newBlock.wrapper.onmousedown = null;
		if(dragObj.elemBelow == null || dragObj.elemBelow.id != 'block_drop_area'){
			console.log(dropArea);
			interruptDrag();
		}		
	}

	function findDropArea(){

		dragObj.newBlock.wrapper.style.visibility = "hidden";
		let elem = document.elementFromPoint(event.clientX, event.clientY);		
		dragObj.newBlock.wrapper.style.visibility = "visible";

		if (elem == null) return null;
		return elem;
	}

	function interruptDrag(){
		shadePaletteTwin.reverse();
		let dropX = dragObj.srcElem.wrapper.getBoundingClientRect().left + window.pageXOffset;
		let dropY = dragObj.srcElem.wrapper.getBoundingClientRect().top + window.pageYOffset;

		let intDragTwin = gsap.to(dragObj.newBlock.wrapper,{duration:0.2, left:dropX, top:dropY, opacity:0, onComplete:remObj});
		
		function remObj(){
			dragObj.newBlock.wrapper.remove();
		}
	}
}

// Prototype02-------GSAP D&D---------
function onPress(){	
}

function onDragStart(obj){
	if(obj.wrapper.parentNode.id == 'palette'){

		let objRect = obj.wrapper.getBoundingClientRect();
		let newClone = obj.clone();

		this.target.style.position = 'absolute';		
		document.body.append(this.target);			
		
		gsap.set(this.target,{left:objRect.left, top:objRect.top + window.pageYOffset});
		this.update();	
	}
	shadePaletteTwin.play();	
}

function onDrag(pointerX, pointerY){
		
}

function onDragEnd(obj){
	if (this.hitTest(dropArea, "100%")){		
		 		
		dropArea.append(this.target);
		blockList.this = this;
	}
	else{
		let parEl = palette.querySelector(`#${this.target.id}`);
		let parRect = parEl.getBoundingClientRect();

		console.log('interruptDrag');		
		this.disable();		

		let intDragTwin = gsap.to(this.target,{duration:0.3, left:parRect.x, top:parRect.y + window.pageYOffset, opacity:0,onComplete:()=>{						
			this.target.remove();
		}});
	}
	shadePaletteTwin.reverse();
}


// Block list logic
let blockList = {};



