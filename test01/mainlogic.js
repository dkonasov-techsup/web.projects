"use strict"


// const btn1 = document.getElementById('btnState');
// const btn2 = document.getElementById('btnOption');
// const btn3 = document.getElementById('btnData');

const cBox1 = document.getElementById('b1_checkbox1');


const b1Buttons = document.querySelectorAll('.b1_button');
const b1CheckBox = document.querySelectorAll('.b1_switch input');
console.log(b1Buttons);
console.log(b1CheckBox);


function btnClick(text){
	console.log(text);
}

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

// Присваивание EventListener кнопкам в цикле
b1Buttons.forEach(b1_button => {
	 b1_button.addEventListener('mouseenter', btnMouseEnter);
	 b1_button.addEventListener('mouseleave', btnMouseLeave);
})

// arr.forEach(addEventListener('checked', f1){
// 	b1CheckBox;
// })
	

function f1(event){
	if(this.checked){
		console.log('checked');
	}
	else{
		console.log('unchecked');
	}
}

// cBox1.addEventListener('change',f1);





// Присваивание EventListener чекбоксам
// b1CheckBox.forEach(b1_switch => {
// 	 b1_switch.addEventListener('change', function(event){
// 	 	console.log(1);
// 	 });
// })







