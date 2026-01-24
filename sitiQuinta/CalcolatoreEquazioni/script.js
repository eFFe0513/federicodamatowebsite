async function calcolatore(){
    let risultato = document.getElementById("risultato");
    risultato.innerHTML = "caricamento...";
    await new Promise(resolve => setTimeout(resolve, 50));
    let equazione = document.getElementById("cellaEquazione").value;
    let equazioneSeparata = equazione.split(" ");
    // console log per verificare
    console.log(equazione);
    console.log(equazioneSeparata);
    let tentativo = -1000;
    let controllo = true;
    let valore;
    let separazione;
    let maxTentativi = 1000;
    const passo = 0.0001;
    const tolleranza = 0.001;
    // ciclo che permette di andare a tentativi nella risoluzione dell'equazione
    // esso tenta la sostituzione della x partendo da -1000
    while (controllo && tentativo <= maxTentativi){
        valore = 0;
        // sostituisce tutti i valori della x
        // separandoli e associando i numeri prima della x ad un prodotto e quelli dopo al suo esponente
        for (let i = 1; i < equazioneSeparata.length; i = i + 2){
            if(equazioneSeparata[i].includes("x")){
                if (equazioneSeparata[i].length > 1){
                    if (equazioneSeparata[i].charAt(0) == "x"){
                        separazione = equazioneSeparata[i].split("x");
                        if (equazioneSeparata[i-1] == "+"){
                            valore = valore + (Math.pow(tentativo, Number(separazione[1])));
                        } else {
                            valore = valore - (Math.pow(tentativo, Number(separazione[1])));
                        }
                    } else {
                        separazione = equazioneSeparata[i].split("x");
                        if (Number(separazione[1]) == 0){
                            if (equazioneSeparata[i-1] == "+"){
                                valore = valore + Number(separazione[0])*tentativo;
                            } else {
                                valore = valore - Number(separazione[0])*tentativo;
                            }
                        } else {
                            if (equazioneSeparata[i-1] == "+"){
                                valore = valore + Number(separazione[0])*(Math.pow(tentativo, Number(separazione[1])));
                            } else {
                                valore = valore - Number(separazione[0])*(Math.pow(tentativo, Number(separazione[1])));
                            }
                        }
                    }
                } else {
                    if (equazioneSeparata[i-1] == "+"){
                        valore = valore + tentativo;
                    } else {
                        valore = valore - tentativo;
                    }
                }
            } else {
                if (equazioneSeparata[i-1] == "+"){
                    valore = valore + Number(equazioneSeparata[i]);
                } else {
                    valore = valore - Number(equazioneSeparata[i]);
                }
            }
        }
        // controllo per uscire dal ciclo
        if (Math.abs(valore) < tolleranza){
            controllo = false;
        } else {
            tentativo = tentativo + passo;
        }
    }
    if (tentativo > maxTentativi) {
        risultato.innerHTML = "Nessuna soluzione trovata entro " + maxTentativi*2 + " tentativi con tolleranza 0.001";
        risultato.className = "errore";
    } else {
        risultato.innerHTML = "Il valore della x equivale a " + Math.round(tentativo * 1000) / 1000;
        risultato.className = "successo";
    }
}

// test --> + x5 - 6x4 + 11x3 - 6x2 - 36x + 72 = 0  [x = 2]

// possibile implementazione futura con prodotti di polinomi/monomi e razionali fratte
// attraverso una funzione che sfrutti quella Calcolatore()