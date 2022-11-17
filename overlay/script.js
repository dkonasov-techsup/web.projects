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
}




