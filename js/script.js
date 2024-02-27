'use strict'

const title = document.getElementsByTagName('h1')[0]
const btns = document.getElementsByClassName('handler_btn')
const btnPlus = document.querySelector('.screen-btn')
const percentItem = document.querySelectorAll('.other-items.percent')
const otherItem = document.querySelectorAll('.other-items.number')
const inputRange = document.querySelector('.rollback input[type="range"]')
const spanRange = document.querySelector('.rollback .range-value')
const totalInputs = document.getElementsByClassName('total-input')

let screen = document.querySelectorAll('.screen')

for(let i = 0; i <= totalInputs.length - 1; i++){
    console.log(totalInputs[i]);
}
