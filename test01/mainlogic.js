"use strict"

// const btn1 = document.getElementById('btnState');
// const btn2 = document.getElementById('btnOption');
// const btn3 = document.getElementById('btnData');

const b1Buttons = document.querySelectorAll('.b1_button');
const b1CheckBox = document.querySelectorAll('.b1_switch > input');
const b1States = document.querySelectorAll('.b1_form > input');
console.log(b1Buttons);
console.log(b1CheckBox);
console.log(b1States);

function btnClick(text){
	console.log(text);
}

// Присваивание EventListener кнопкам в цикле
b1Buttons.forEach(b1_button => {
	 b1_button.addEventListener('mouseenter', btnMouseEnter);
	 b1_button.addEventListener('mouseleave', btnMouseLeave);
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

// Логика отображения статусов
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
	//cтатус 1-го чекбокса
	if(checkBoxState.get('b1_checkbox1')==false){
		sysOff();
	}
	else{
	}
}



function sysOff(){
	for(let i=1; i<checkBoxState.size; i++){
		checkBoxState.set(i)=false;
		// console.log('aa');
	}
	console.log('system OFF');
	console.log(checkBoxState);
}

// -----------------------------------
// Генерация и логика всплывающих узлов

let msgWrapper = document.createElement('div');
let msgCont = document.createElement('div');
msgWrapper.appendChild(msgCont);
msgWrapper.className = "msgWrapper";
msgCont.className = "msgCont";


// document.body.prepend(msgWrapper);

// Вызов при отключении системы