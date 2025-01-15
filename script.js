const backendDevelopment = 'backendDevelopment'
const frontendDevelopment = 'frontendDevelopment'
const projectAnalysis = 'projectAnalysis'

//Funzione per la validazione dei campi del form
function validazioneCampo(input, condizione){
    if (condizione) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true

    }

    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    return false;
}

function calcolaCostoOrario(work){

    //Selezione della tipologia di lavoro
    switch(work){
        case backendDevelopment:
            return 20.5
        case frontendDevelopment:
            return 15.3
        case projectAnalysis:
            return 33.6
    }
}

//Funzione per il calcolo del preventivo
function calcoloPreventivo(work){

    const couponInput = document.querySelector('#couponInput')
    const ore = 10 //numero delle ore date di default per il calcolo del preventivo
    const coupons = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']
    const couponSconto = coupons.includes(couponInput.value)

    const costoOrario = calcolaCostoOrario(work) //variabile che va ad identificare il prezzo orario a seconda della scelta sul select
    let scontoOttenuto


    //Calcolo preventivo con o senza sconto
    let preventivo = costoOrario * ore

    if(!couponInput.value) {
        preventivo = preventivo.toFixed(2)
        scontoOttenuto = ''
    } else{
        if(couponSconto){
            preventivo = (preventivo * 0.75).toFixed(2)
            scontoOttenuto = `<p class="alert alert-success text-center">Hai ottenuto uno sconto del 25%</p>`
        } else{
            preventivo = preventivo.toFixed(2)
            scontoOttenuto = `<p class="alert alert-danger text-center">Coupon inserito non valido o già riscattato</p>`
        }
    }

    //Stampa a video se lo sconto è avvenuto oppure no
    document.getElementById('scontoOttenuto').innerHTML = scontoOttenuto

    return preventivo.replace('.', ',')
}

const form = document.querySelector('#validationForm')

//Evento click del bottono 'calcolo preventivo'
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

    const preventivoFormattato = calcoloPreventivo(selectWork.value)
    const [intero, decimale] = preventivoFormattato.split(',')
    scontoOttenuto.classList.remove('d-none')


    campiError.classList.add('d-none')
    result.innerHTML = `€ <strong>${intero}</strong>,${decimale}`
})