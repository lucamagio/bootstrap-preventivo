//Funzione per la validazione dei campi del form
function validazioneForm(){
   let isValid = true

   function validazioneCampo(input, condizione){
    if (condizione) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        isValid = false;
    }
   }

    //Validazione nome
    const nameInput = document.querySelector('#nameInput')
    validazioneCampo(nameInput, nameInput.value.trim() !== '')

    //Validazione cognome
    const surnameInput = document.querySelector('#surnameInput')
    validazioneCampo(surnameInput, surnameInput.value.trim() !== '')

    //Validazione email
    const emailInput = document.querySelector('#emailInput')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    validazioneCampo(emailInput, emailRegex.test(emailInput.value))

    //Validazione scelta lavoro
    const selectWork = document.querySelector('#selectWork')
    validazioneCampo(selectWork, selectWork.value !== '')

    //Validazione informazioni aggiuntive
    const textareaInput = document.querySelector('#textareaInput')
    validazioneCampo(textareaInput, textareaInput.value !== '')

    //Validazione Privacy Policy
    const privacyCheckbox = document.querySelector('#flexCheckDefault');
    validazioneCampo(privacyCheckbox, privacyCheckbox.checked)

    return isValid
}


//Funzione per il calcolo del preventivo
function calcoloPreventivo(work){

    const couponInput = document.querySelector('#couponInput')
    const ore = 10 //numero delle ore date di default per il calcolo del preventivo
    const coupons = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']
    const couponSconto = coupons.includes(couponInput.value)

    let costoOrario //variabile che va ad identificare il prezzo orario a seconda della scelta sul select
    let scontoOttenuto //variabile di risposta al coupon inserito

    //Selezione della tipologia di lavoro
    if (work === '1'){
        costoOrario = 20.5
    } else if(work === '2'){
        costoOrario = 15.3
    } else if(work === '3'){
        costoOrario = 33.6
    }

    //Calcolo preventivo con o senza sconto
    let preventivo = costoOrario * ore

    if(!couponInput.value) {
        preventivo = preventivo.toFixed(2)
        scontoOttenuto = ''
    } else if(couponSconto){
        preventivo = (preventivo * 0.75).toFixed(2)
        scontoOttenuto = `<p class="alert alert-success text-center">Hai ottenuto uno sconto del 25%</p>`
    } else{
        preventivo = preventivo.toFixed(2)
        scontoOttenuto = `<p class="alert alert-danger text-center">Coupon inserito non valido o già riscattato</p>`
    }

    //Stampa a video se lo sconto è avvenuto oppure no
    document.getElementById('scontoOttenuto').innerHTML = scontoOttenuto

    return preventivo.replace('.', ',')
}

const buttonPreventivo = document.querySelector('#buttonPreventivo')

//Evento click del bottono 'calcolo preventivo'
buttonPreventivo.addEventListener('click', function(event){
    event.preventDefault()
    
    //Guarda il risultato della validazione del form
    if(!validazioneForm()){
        //In caso la validazione di un campo sia negativa, blocca l'evento
        return
    }

    //In caso di validazione confermata: Calcolo del preventivo
    const selectWork = document.querySelector('#selectWork').value
    const result = document.querySelector('#result')

    const preventivoFormattato = calcoloPreventivo(selectWork)
    const [intero, decimale] = preventivoFormattato.split(',')



    result.innerHTML = `€ <strong>${intero}</strong>,${decimale}`
})