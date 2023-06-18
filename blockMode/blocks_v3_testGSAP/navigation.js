"use strict"

const page = document.querySelector('.page');
const sidebar = document.querySelector('.sidebar');

// Tabs
class Tabs{

	constructor(wrapper,config){
		const defConf = {};
		this.config = Object.assign(defConf,config);

		// this.elTabs = typeof target === 'string' ? document.querySelectorAll(target) : target;
		this.wrapper = wrapper;
		this.elBtns = this.wrapper.querySelectorAll('.nav_btn');
		this.elSects = this.wrapper.querySelectorAll('.tab_sect');
		this.eventShow = new Event('tab.change'); 
		
		this.init();
		this.regEvHandler();
	}

	init(){
		console.log(this.elBtns);
		this.wrapper.setAttribute('role','tabWrapper');
		this.elBtns.forEach((el,index)=>{
			el.dataset.index = index;
			el.setAttribute('role','tabBtn');
			// console.log(el.dataset.index);
			this.elSects[index].setAttribute('role','tabSect');
		})
	}

	regEvHandler(){
		this.wrapper.addEventListener('click',(e)=>{
			const clickBtn = e.target.closest('.nav_btn');
			console.log(clickBtn);
			if(clickBtn){
				e.preventDefault();
				this.show(clickBtn);
			}
		})

	}

	show(clickBtn){
		const elSectTarget = this.elSects[clickBtn.dataset.index];
		const elBtnActive = this.wrapper.querySelector('.btn_active')
		const elSectActive = this.wrapper.querySelector('.sect_active')

		if(clickBtn === elBtnActive){return;}


		elBtnActive ? elBtnActive.classList.remove('btn_active') : null;
		elSectActive ? elSectActive.classList.remove('sect_active') : null;

		clickBtn.classList.add('btn_active');
		elSectTarget.classList.add('sect_active');

		this.wrapper.dispatchEvent(this.eventShow);

		elBtnActive.focus();
	}		
}

// Init layout tabs
let tabs = document.getElementsByClassName('tabs_wrapper');
let tabList = Array.from(tabs);
for(let el of tabList){
	let newTabs = new Tabs(el,{});	
}



// evHandler > sidebar_toggle
let sbStat;
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





