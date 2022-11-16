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
	
	
	
	setTimeout(displayMsg,0) 

	function displayMsg(){			
		document.body.prepend(bgWrapper);
	}
	
	setTimeout(function(){
		console.log(bgWrapper);
		window.getComputedStyle(bgWrapper).opacity;
		bgWrapper.style.display = "block";
		bgWrapper.style.opacity = "1";
	},5000)

}




