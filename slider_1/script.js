"use strict"

let sContainers = document.querySelectorAll(".slideshow-container")
let slide = document.getElementsByClassName('slide')



console.log(slide)
console.log(sContainers)
// console.log(sContainerDiv)


//добавление переключателей


function addBtns(contList){
	console.log(contList)

	contList.forEach((item,index) =>{
		item.insertAdjacentHTML('afterbegin','<a class="prev" onclick="plusSlides(-1)">&#10094</a> <a class="prev" onclick="plusSlides(1)">&#10095</a>')
	})
}

addBtns(sContainers)


function addDots(contList){	

	contList.forEach((item,index)=>{
		// Узнаём кол-о элментов в колллекции минус 2 элемента(кнопки) отвечающих за навигацию!
		let contSize = (item.children.length - 2);

		console.log(contSize);
		item.insertAdjacentHTML('afterend','<div> <span class="dot" onclick="currentSlide()"></span> </div>')
	})	
}


addDots(sContainers)





class Slideshow{

	init(container){

	}

}