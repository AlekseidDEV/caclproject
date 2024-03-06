'use strict'

const title = document.getElementsByTagName('h1')[0]

const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]

const btnPlus = document.querySelector('.screen-btn')
const percentItem = document.querySelectorAll('.other-items.percent')
const otherItem = document.querySelectorAll('.other-items.number')

const inputRange = document.querySelector('.rollback input[type="range"]')
const spanRange = document.querySelector('.rollback .range-value')

const totalInput = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen')

const appData = {
    screens: [],
    screenPrice: 0,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePricePercent: 0,
    servicesPercent: {},
    servicesNumber: {},
    fullPriceRollback: 0,
    quantityScreen: 0,
    rangeStart: false,

    init: function(){
        this.addTitle()
        startBtn.addEventListener('click', this.checkValue)
        btnPlus.addEventListener('click', this.addSsreenBlock)
        inputRange.addEventListener('input', (e) => {
            spanRange.textContent = `${e.target.value}%`
            this.rollback = +e.target.value

            if(this.rangeStart){
                appData.changeValueRollback()
            }
        })
    },

    checkValue: function(){
        let succes = false
            
        screens = document.querySelectorAll('.screen')
        
        screens.forEach((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')

            if(select.value !== '' && input.value !== ''){
               succes =  true
            } else{
                succes = false
            }
        })

        appData.start(succes)
    },

    start: function (flagStart) {
        if(flagStart){
            appData.addScreens()
            appData.addServices()
            appData.addPrices()
            appData.showResult()

            this.rangeStart = true
            console.log(appData);
        } else{
            alert('заполните поля для расчета!')
        }
    },

    addTitle: function(){
        document.title = title.textContent
    },

    addScreens: function() {
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value})
        })
    },

    addServices: function(){
        percentItem.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if(checkbox.checked){
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItem.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if(checkbox.checked){
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },

    addSsreenBlock: function(){
        const cloneScreen = screens[0].cloneNode(true)

        screens[screens.length -1].after(cloneScreen)
    },

    showResult: function(){
        totalInput.value = this.screenPrice
        totalCountOther.value = this.servicePricePercent + this.servicePricesNumber
        fullTotalCount.value = this.fullPrice
        totalCountRollback.value = this.fullPriceRollback
    },  

    changeValueRollback: function(){
        totalCountRollback.value = this.fullPriceRollback = this.fullPrice - ((this.fullPrice / 100) * this.rollback)
    },

    addPrices: function(){
        this.screenPrice = this.screens.reduce((sum, num) => {
            return sum + +num.price
        }, 0)

        for(let key in this.servicesNumber){
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for(let key in this.servicesPercent){
            this.servicePricePercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = this.screenPrice + this.servicePricePercent + this.servicePricesNumber

        this.fullPriceRollback = this.fullPrice - ((this.fullPrice / 100) * this.rollback)
    },
};

appData.init()

