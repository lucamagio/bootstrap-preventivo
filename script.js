const buttonPreventivo = document.querySelector('#buttonPreventivo')
const codiceInput = document.querySelector('#codiceInput')

//Funzione per il calcolo del preventivo
function calcoloPreventivo(work){
    
    const scontoOttenuto = document.querySelector('#scontoOttenuto')
    const coupon = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24']
    const sconto = coupon.includes(codiceInput.value)
    let costoOrario //variabile che va ad identificare il prezzo orario a seconda della scelta sul select
    const ore = 10 //numero delle ore date di default per il calcolo del preventivo
    let preventivo

    if (work === '1'){
        costoOrario = 20.5
    } else if(work === '2'){
        costoOrario = 15.3
    } else if(work === '3'){
        costoOrario = 33.6
    }

    if(sconto){
        preventivo = (costoOrario * ore) * 0.75
        scontoOttenuto.classList.remove('d-none')
    } else{
        preventivo = (costoOrario * ore)
        scontoOttenuto.classList.add('d-none')
    }
    
    return preventivo
}

//Evento click del bottono 'calcolo preventivo'
buttonPreventivo.addEventListener('click', function(event){
    event.preventDefault()

    const selectWork = document.querySelector('#selectWork').value
    const result = document.querySelector('#result')

    result.innerHTML = `€ ${calcoloPreventivo(selectWork)}`

})


