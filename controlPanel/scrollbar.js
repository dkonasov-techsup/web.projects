"use strict"

let scrList = document.querySelectorAll('.scrolable');


// Заполняем массив с родителями имеющими внутри прокручиваемый дочерний элемент 

const contList = [];
function getContainer(scrList){	
	scrList.forEach((item,index)=>{
		contList[index] = item.parentNode;		
	})
}
getContainer(scrList)


// Добавляем контейнер с скролбаром
function addScrollbar(contList){
	const scrollbar = '<div class="scrollbar"><div class="scrollbar_track"><div class="scrollbar_thumb"></div></div></div>'
	for(const cont of contList){
		console.log(cont);
		cont.insertAdjacentHTML('beforeend', scrollbar);
	}
}
addScrollbar(contList)


// Отслеживаем нажатие на scrollbar_thumb
const thumbs = document.querySelectorAll('.scrollbar_thumb');

for(let thumb of thumbs){	
	thumb.addEventListener('mousedown', startScroll);
	// thumb.addEventListener('mouseup', stopScroll);
	thumb.ondragstart = function(){
		return false;
	}	
}

function startScroll(event){
	console.log('startScroll');

	let activeThumb = event.target;
	let activeTrack = event.target.closest('.scrollbar_track')
	

	// let pointer = event.target.closest('#pointer');

	document.addEventListener('mousemove', moveThumb);
	document.addEventListener('mouseup', stopThumb);

	function moveThumb(event){

		let thumbPos = Number(activeThumb.style.left);
		console.log(thumbPos);

		// if (thumbPos <= 20){
		// 	return false;
		// 	// stopThumb();
		// }

		console.log(activeThumb.style.left);


		let track = activeTrack.getBoundingClientRect()

		activeThumb.style.left = ((event.clientX - track.left) + activeThumb.offsetWidth / 2) + "px";
		 

	}

	function stopThumb(event){
		console.log('stopScroll');
		document.removeEventListener('mousemove', moveThumb);
		document.removeEventListener('mouseup', stopThumb);
		
	}

}




