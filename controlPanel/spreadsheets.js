"use strict"

console.log('work');

let sheetId = '1OcxAm8mRl54oc7MggC8fHpwMGvkO5mrbYYQ9DADtfQs';
let sheetTitle = '24.01.2023';
let sheetRange = 'A1:B7';
let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?sheet=' + sheetTitle + '&range=' + sheetRange);

fetch(FULL_URL)
.then(res = res.text())
.then(rep =>{
	let data = JSON.parse(rep.substr(47).slice(0,-2));
	console.log(data);
})