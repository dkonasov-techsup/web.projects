"use strict"

let slideshowList = document.querySelectorAll(".slideshow-container")

//добавление переключателей

function addBtns(slideshowList){	

	slideshowList.forEach((item,index) =>{
		item.insertAdjacentHTML('beforeend','<a class="prev" onclick="plusSlides(-1)">&#10094</a> <a class="next" onclick="plusSlides(1)">&#10095</a>')
	})
}

addBtns(slideshowList)


function addDots(slideshowList){	

	for (let item of slideshowList){
		let slides = item.getElementsByClassName('slide');
		// console.log(slides.length);

		let dots = document.createElement('div')
		dots.className = "dots";		

			for	(let i = 1; i <= slides.length; i++){
				console.log(i);
				let dot = '<span class="dot" onclick="currentSlide('+ i +')"></span>';						
				dots.insertAdjacentHTML('beforeend', dot);
			}

		item.append(dots);	
	}
}


addDots(slideshowList)


class Slideshow{

	init(container){

	}

}