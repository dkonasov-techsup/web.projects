(function(){
	"use strict"

	class ScrollBar{
		constructor(container){
			this.viewport = container;
			this.scrollable = container.querySelector('.scrolable');
			this.init();		
		}
		init(){
			this.viewportWidth = this.viewport.offsetWidth;
			this.scrollableWidth = this.scrollable.scrollWidth;

			if (this.viewportWidth >= this.scrollableWidth) return;

			this.maxScroll = this.viewport.clientWidth - this.scrollableWidth;
			this.ratio = this.viewportWidth / this.scrollableWidth;

			this.createScrollbar();
			this.registerEventsHandler();			
		}

		createScrollbar(){

		}

		registerEventsHandler(){
			
		}

	}

	const containers  = document.querySelectorAll('.viewport');
	for(let container of containers){
		const scrollbar = new ScrollBar(container);
	}
	
	// Заполняем массив с блоками имеющими внутри прокручиваемый дочерний элемент

	// const containers  = document.querySelectorAll('.scrolable');
	// const contList = [];

	// function getContainer(scrList){	
	// 	scrList.forEach((item,index)=>{
	// 		contList[index] = item.parentNode;		
	// 	})
	// }
	// getContainer(scrList)


	// // Добавляем контейнер с скролбаром
	// function addScrollbar(contList){
	// 	const scrollbar = '<div class="scrollbar"><div class="scrollbar_track"><div class="scrollbar_thumb"></div></div></div>'
	// 	for(const cont of contList){
	// 		console.log(cont);
	// 		cont.insertAdjacentHTML('beforeend', scrollbar);
	// 	}
	// }
	// addScrollbar(contList)


	// // Отслеживаем нажатие на scrollbar_thumb
	// const thumbs = document.querySelectorAll('.scrollbar_thumb');

	// for(let thumb of thumbs){	
	// 	thumb.addEventListener('mousedown', startScroll);
	// 	// thumb.addEventListener('mouseup', stopScroll);
	// 	thumb.ondragstart = function(){
	// 		return false;
	// 	}	
	// }

	// function startScroll(event){
	// 	console.log('startScroll');

	// 	let activeThumb = event.target;
	// 	let activeTrack = event.target.closest('.scrollbar_track')
		
		
	// 	document.addEventListener('mousemove', moveThumb);
	// 	document.addEventListener('mouseup', stopThumb);

	// 	function moveThumb(event){

	// 		let trackRect = activeTrack.getBoundingClientRect()
	// 		let thumbRect = activeThumb.getBoundingClientRect()
	// 		let thumbPos = window.getComputedStyle(activeThumb).left;

	// 		console.log(trackRect.left);
	// 		console.log(thumbRect.left);
			
	// 		if(thumbRect.left < trackRect.left){
	// 			console.log('<')

	// 		}

	// 		activeThumb.style.left = ((event.clientX - trackRect.left) - activeThumb.offsetWidth / 2) + "px";
			 

	// 	}

	// 	function stopThumb(event){
	// 		console.log('stopScroll');
	// 		document.removeEventListener('mousemove', moveThumb);
	// 		document.removeEventListener('mouseup', stopThumb);
			
	// 	}

	// }

}())


