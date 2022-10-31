"use strict"


// const btn1 = document.getElementById('btnState');
// const btn2 = document.getElementById('btnOption');
// const btn3 = document.getElementById('btnData');

const b1Buttons = document.querySelectorAll('.b1_button');
console.log(b1Buttons);

function btnClick(text){
	console.log(text);
}

function btnMouseEnter(event){
	// console.log('mouseenter');
	// console.log(event.target.id);
	this.style.color="#0ab0ee";
	this.style.borderColor="#0ab0ee";
	this.style.boxShadow = "inset 0px 0px 8px 0px #0ab0ee";
	// console.log(event.target.children[0]);
	event.target.children[0].style.stroke="#0ab0ee";	
}

function btnMouseLeave(){
	// console.log('mouseleave');
	// console.log(event.target.id);
	this.style.color="";
	this.style.borderColor="";
	this.style.boxShadow = "";
	event.target.children[0].style.stroke="";	
}

// Присваивание EventListener в цикле
b1Buttons.forEach(b1_button => {
	 b1_button.addEventListener('mouseenter', btnMouseEnter);
	 b1_button.addEventListener('mouseleave', btnMouseLeave)
})



// function btnMouseOver(text){
// 	// alert(text);
// 	btn1.style.color="blue";
// }

// function btnMouseLeave(){	
// 	btn1.style.color='';
// }


