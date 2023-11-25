const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'OK'
        phoneSpan.style.color = 'green'
    } else {
        phoneSpan.innerHTML = 'NOT OK'
        phoneSpan.style.color = 'red'
    }
})


//converter
const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

const converter = (element, targetElement, targetElement2, type) => {
    element.addEventListener('input', () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()
    
        request.onload = () => {
            const changes = JSON.parse(request.response)
            switch (type) {
                case 'som':
                    targetElement.value = (element.value / changes.usd).toFixed(2);
                    targetElement2.value = (element.value / changes.eur).toFixed(2);
                    break;
                case "usd":
                    targetElement.value = (element.value * changes.usd).toFixed(2);
                    targetElement2.value = (element.value * changes.eurUsd).toFixed(2);
                    break;
                case "eur":
                    targetElement.value = (element.value * changes.usdEur).toFixed(2);
                    targetElement2.value = (element.value * changes.eur).toFixed(2);
                    break;
                default:
                    console.log("Неправильный тип")
                    break;
            }
            element.value === "" ? targetElement.value = "" : null
        }
    })
}



converter(somInput, usdInput, eurInput, 'som')
converter(usdInput, somInput, eurInput, 'usd')
converter(eurInput, usdInput, somInput, 'eur')