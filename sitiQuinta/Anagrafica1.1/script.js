let studenti = [];

// Funzione per convertire "dd-mm-yyyy" in Date valida
function parseData(dataStr) {
    const parti = dataStr.split("-");
    return new Date(parti[2], parti[1] - 1, parti[0]);
}

// --- 1️⃣ Carica JSON automaticamente all'apertura con XMLHttpRequest ---
window.addEventListener("DOMContentLoaded", function() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "Classe5B.json", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            studenti = JSON.parse(this.responseText);
            mostraTabella(studenti);
        }
    };
});

// --- 2️⃣ Mostra tabella ---
function mostraTabella(lista) {
    const tbody = document.querySelector("#tabellaUtenti tbody");
    tbody.innerHTML = "";
    lista.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${s.nome}</td><td>${s.cognome}</td><td>${s.classe}</td><td>${s.nascita}</td>`;
        tbody.appendChild(tr);
    });
}

// --- 3️⃣ Filtro per iniziale cognome ---
document.getElementById("filtraBtn").addEventListener("click", function() {
    const lettera = document.getElementById("lettera").value.toUpperCase();
    const filtrati = studenti.filter(s => s.cognome.toUpperCase().startsWith(lettera));
    mostraTabella(filtrati);
});

// --- 4️⃣ Mostra maggiorenni e minorenni ---
function calcolaEta(nascitaStr) {
    const nascita = parseData(nascitaStr);
    const oggi = new Date();
    let eta = oggi.getFullYear() - nascita.getFullYear();
    if (
        oggi.getMonth() < nascita.getMonth() ||
        (oggi.getMonth() === nascita.getMonth() && oggi.getDate() < nascita.getDate())
    ) eta--;
    return eta;
}

document.getElementById("maggiorenniBtn").addEventListener("click", function() {
    const filtrati = studenti.filter(s => calcolaEta(s.nascita) >= 18);
    mostraTabella(filtrati);
});

document.getElementById("minorenniBtn").addEventListener("click", function() {
    const filtrati = studenti.filter(s => calcolaEta(s.nascita) < 18);
    mostraTabella(filtrati);
});

// --- 5️⃣ Verifica generazione ---
document.getElementById("generazioneBtn").addEventListener("click", function() {
    const dataInput = document.getElementById("dataInput").value;
    const output = document.getElementById("generazioneOutput");
    if (!dataInput) {
        output.textContent = "Inserisci una data valida!";
        return;
    }
    const anno = new Date(dataInput).getFullYear();
    let generazione = "";
    if (anno >= 1901 && anno <= 1927) generazione = "Greatest Generation";
    else if (anno >= 1928 && anno <= 1945) generazione = "Generazione Silenziosa";
    else if (anno >= 1946 && anno <= 1964) generazione = "Baby Boomers";
    else if (anno >= 1965 && anno <= 1980) generazione = "Generazione X";
    else if (anno >= 1981 && anno <= 1996) generazione = "Millennials";
    else if (anno >= 1997 && anno <= 2012) generazione = "Generazione Z";
    else if (anno >= 2013) generazione = "Generazione Alpha";
    else generazione = "Data non riconosciuta";
    output.innerHTML = `<b>${generazione}</b>`;
});
