(function(){
	"use strict"

	class ScrollBar{

		static #thumb_width_min = 20;

		constructor(container){
			this.viewport = container;
			this.viewportContent = container.querySelector('.viewport_сontent');
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
			// Создаём скролбар и добавляем его в контейнер
			const scrollbar = '<div class="scrollbar"><div class="scrollbar_track"><div class="scrollbar_thumb"></div></div></div>'
			this.viewport.insertAdjacentHTML('beforeend', scrollbar);

			// Получаем объект ползунка. Вычисляем и устанавливаем его ширину
			this.thumb = this.viewport.querySelector('.scrollbar_thumb');
			this.thumbWidth = parseInt(this.ratio * this.viewportWidth);

			// console.log(ScrollBar.#thumb_width_min);

			this.thumbWidth = (this.thumbWidth <= ScrollBar.#thumb_width_min) ? ScrollBar.#thumb_width_min : this.thumbWidth;
			this.thumb.style.width = this.thumbWidth + 'px';
			console.log(this.thumb.style.width);
		}

		registerEventsHandler(){
			// Разделить горизонтальный и верт. скролл?
			// Thumb выезжает за границы сколбара
			this.viewportContent.addEventListener('scroll',()=>{
				console.log('scroll');
				this.thumb.style.left = (this.viewportContent.scrollLeft * this.ratio) + 'px';
			});

			// console.log(this.viewportContent);

			this.thumb.addEventListener('mousedown', e);
			this.pressed = true;

			// document.addEventListener('mousemove', )
		}

		scroll(thumb){
			console.log(this);

			// document.addEventListener('mousemove', )
			document.addEventListener('mouseup', stopThumb);
		}
	}

	const containers  = document.querySelectorAll('.viewport');
	for(let container of containers){
		const scrollbar = new ScrollBar(container);
	}

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


