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
	msgBlock.classList.add('msgBlockHidden')

	bgWrapper.appendChild(msgBlock);
	msgBlock.insertAdjacentHTML('afterbegin','<div class = "btn01"><span>HOVER</span></div>');
	
	bgWrapper.addEventListener('transitionstart', function(){
		setTimeout(function(){
			console.log('ss')
			msgBlock.classList.remove('msgBlockHidden');
		},300)
	})

	document.body.prepend(bgWrapper);
	bgWrapper.style.display = "block";
	
	setTimeout(function(){bgWrapper.style.opacity = "1";},20)
}




