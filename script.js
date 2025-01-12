const buttonPreventivo = document.querySelector('#buttonPreventivo')

//Funzione per la validazione dei campi del form
function validazioneForm(){
    isValid = true

    //Validazione nome
    const nameInput = document.querySelector('#nameInput')
    if(nameInput.value.trim() === ''){
        nameInput.classList.add('is-invalid')
        isValid = false
    } else{
        nameInput.classList.remove('is-invalid')
        nameInput.classList.add('is-valid')
    }

    //Validazione cognome
    const surnameInput = document.querySelector('#surnameInput')
    if(surnameInput.value.trim() === ''){
        surnameInput.classList.add('is-invalid')
        isValid = false
    } else{
        surnameInput.classList.remove('is-invalid')
        surnameInput.classList.add('is-valid')
    }

    //Validazione email
    const emailInput = document.querySelector('#emailInput')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailInput.value)){
        emailInput.classList.add('is-invalid')
        isValid = false
    } else{
        emailInput.classList.remove('is-invalid')
        emailInput.classList.add('is-valid')
    }

    //Validazione scelta lavoro
    const selectWork = document.querySelector('#selectWork')
    if(selectWork.value === ''){
        selectWork.classList.add('is-invalid')
        isValid = false
    }else{
        selectWork.classList.remove('is-invalid')
        selectWork.classList.add('is-valid')
    }

    //Validazione Privacy Policy
    const privacyCheckbox = document.querySelector('#flexCheckDefault');
    if (!privacyCheckbox.checked) {
        privacyCheckbox.classList.add('is-invalid');
        isValid = false;
    } else {
        privacyCheckbox.classList.remove('is-invalid');
        privacyCheckbox.classList.add('is-valid');
    }

    return isValid
}


//Funzione per il calcolo del preventivo
function calcoloPreventivo(work){

    const codiceInput = document.querySelector('#codiceInput')
    const ore = 10 //numero delle ore date di default per il calcolo del preventivo
    const coupons = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']
    const couponSconto = coupons.includes(codiceInput.value)

    let costoOrario //variabile che va ad identificare il prezzo orario a seconda della scelta sul select
    let scontoOttenuto //variabile di risposta al coupon inserito
    let preventivo

    if (work === '1'){
        costoOrario = 20.5
    } else if(work === '2'){
        costoOrario = 15.3
    } else if(work === '3'){
        costoOrario = 33.6
    }

    if(couponSconto){
        preventivo = ((costoOrario * ore) * 0.75).toFixed(2)
        scontoOttenuto = `<p class="alert alert-success text-center">Hai ottenuto uno sconto del 25%</p>`
    } else if(couponSconto != codiceInput.value){
        preventivo = (costoOrario * ore).toFixed(2)
        scontoOttenuto = `<p class="alert alert-danger text-center">Coupon inserito non valido o già riscattato</p>`
    } else if(!codiceInput.value) {
        preventivo = (costoOrario * ore).toFixed(2)
        scontoOttenuto = ''
    }
    document.getElementById('scontoOttenuto').innerHTML = scontoOttenuto

    console.log(preventivo)
    
    return preventivo
}

//Evento click del bottono 'calcolo preventivo'
buttonPreventivo.addEventListener('click', function(event){
    event.preventDefault()

    //Validazione del Form
    if(!validazioneForm()){

        //Blocca la validazione è negativa
        return
    }

    const selectWork = document.querySelector('#selectWork').value
    const result = document.querySelector('#result')

    result.innerHTML = `€ ${calcoloPreventivo(selectWork)}`

    

})


