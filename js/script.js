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

    init: () => {
        appData.addTitle()
        startBtn.addEventListener('click', appData.checkValue)
        resetBtn.addEventListener('click', appData.reset)
        btnPlus.addEventListener('click', appData.addSsreenBlock)
        inputRange.addEventListener('input', (e) => {
            spanRange.textContent = `${e.target.value}%`
            appData.rollback = +e.target.value

            if (appData.rangeStart) {
                appData.changeValueRollback()
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

    checkValue: () => {
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

        appData.start(succes)
    },

    isBlockingProgramm: () => {
        const allCheckbox = document.querySelectorAll('input[type="checkbox"]')
        screens = document.querySelectorAll('.screen')

        if(appData.statusProgramm){
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

    start: (flagStart) => {
        if (flagStart) {
            appData.addScreens()
            appData.addServices()
            appData.addPrices()
            appData.showResult()

            appData.rangeStart = true
            appData.statusProgramm = true

            appData.isBlockingProgramm()
        } else {
            alert('заполните поля для расчета!')
        }
    },

    reset: () => {
        totalInput.value = 0 
        totalCountOther.value = 0 
        fullTotalCount.value = 0 
        totalCountRollback.value = 0 
        totalCountScreen.value = 0 

        appData.screens = [],
        appData.screenPrice = 0,
        appData.rollback = 0,
        appData.servicePricesPercent = 0,
        appData.servicePricesNumber = 0,
        appData.fullPrice = 0,
        appData.servicePricePercent = 0,
        appData.servicesPercent = {},
        appData.servicesNumber = {},
        appData.fullPriceRollback = 0,
        appData.quantityScreen = 0,
        appData.rangeStart = false
        appData.cmsVariantPercent = 0,
        appData.cmsVarintTotal = 0,
        appData.statusProgramm = false

        appData.isBlockingProgramm()
    },

    addTitle: () => {
        document.title = title.textContent
    },

    addScreens: () => {
        screens = document.querySelectorAll('.screen')

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            appData.quantityScreen += +input.value

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
        
    },

    addServices: () => {
        percentItem.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (checkbox.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItem.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (checkbox.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })

        if(selectCmsVariant.value === '50'){
            appData.cmsVariantPercent = +selectCmsVariant.value
        } else if(selectCmsVariant.value === 'other'){
            appData.cmsVariantPercent = +inputCmsVariant.value
        }
    },

    addSsreenBlock: () => {
        const cloneScreen = screens[0].cloneNode(true)
        screens = document.querySelectorAll('.screen')

        screens[screens.length - 1].after(cloneScreen)

    },

    showResult: () => {
        totalInput.value = appData.screenPrice
        totalCountOther.value = appData.servicePricePercent + appData.servicePricesNumber + appData.cmsVarintTotal
        fullTotalCount.value = appData.fullPrice
        totalCountRollback.value = appData.fullPriceRollback
        totalCountScreen.value = appData.quantityScreen
    },

    changeValueRollback: () => {
        totalCountRollback.value = appData.fullPriceRollback = appData.fullPrice - ((appData.fullPrice / 100) * appData.rollback)
        
    },

    addPrices: () => {
        appData.screenPrice = appData.screens.reduce((sum, num) => {
            return sum + +num.price
        }, 0)

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricePercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = appData.screenPrice + appData.servicePricePercent + appData.servicePricesNumber
        if(appData.cmsVariantPercent > 0) appData.cmsVarintTotal = (appData.fullPrice / 100) * appData.cmsVariantPercent
        appData.fullPrice = appData.fullPrice + appData.cmsVarintTotal
        appData.fullPriceRollback = appData.fullPrice - ((appData.fullPrice / 100) * appData.rollback)
    },
};

appData.init()