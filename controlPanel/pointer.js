"use strict"

const workSpace = document.querySelector('.pointer_workspace')

workSpace.addEventListener('mousemove', pointerActive)
workSpace.addEventListener('mouseenter', pointerActive)
workSpace.addEventListener('mouseleave', pointerActive)

const rulerX = document.querySelector('.rulerX');
const rulerY = document.querySelector('.rulerY');
const positionCell = document.querySelector('.posValue');

function pointerActive(event){

	if(event.type == "mouseenter"){
		rulersShow();
	}
	if(event.type == "mouseleave"){
		rulersHide();
	}
	rulersTracking(event);
	console.log(event.type);	
}


function rulersShow(){	
	rulerX.style.display = "block";
	rulerY.style.display = "block";
}

function rulersHide(){	
	rulerX.style.display = "none";
	rulerY.style.display = "none";

	positionCell.textContent = 0;
	console.log(positionCell.textContent)
}

function getPosition(event){
	const target = event.target.getBoundingClientRect();	
	let x = event.clientX - target.left;
	let y = event.clientY - target.top;	
	return [x,y];
}

function rulersTracking(event){
	let coords = getPosition(event)		

	rulerX.style.left = coords[0] + "px";
	rulerY.style.top = coords[1] + "px";		

	positionCell.textContent = coords[0]+" : "+coords[1];
	console.log(positionCell.textContent);
}