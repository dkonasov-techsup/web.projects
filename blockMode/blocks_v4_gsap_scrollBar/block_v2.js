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
	
	constructor(wrapper, config){
		const defaultConfig = {};		
		this.config = Object.assign(defaultConfig, config);
		this.wrapper = wrapper;								
	}

	init(){
		let svgBody = this.svgBody = document.createElementNS(Block.xmlns, "svg");		
		svgBody.setAttributeNS(null, "id", "svg_body");
		svgBody.setAttributeNS(null, "height", "60");		
		svgBody.setAttributeNS(null, "fill", this.config.colors.bg);
		
		this.wrapper.append(svgBody);
		this.keyBlock = this.drawKeyBlock();
		this.resizeSvg();
		this.eventsHandler();							
	}

	resizeSvg(){
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
		textEl.setAttributeNS(null, "dominant-baseline", "middle");
		
		this.svgBody.append(textEl);
		let textWdt = parseInt(textEl.getBBox().width)+(Block.textPadding*2);	
		
		return {el: textEl, wdt: textWdt};
	}

	drawKeyBlock(){
		let keyText = this.drawText(this.config.textVal.keyText, 0);
		// console.log(keyText);

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
		// this.wrapper.ondragstart = ()=>{
		//   return false;
		// };

		// from custom d&d:
		// this.wrapper.onmousedown = ()=>{
		// 	blMouseDown(this);
		// };

		let blockDnD = Draggable.create(this.wrapper,{
			dragClickables: false,
			autoScroll : 0,
			type: "left,top",
			onPress: onPress,			
			onDragStart: onDragStart,
			onDragStartParams: [this],
			
			onDrag: onDrag,
			onDragParams: [this],
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

	constructor(wrapper, config){
		super(wrapper, config);
		this.inpValue = config.inpDefVal;										
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
		this.resizeSvg();
		this.eventsHandler();			
	}

	drawInputBlock(){
		let stPosX = this.keyBlock.wdt;
		let inputArea = this.addInputArea(stPosX);
		let endPosX = inputArea.wdt + stPosX;

		let inputBlock = document.createElementNS(Block.xmlns, "path");		
		inputBlock.setAttributeNS(null,"d", (`M${stPosX} 0 H${endPosX} V50 H${stPosX} Z`));
		inputBlock.setAttributeNS(null,"id","input_block");

		// Gaps between svg paths?
		// inputBlock.setAttributeNS(null,"stroke",this.config.colors.bg);
		// inputBlock.setAttributeNS(null,"stroke-width", 0);

		// Test how <g> in svg affects rendering
		// let inputGroup = document.createElementNS(Block.xmlns, "g");
		// inputGroup.setAttributeNS(null, "id","input_block_group");
		// inputGroup.append(inputBlock);
	
		this.svgBody.append(inputBlock);
		let blockWidth = inputBlock.getBBox().width;
		return {el: inputBlock, wdt: blockWidth, input:inputArea};
	}

	addInputArea(stPosX){
		let input = document.createElement('input');
		input.className = "input_area";		
		input.setAttribute("type","text");
		input.setAttribute("maxlength","6"); //for HTML5
		input.value = this.inpValue;
		//more attribute in styles

		let spanEl = document.createElement('span');
		spanEl.className = "measure_span";
					
		this.wrapper.append(input);
		this.wrapper.append(spanEl);

		input.style.top = spanEl.style.top = 7 + "px";
		input.style.left = spanEl.style.left = stPosX + "px";
		// input.style.width = this.resizeInputArea(input,spanEl) + "px";

		spanEl.textContent = input.value;	
		let inputWidth = input.style.width = spanEl.offsetWidth + 'px' 
		input.style.width = inputWidth;

		let endPosX = input.getBoundingClientRect().width;		
		
		return{el:input, wdt:endPosX};	
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
		let blockWidth = descBlock.getBoundingClientRect().width;
		return {el: descGroup, wdt: blockWidth};
	}

	eventsHandler(){
		super.eventsHandler();
		// Fix for chrome stop the bubbling of the change event
		// Need update to track current block value
		let inputEl = this.wrapper.querySelector('.input_area');
		inputEl.addEventListener('change',(e)=>{
			e.stopImmediatePropagation();
		})

		//use arrow-function from save link `this`
		this.wrapper.addEventListener('input',(e)=>{	

			// return inputEl.type == "color" ? false : true;
			if(inputEl.type=="color"){return};

			this.resizeInputArea();			
			this.resizeDescBlock();			
			this.resizeSvg();			
		})
	}

	resizeInputArea(){
		let inputEl = this.wrapper.querySelector('.input_area');
		let spanEl = this.wrapper.querySelector('.measure_span');

		spanEl.textContent = inputEl.value;	
		let inputWidth = inputEl.style.width = spanEl.offsetWidth + 'px';
		
		// resize inputBlock
		let stPosX = this.keyBlock.wdt;
		let endPosX = stPosX + parseInt(inputWidth);
		this.inputBlock.el.setAttributeNS(null,"d", (`M${stPosX} 0 H${endPosX} V50 H${stPosX} Z`));
		return inputEl.style.width;
	}

	resizeDescBlock(){
		let offsetX = this.inputBlock.el.getBoundingClientRect().width - this.inputBlock.wdt;
		this.descBlock.el.setAttributeNS(null, "transform",`translate(${offsetX},0)`);
	}		
}

//UP in VERSION (use one path)
class UpdBlock{

	static xmlns = "http://www.w3.org/2000/svg";
	static rRad = 8;
	static textPadding = 18;

	constructor(wrapper, config){
		const defaultConfig = {};		
		this.config = Object.assign(defaultConfig, config);
		this.wrapper = wrapper;
		this.content = {};								
	}

	init(){
		let svgBody = this.svgBody = document.createElementNS(Block.xmlns, "svg");
			svgBody.setAttributeNS(null, "id", "svg_body");
			svgBody.setAttributeNS(null, "height", "64");		
			svgBody.setAttributeNS(null, "fill", this.config.colors.bg);
		
		this.wrapper.append(svgBody);		 
		this.content.textArea1 = this.addTextArea(this.config.textVal.keyText,0);
		
		this.renderSvg();
		this.eventsHandler();
	}
	
	addTextArea(textVal,xPos){
		console.log(this.content); 
		let textEl = document.createElement('text');
			textEl.classList.add('block_textArea');
		let textNode = document.createTextNode(textVal);

		this.wrapper.append(textEl);

		textEl.appendChild(textNode);		
		textEl.style.left = xPos + "px";
		textEl.style.top = 16 + "px"; //16? calc normal height
		textEl.style.color =  this.config.colors.font;
		textEl.style.whiteSpace = "nowrap";		

		let textRect = textEl.getBoundingClientRect();
		let textWdt = parseInt(textRect.width)+(UpdBlock.textPadding*2);
		textEl.style.width = textWdt + "px";


		return {el: textEl, wdt: textWdt};
	}

	renderSvg(obj){
		if(this === obj){
			// console.log(this.svgBody.children[0])
			this.svgBody.children[0].remove();
		}

		let contWdt = this.calcWdt();
		let endPosX = contWdt;

		this.svgBody.setAttributeNS(null, "width", endPosX);

		let path = document.createElementNS(UpdBlock.xmlns, "path");		
		let path1 = `M0 ${UpdBlock.rRad} Q0,0 ${UpdBlock.rRad},0 H26 Q31,0 35,5 T44,10 H60 Q65,10 69,5 T78,0 H${endPosX-UpdBlock.rRad} Q ${endPosX},0 ${endPosX},${UpdBlock.rRad}`;
		let path2 = `V${50-UpdBlock.rRad} Q${endPosX},50 ${endPosX-UpdBlock.rRad},50 H76 Q71,50 67,55 T58,60 H46 Q41,60 37,55 T28,50 H${UpdBlock.rRad} Q0,50 0,${50-UpdBlock.rRad} Z`;

		path.setAttributeNS(null, "d", `${path1} ${path2}`);
		path.setAttributeNS(null,"id","path");
		// path.setAttributeNS(null,"stroke-width","1");
		// path.setAttributeNS(null,"stroke","#fff");

		this.svgBody.prepend(path);
	}

	eventsHandler(){
		const blockDnD = Draggable.create(this.wrapper,{
			  dragClickables: false,
			  autoScroll : 0,
			  type: "left,top",
			  onPress: onPress,			
			  onDragStart: onDragStart,
			  onDragStartParams: [this],
			  
			  onDrag: onDrag,
			  onDragParams: [this],
			  onDragEnd: onDragEnd,
			  onDragEndParams: [this],
		});
	}

	calcWdt(){
		let content = this.content;
		// console.log(content);
		let sumWidth = 0;
		for(const part of Object.keys(content)){
			// console.log(content[part]);
			let curWidth = content[part].wdt;
			sumWidth += curWidth;
		}
		this.content.sumWdt = sumWidth;
		return sumWidth;			
	}
}

class UpdInputBlock extends UpdBlock{

	constructor(wrapper, config){
		super(wrapper, config);
		this.inpValue = config.inpDefVal;
		this.content = [];												
	}

	init(){
		let svgBody = this.svgBody = document.createElementNS(Block.xmlns, "svg");
			svgBody.setAttributeNS(null, "id", "svg_body");
			svgBody.setAttributeNS(null, "height", "60");		
			svgBody.setAttributeNS(null, "fill", this.config.colors.bg);
		
		this.wrapper.append(svgBody);
		 
		this.buildContent();
		this.renderSvg();		
		this.eventsHandler();
	}

	buildContent(){ // buildArea1
		Object.defineProperty(this.content, "sumWdt", { value: 0, configurable: true, writable: true, enumerable: false });

		// this.content.textArea1 = this.addTextArea(this.config.textVal.keyText, 0);
		// this.content.inputArea1 = this.addInputArea(this.calcWdt());
		// this.content.textArea2 = this.addTextArea(this.config.textVal.descText, this.calcWdt());
		// this.content.inputArea2 = this.addInputArea(this.calcWdt());
		// this.content.textArea3 = this.addTextArea(this.config.textVal.descText, this.calcWdt());

		this.content.push(this.addTextArea(this.config.textVal.keyText, 0));		
		this.content.push(this.addInputArea(this.calcWdt()));
		this.content.push(this.addTextArea(this.config.textVal.descText,this.calcWdt()));
		this.content.push(this.addInputArea(this.calcWdt()));
		this.content.push(this.addTextArea(" ",this.calcWdt()));
	}

	addInputArea(stPosX){
		let input = document.createElement('input');
			input.className = "input_area";		
			input.setAttribute("type","text");
			input.setAttribute("maxlength","6"); //for HTML5
			input.value = this.inpValue;
			//more attribute in styles

		let spanEl = document.createElement('span');
			spanEl.className = "measure_span";
					
		this.wrapper.append(input);
		this.wrapper.append(spanEl);

		input.style.top = spanEl.style.top = 7 + "px";
		input.style.left = spanEl.style.left = stPosX + "px";		

		//set first width for placeholder
		spanEl.textContent = input.value;	
		let inputWidth = spanEl.offsetWidth; 
		input.style.width = inputWidth + 'px';

		// mb use obj.offsetLeft?
			
		return{el:input, span:spanEl, wdt:inputWidth};	
	}

	resizeInputArea(e){
		console.log(e);
		// console.log(input);
		// console.log(input.offsetLeft);
		let inputEl = area.el;
		let spanEl = area.span;

		spanEl.textContent = inputEl.value;	
		let inputWidth = area.wdt = spanEl.offsetWidth; 
		inputEl.style.width = inputWidth + 'px';

		// console.log(this.content.inputArea1);
		// area.wdt = inputWidth;
	}

	eventsHandler(){

		super.eventsHandler();

		this.wrapper.addEventListener('input',(e)=>{
			this.resizeInputArea(e);
			// this.buildContent();	
			this.renderSvg(this);
			// return inputEl.type == "color" ? false : true;
			// if(inputEl.type=="color"){return};			
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
		input.value = this.inpValue;		
						
		this.wrapper.append(input);		

		input.style.top = 7 +"px";
		input.style.left = stPosX +"px";
		let endPosX = parseInt(window.getComputedStyle(input, null).getPropertyValue('width'));	
		
		return{el:input, wdt:endPosX};	
	}
}

const BLOCK_OPTION = {
	takeOff:  {type: Block, 		contId: "takeOff",  colors:{bg:"#ed4a0f", font:'#fff'}, textVal:{keyText:'TAKEOFF'}},
	toLand:   {type: Block, 		contId: "toLand",   colors:{bg:"#ed4a0f", font:'#fff'}, textVal:{keyText:'LAND'}},
	moveFwd:  {type: InputBlock, 	contId: "moveFwd",  colors:{bg:"#4d97ff", font:'#fff'}, textVal:{keyText:'MOVE', descText:'forward'},  inpDefVal:0.56},
	moveBwd:  {type: InputBlock, 	contId: "moveBwd",  colors:{bg:"#4d97ff", font:'#fff'}, textVal:{keyText:'MOVE', descText:'backward'}, inpDefVal:0.56},
	moveLft:  {type: InputBlock, 	contId: "moveLft",  colors:{bg:"#4d97ff", font:'#fff'}, textVal:{keyText:'MOVE', descText:'left'},     inpDefVal:0.56},
	moveRght: {type: InputBlock, 	contId: "moveRght", colors:{bg:"#4d97ff", font:'#fff'}, textVal:{keyText:'MOVE', descText:'right'},    inpDefVal:0.56},
	setPause: {type: InputBlock, 	contId: "setPause", colors:{bg:"#b703fb", font:'#fff'}, textVal:{keyText:'PAUSE', descText:'msec'},    inpDefVal:1000},	
	setCol:   {type: ColorBlock, 	contId: "setCol",   colors:{bg:"#04d200", font:'#fff'}, textVal:{keyText:'SET',  descText:'color'},	   inpDefVal:'#027800'},
	deBug:    {type: UpdInputBlock, contId: "deBug",   colors:{bg:"#000", font:'#fff'}, textVal:{keyText:'I FKNG DEBUG BLOCK',  descText:'I RULE THE CHAOS'}, inpDefVal:'>_<'},	
}

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

	console.log(event);

	if(obj.wrapper.parentNode.id == 'palette'){
		 
		let objRect = obj.wrapper.getBoundingClientRect();
		let newClone = obj.clone();

		this.target.style.position = 'absolute';		
		document.body.append(this.target);			
		
		gsap.set(this.target,{left:objRect.left, top:objRect.top + window.pageYOffset});
		this.update();	
	}

	if(obj.wrapper.parentNode.id =='block_drop_area'){
		let pos = blc1.blockList.indexOf(obj);	
		let deleted = blc1.blockList.splice(pos,1);
		console.log('Deleted: ',deleted);
	}

	shadePaletteTwin.play();	
}

function onDrag(obj){
	if(this.hitTest(dropArea, "100%") && (blc1.blockList.length >= 2)){
		blc1.updPos(obj);
	}		
}

function onDragEnd(obj){	
	console.log(event);

	if (this.hitTest(dropArea, "100%")){		 		
		dropArea.append(this.target);
		blc1.addBlock(obj,blc1.blockList);		
	}
	else{
		let parEl = palette.querySelector(`#${this.target.id}`);
		let parRect = parEl.getBoundingClientRect();

		console.log('interruptDrag');		
		this.disable();		

		let intDragTwin = gsap.to(this.target,{duration:0.3, left:parRect.x, top:parRect.y + window.pageYOffset, opacity:0,onComplete:()=>{						
			this.target.remove();
		}});
		blc1.renderBlocks();
	}
	shadePaletteTwin.reverse();
}

// Block list logic
class BlockList{

	constructor(config){
		const defaultConfig = {};
		this.config = Object.assign(defaultConfig, config);
		this.type = this.config.type;
		this.wrapper = this.config.wrapper;
		this.blockList = this.initBlockList(config);		
	}

	initBlockList(){
		let newBlockList = [];
		if(this.config.reqSeq){
			newBlockList = Array.from(this.config.reqSeq, (el)=>{
				let blockAttr = BLOCK_OPTION[el];
				let blockType = blockAttr.type;
				let newWrapper = document.createElement('div');
					newWrapper.classList = "block_container";
					newWrapper.id = blockAttr.contId; 
					this.wrapper.append(newWrapper)
				
				let newBlock = new blockType(newWrapper, blockAttr);
				newBlock.init();
				return newBlock;				
			});	
		}		
		return newBlockList;
	}

	setWrpHeight(){
		let list = this.blockList;
		let listBoxHght = calc(list);
		
		function calc(list){
			let sumHght = 0;
			list.forEach((el,i)=>{
				let curHght = el.wrapper.getBoundingClientRect().height;
				sumHght += curHght;
			})
			return sumHght;
		}
		this.wrapper.style.height = listBoxHght + 'px';				
	}

	updPos(obj){
		console.log(blc1);
		let objRect = obj.wrapper.getBoundingClientRect();
		let upper = [];		
		let lower = [];
		let elRect;
		blc1.blockList.forEach(function(el, i){
			
			elRect = el.wrapper.getBoundingClientRect();				
			if(objRect.y >= elRect.y){
				upper.unshift(el);																												
			}
			else{
				lower.push(el);				
			}			
		})
	}

	addBlock(obj,blockList){
		let newPos = 0;		
		let objRect = obj.wrapper.getBoundingClientRect();
					
		blockList.forEach(function(el, i){
			let elRect = el.wrapper.getBoundingClientRect();				
			if(objRect.y >= elRect.y){
				newPos = i + 1;					
			}				
		})

		blockList.splice(newPos, 0, obj);		
		this.renderBlocks();		
	}

	renderBlocks(){
		let newXpos = this.blockList[0].wrapper.getBoundingClientRect().left;
		let newYpos = this.blockList[0].wrapper.getBoundingClientRect().top + window.pageYOffset;

		this.blockList.forEach(function(el, i){
			gsap.to(el.wrapper,{duration:0.3, left:newXpos, top:newYpos});
			newYpos += el.wrapper.getBoundingClientRect().height;
		});
	}	
}

//Block sequence for new list(Palette + workspaceList)
const sbPaletteReqSeq = ['deBug', 'takeOff', 'toLand', 'moveFwd', 'moveBwd', 'moveLft', 'moveRght', 'setPause', 'setCol', 'toLand', 'moveFwd', 'moveBwd', 'setCol'];
const sbPalette = new BlockList({type:'sbPalette', reqSeq:sbPaletteReqSeq, wrapper: palette});
sbPalette.setWrpHeight(); //test 

let blc1 = new BlockList({type:'pattern0', reqSeq:[]});

console.log(sbPalette,blc1);
//Добавить для отладки тестовый лист с последовательностью. 

