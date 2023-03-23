"use strict"

let sidebar = document.querySelector('.sidebar')


// Обработчик события sidebar_toggle
function sidebar_toggle(){	
	sidebar.classList.toggle('sidebar_open');
}


// Положение sidebar в зависмости от скрола документа
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

