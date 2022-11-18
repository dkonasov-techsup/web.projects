"use strict"


window.onload = function(){
	console.log('i worked too');
	callMsg();
}

function callMsg(){
	let bgWrapper =  document.createElement('div');
	bgWrapper.className = "bgWrapper";

	let msgBlock = document.createElement('div');
	msgBlock.className = "msgBlock";
	bgWrapper.appendChild(msgBlock);	

	msgBlock.insertAdjacentHTML('afterbegin','<div class = "btn01"><span>HOVER</span></div>');


	document.body.prepend(bgWrapper);
	bgWrapper.style.display = "block";
	
	setTimeout(function(){bgWrapper.style.opacity = "1";},20)

	let btn01 = document.querySelectorAll('.btn01')[0];
	btn01.addEventListener('mouseenter', btn01mouseEnter);
	btn01.addEventListener('mouseleave', btn01mouseLeave);
	console.log(btn01);
}

function btn01mouseEnter(){
	console.log(event);
}

function btn01mouseLeave(){
	console.log(event);	
}
