"use strict"

const sys = {
 state:true 
}

const b1Buttons = document.querySelectorAll('.b1_button');
const b1CheckBox = document.querySelectorAll('.b1_switch > input');
const b1States = document.querySelectorAll('.stateLine > input');
// console.log(b1Buttons);
// console.log(b1CheckBox);
// console.log(b1States);

// Присваивание EventListener кнопкам в цикле
b1Buttons.forEach(b1_button => {
	 b1_button.addEventListener('mouseenter', btnMouseEnter);
	 b1_button.addEventListener('mouseleave', btnMouseLeave);
	 b1_button.addEventListener('click', btnClick);
})

// Обработчики событий для b1_button
function btnMouseEnter(event){
	// console.log('mouseenter');
	// console.log(event.target.id);
	this.style.color="#33d0ff";
	this.style.borderColor="#33d0ff";
	this.style.boxShadow = "inset 0px -2px 20px 10px #161616";
	// console.log(event.target.children[0]);
	event.target.children[0].style.stroke="#33d0ff";	
}

function btnMouseLeave(event){
	// console.log('mouseleave');
	// console.log(event.target.id);
	this.style.color="";
	this.style.borderColor="";
	this.style.boxShadow = "";
	event.target.children[0].style.stroke="";	
}


function btnClick(event){

	let block = (event.path[1]);
	if (block.id == "s1block1"){

		let genStateLine = event.path[1].children[1].children[0].cloneNode(true);
		event.path[1].children[1].append(genStateLine);
	}
}

//Обработка чекбоксов
//Коллекция для хранения всех b1_checkbox и состояний
const checkBoxState = new Map()

// Присваивание EventListener чекбоксам в цикле + заполнение коллекции checkBoxState текущими значениями
b1CheckBox.forEach(input =>{	
	input.addEventListener('change',checkBoxChange);
	checkBoxState.set(input.id, checkBoxChecked(input));		
})

//Считываем текущие значения
function checkBoxChecked(input){
	return (input.checked) ? true : false;
}
console.log(checkBoxState);	


//обработчик события 'change'
function checkBoxChange(){
	checkBoxState.set(this.id, this.checked);
	console.log(checkBoxState);
	setValue(this.id);
}

// Логика отображения статусов и их генерация
// Коллекция всех имеющихся статусов (в идеале вероятно подтягивать с бд сервера)
// not used now

const mainState = [
	{id:'b1_val0', name:'System status',	   label:'val0'},
	{id:'b1_val1', name:'1-st module status:', label:'val1'},
	{id:'b1_val2', name:'2-st module status:', label:'val2'},
	{id:'b1_val3', name:'3-st module status:', label:'val3'},
	{id:'b1_val4', name:'4-st module status:', label:'val4'},
	{id:'b1_val5', name:'5-st module status:', label:'val5'}
]

const stateLines = new Map()

mainState.forEach(item => {
	let newStateLine = document.createElement('div');
	newStateLine.classList = "stateLine";
	let body = (`<label for="${item.label}">${item.name}</label><input type = "text" name = "${item.label}" id = "${item.id}" readonly>`);
	newStateLine.insertAdjacentHTML('afterbegin', body);
	stateLines.set(item.id, newStateLine);	
})

console.log(stateLines);



// Указываем зависимость статуса от чекбокса если таковая имеется
const states = new Map;
	states.set(b1CheckBox[0].id, b1States[0])
		  .set(b1CheckBox[1].id, b1States[1])
		  .set(b1CheckBox[2].id, b1States[2])

//Первоначальная проверка
states.forEach((value, key) => setValue(key));


function setValue(id){
	if(checkBoxState.get(id) == true){
	states.get(id).value ="ON";
	states.get(id).style.color = "#18f15a";
	}
	else{
	states.get(id).value ="OFF";
	states.get(id).style.color = "#a7a7a7";
	}
}

// Ловим всплывающее событие 'change' от чекбоксов 
document.body.addEventListener('change', handler1);

function handler1(event){
	//Регулярная проверка первого чекбокса	
	if(checkBoxState.get('b1_checkbox1')==false){
		sysOff();
	}
	else{sysOn();}
}

function sysOn(){
	msgWrapperRecovery(true)
	sys.state = true;
}

function sysOff(){
	if (sys.state == false){msgBlink()}
	sys.state = false;	
	b1CheckBox.forEach(input =>{	
		input.checked = false;
		checkBoxState.set(input.id, checkBoxChecked(input));
		setValue(input.id);		
	})
	console.log(checkBoxState);
	msgWrapperRecovery(false)
}	


// -----------------------------------
// Генерация и логика уведомлений
// Генерация блока
let msgWrapper = document.createElement('div');
let msgCont = document.createElement('div');
let msg = document.createTextNode('System is disabled! All functions are not available!');
msgCont.appendChild(msg);
msgWrapper.appendChild(msgCont);
msgWrapper.className = "msgWrapper";
msgCont.className = "msgCont";

document.body.prepend(msgWrapper);
let msgWrapperDiv = document.querySelectorAll('.msgWrapper')[0];
let msgContDiv = document.querySelectorAll('.msgCont')[0];

//Параметры анимации для msgWrapper и потомков
function msgWrapperRecovery(val){
	// Обязательный запрос просчитанных стилей?
	// window.getComputedStyle(msgWrapperDiv).top;
	// window.getComputedStyle(msgWrapperDiv).opacity;

	msgWrapperDiv.style.top = val ? "-38px" : "0px";
	msgContDiv.style.opacity = val ? "0%" : "80%";
	//Раскидать через if удаление элемента из DOM ?
}

function msgBlink(){
	msgContDiv.style.boxShadow = "inset 0px 0px 30px 0px #780000";
	setTimeout(function(){msgContDiv.style.boxShadow = ""},800)	
}

