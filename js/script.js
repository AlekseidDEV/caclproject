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
const totalCountScreen = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]
const checkCms = document.getElementById('cms-open')
const cmsVariantblock = document.querySelector('.hidden-cms-variants')
const selectCmsVariant = document.getElementById('cms-select')
const otherCmsInputBlock = cmsVariantblock.querySelector('.main-controls__input')
const inputCmsVariant = otherCmsInputBlock.querySelector('#cms-other-input')

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
    statusProgramm: false,
    cmsVariantPercent: 0,
    cmsVarintTotal: 0,

    init(){
        const contextCheckValue = this.checkValue.bind(appData)
        const contextReset = this.reset.bind(appData)

        this.addTitle()
        startBtn.addEventListener('click', contextCheckValue)
        resetBtn.addEventListener('click', contextReset)
        btnPlus.addEventListener('click', this.addSsreenBlock)
        inputRange.addEventListener('input', (e) => {
            spanRange.textContent = `${e.target.value}%`
            this.rollback = +e.target.value

            if (this.rangeStart) {
                this.changeValueRollback()
            }
        })
        checkCms.addEventListener('change', () => {
            if(checkCms.checked){
                cmsVariantblock.style.display = 'block'
            } else{
                cmsVariantblock.style.display = 'none'
            }
        })

        selectCmsVariant.addEventListener('change', (e) => {
            if(e.target.value === 'other'){
                otherCmsInputBlock.style.display = 'flex'
            } else{
                otherCmsInputBlock.style.display = 'none'
            }
        })
    },

    checkValue(){
        let succes = false

        screens = document.querySelectorAll('.screen')

        succes = Array.from(screens).every((screen) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')

            if (select.value !== '' && input.value !== '') {
                return true
            } else {
                return false
            }
        })

        this.start(succes)
    },

    isBlockingProgramm(){
        const allCheckbox = document.querySelectorAll('input[type="checkbox"]')
        screens = document.querySelectorAll('.screen')

        if(this.statusProgramm){
            startBtn.style.display = 'none'
            resetBtn.style.display = 'block'
    
            screens.forEach((screen) => {
                const select = screen.querySelector('select')
                const input = screen.querySelector('input')
    
                select.setAttribute('disabled', 'disabled')
                input.setAttribute('disabled', 'disabled')
            })

            selectCmsVariant.setAttribute('disabled', 'disabled')
            inputCmsVariant.setAttribute('disabled', 'disabled')
        } else{
            screens.forEach((screen, index) => {
                const select = screen.querySelector('select')
                const input = screen.querySelector('input')
    
                if(index === 0){
                    select.removeAttribute('disabled')
                    input.removeAttribute('disabled')
    
                    select.value = ''
                    input.value = ''
                } else{
                    screen.remove()
                }
            })

            allCheckbox.forEach((check) => {
                check.checked = false
            })

            selectCmsVariant.removeAttribute('disabled')
            selectCmsVariant.value = ''
            inputCmsVariant.removeAttribute('disabled')
            inputCmsVariant.style.display = 'none'
            inputCmsVariant.value = ''

            startBtn.style.display = 'block'
            resetBtn.style.display = 'none'
        }
    },

    start(flagStart){
        if (flagStart) {
            this.addScreens()
            this.addServices()
            this.addPrices()
            this.showResult()

            this.rangeStart = true
            this.statusProgramm = true

            this.isBlockingProgramm()
        } else {
            alert('заполните поля для расчета!')
        }
    },

    reset(){
        totalInput.value = 0 
        totalCountOther.value = 0 
        fullTotalCount.value = 0 
        totalCountRollback.value = 0 
        totalCountScreen.value = 0 

        this.screens = [],
        this.screenPrice = 0,
        this.rollback = 0,
        this.servicePricesPercent = 0,
        this.servicePricesNumber = 0,
        this.fullPrice = 0,
        this.servicePricePercent = 0,
        this.servicesPercent = {},
        this.servicesNumber = {},
        this.fullPriceRollback = 0,
        this.quantityScreen = 0,
        this.rangeStart = false
        this.cmsVariantPercent = 0,
        this.cmsVarintTotal = 0,
        this.statusProgramm = false

        this.isBlockingProgramm()
    },

    addTitle(){
        document.title = title.textContent
    },

    addScreens(){
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            this.quantityScreen += +input.value

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
        
    },

    addServices() {
        percentItem.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (checkbox.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItem.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (checkbox.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })

        if(selectCmsVariant.value === '50'){
            this.cmsVariantPercent = +selectCmsVariant.value
        } else if(selectCmsVariant.value === 'other'){
            this.cmsVariantPercent = +inputCmsVariant.value
        }
    },

    addSsreenBlock() {
        const cloneScreen = screens[0].cloneNode(true)
        screens = document.querySelectorAll('.screen')

        screens[screens.length - 1].after(cloneScreen)

    },

    showResult(){
        totalInput.value = this.screenPrice
        totalCountOther.value = this.servicePricePercent + this.servicePricesNumber + this.cmsVarintTotal
        fullTotalCount.value = this.fullPrice
        totalCountRollback.value = this.fullPriceRollback
        totalCountScreen.value = this.quantityScreen
    },

    changeValueRollback(){
        totalCountRollback.value = this.fullPriceRollback = this.fullPrice - ((this.fullPrice / 100) * this.rollback)
        
    },

    addPrices()  {
        this.screenPrice = this.screens.reduce((sum, num) => {
            return sum + +num.price
        }, 0)

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricePercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = this.screenPrice + this.servicePricePercent + this.servicePricesNumber
        if(this.cmsVariantPercent > 0) this.cmsVarintTotal = (this.fullPrice / 100) * this.cmsVariantPercent
        this.fullPrice = this.fullPrice + this.cmsVarintTotal
        this.fullPriceRollback = this.fullPrice - ((this.fullPrice / 100) * this.rollback)
    },
};

appData.init()