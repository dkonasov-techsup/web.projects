"use strict"

const workSpace = document.querySelector('.pointer_workspace')

workSpace.addEventListener('mousemove', pointerActive)

function pointerActive(event){
	// getPosition(event)
	// drawRulers()
	rulersTracking(event)
}


function getPosition(event){
	const target = event.target.getBoundingClientRect();	
	let x = event.clientX - target.left;
	let y = event.clientY - target.top;	
	return [x,y];
}

function rulersTracking(event){
	let coords = getPosition(event)
	console.log(coords[0],coords[1]);

	const rulerX = document.querySelector('.rulerX');
	const rulerY = document.querySelector('.rulerY');	

	// rulerX.style.display = "block";
	rulerX.style.marginLeft = coords[0] + "px";
	// rulerY.style.marginTop = coords[1] + "px";
}