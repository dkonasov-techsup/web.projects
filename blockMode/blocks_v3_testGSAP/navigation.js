"use strict"

let page = document.querySelector('.page');
let sidebar = document.querySelector('.sidebar');

let tabs = document.getElementsByClassName('tabs_wrapper');

console.log(tabs);

let sbStat;



// evHandler > sidebar_toggle
function sidebar_toggle(){	
	sbStat = sidebar.classList.toggle('sidebar_open');	
	resizePage();
}

// Sidebar position (в зависмости от скрола документа)
document.addEventListener("DOMContentLoaded", stickSidebar)
document.addEventListener("scroll",stickSidebar);

function stickSidebar(){
	let pageScrl = parseInt(window.pageYOffset);
	if (pageScrl <= 41){
		sidebar.style.top = (41-pageScrl) + "px";
	}
	else{
		sidebar.style.top = 0 + "px";
	} 
}

// Page position (в зависмости от сайдбара)
function resizePage(){
	// console.log(sbStat);	
	let sbWdt = sidebar.getBoundingClientRect().width;
	if(sbStat){ page.style.paddingLeft = sbWdt + "px"; }
	else{ page.style.paddingLeft = ""; }
}


// Tabs
class Tabs{
	constructor(config){

	}
}


