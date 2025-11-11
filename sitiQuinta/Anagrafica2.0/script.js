let studenti = [];

// Funzione per convertire "dd-mm-yyyy" in una data valida
function convertiData(data) {
    const parti = data.split("-");
    return new Date(parti[2], parti[1] - 1, parti[0]);
}

// Carica XML automaticamente all'apertura con XMLHttpRequest
window.addEventListener("DOMContentLoaded", function() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "Classe5B.xml", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const fileXML = this.responseXML;
            const listaStudenti = fileXML.getElementsByTagName("studente");
            //studenti = [];
            for (let i = 0; i < listaStudenti.length; i++) {
                const s = listaStudenti[i];
                studenti.push({
                    nome: s.getElementsByTagName("nome")[0].textContent,
                    cognome: s.getElementsByTagName("cognome")[0].textContent,
                    classe: s.getElementsByTagName("classe")[0].textContent,
                    nascita: s.getElementsByTagName("nascita")[0].textContent
                });
            }
            mostraTabella(studenti);
        }
    };
});

// Mostra tabella
function mostraTabella(lista) {
    const tbody = document.querySelector("#tabellaUtenti tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
        const s = lista[i];
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${s.nome}</td><td>${s.cognome}</td><td>${s.classe}</td><td>${s.nascita}</td>`;
        tbody.appendChild(tr);
    }
}

// Filtro per iniziale cognome
document.getElementById("filtraBtn").addEventListener("click", function() {
    const lettera = document.getElementById("lettera").value.toUpperCase();
    const filtrati = [];
    for (let i = 0; i < studenti.length; i++) {
        if (studenti[i].cognome.toUpperCase().startsWith(lettera)) {
            filtrati.push(studenti[i]);
        }
    }
    mostraTabella(filtrati);
});

// Mostra maggiorenni e minorenni
function calcolaEta(nascitaStr) {
    const nascita = convertiData(nascitaStr);
    const oggi = new Date();
    let eta = oggi.getFullYear() - nascita.getFullYear();
    if (
        oggi.getMonth() < nascita.getMonth() ||
        (oggi.getMonth() === nascita.getMonth() && oggi.getDate() < nascita.getDate())
    ) eta--;
    return eta;
}

document.getElementById("maggiorenniBtn").addEventListener("click", function() {
    const filtrati = [];
    for (let i = 0; i < studenti.length; i++) {
        if (calcolaEta(studenti[i].nascita) >= 18) {
            filtrati.push(studenti[i]);
        }
    }
    mostraTabella(filtrati);
});

document.getElementById("minorenniBtn").addEventListener("click", function() {
    const filtrati = [];
    for (let i = 0; i < studenti.length; i++) {
        if (calcolaEta(studenti[i].nascita) < 18) {
            filtrati.push(studenti[i]);
        }
    }
    mostraTabella(filtrati);
});

