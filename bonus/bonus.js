const selectWork = document.querySelector('#selectWork')


const lavori = [
    {
        value: 'backendDevelopment',
        text: 'Backend Development',
        cost: 20.5
    },
    {
        value: 'frontendDevelopment',
        text: 'Frontend Development',
        cost: 15.3
    },
    {
        value: 'projectAnalysis',
        text: 'Project Analysis',
        cost: 33.6
    }
]


function validazioneCampo(input, condizione){
    if(condizione){
        input.classList.remove('is-invalid')
        input.classList.add('is-valid')
        return true
    }

    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
    return false
}


function opzioniSelect(opzioni){

    opzioni.forEach(opzione => {
        const option = document.createElement('option')
        option.value = opzione.value
        option.innerHTML = opzione.text
        selectWork.appendChild(option)
        
    });

    return selectWork
}

function calcoloPreventivo(costi){
    const selectWorkValue = selectWork.value
    const couponInput = document.querySelector('#couponInput')
    const coupons = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']
    const couponSconto = coupons.includes(couponInput.value)
    let scontoOttenuto
    const ore = 10
    let selezioneLavoro = costi.find(lavoro => lavoro.value === selectWorkValue)
    let costoOrario = selezioneLavoro.cost
    let preventivo = costoOrario * ore

    if(!couponInput.value) {
        preventivo = preventivo
        scontoOttenuto = ''
    } else{
        if(couponSconto){
            preventivo = (preventivo * 0.75)
            scontoOttenuto = `<p class="alert alert-success text-center">Hai ottenuto uno sconto del 25%</p>`
        } else{
            preventivo = preventivo
            scontoOttenuto = `<p class="alert alert-danger text-center">Coupon inserito non valido o già riscattato</p>`
        }
    }

    document.getElementById('scontoOttenuto').innerHTML = scontoOttenuto

    return preventivo.toFixed(2).replace('.', ',')
}

const form = document.querySelector('#validationForm')

form.addEventListener('submit', function(event){
    event.preventDefault()

    let isValid = true

    //Validazione nome
    const nameInput = document.querySelector('#nameInput')
    isValid = validazioneCampo(nameInput, nameInput.value.trim() !== '') && isValid

    //Validazione cognome
    const surnameInput = document.querySelector('#surnameInput')
    isValid =  validazioneCampo(surnameInput, surnameInput.value.trim() !== '') && isValid

    //Validazione email
    const emailInput = document.querySelector('#emailInput')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    isValid = validazioneCampo(emailInput, emailRegex.test(emailInput.value)) && isValid

    //Validazione scelta lavoro
    const selectWork = document.querySelector('#selectWork')
    isValid = validazioneCampo(selectWork, selectWork.value !== '') && isValid

    //Validazione informazioni aggiuntive
    const textareaInput = document.querySelector('#textareaInput')
    isValid = validazioneCampo(textareaInput, textareaInput.value !== '') && isValid

    //Validazione Privacy Policy
    const privacyCheckbox = document.querySelector('#flexCheckDefault');
    isValid = validazioneCampo(privacyCheckbox, privacyCheckbox.checked) && isValid

    //In caso di validazione confermata: Calcolo del preventivo
    const result = document.querySelector('#result')
    const campiError = document.querySelector('#campiError')

    //Guarda il risultato della validazione del form
    if(!isValid){
        //In caso la validazione di un campo sia negativa, blocca l'evento e da messaggio di errore
        result.innerHTML = ''
        campiError.classList.remove('d-none')
        scontoOttenuto.classList.add('d-none')

        return
    }

    const preventivoFormattato = calcoloPreventivo(lavori)
    const [intero, decimale] = preventivoFormattato.split(',')
    scontoOttenuto.classList.remove('d-none')

    campiError.classList.add('d-none')
    result.innerHTML = `€ <strong>${intero}</strong>,${decimale}`
})

opzioniSelect(lavori)