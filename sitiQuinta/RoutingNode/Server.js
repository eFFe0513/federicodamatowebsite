const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const applicazione = express();
const porta = 3000;

applicazione.use(bodyParser.urlencoded({ extended: false }));
applicazione.use(express.static(path.join(__dirname, 'pubblico')));

function creaPaginaRisposta(nome, cognome, titoloPiano, colore, urlImmagine, descrizione) {
    return `
    <!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Conferma - ${titoloPiano}</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <div class="scheda" style="border-top-color: ${colore};">
            <img src="${urlImmagine}" alt="Immagine ${titoloPiano}">
            <div class="contenuto">
                <h1 style="color: ${colore};">${titoloPiano}</h1>
                <h2>Benvenuto nel team, ${nome} ${cognome}!</h2>
                <p>${descrizione}</p>
                <a href="/" class="btn-indietro">&larr; Torna alla Home</a>
            </div>
        </div>
    </body>
    </html>
    `;
}

applicazione.post('/p1', (richiesta, risposta) => {
    const pagina = creaPaginaRisposta(
        richiesta.body.nome, richiesta.body.cognome, "Piano Base", "#10b981",
        "/immagini/Base.png",
        "Hai scelto l'iscrizione essenziale. Avrai accesso a tutti i contenuti standard della nostra piattaforma."
    );
    risposta.send(pagina);
});

applicazione.post('/p2', (richiesta, risposta) => {
    const pagina = creaPaginaRisposta(
        richiesta.body.nome, richiesta.body.cognome, "Piano Premium", "#3b82f6",
        "/immagini/Premium.png",
        "Fantastica scelta! Con l'iscrizione Premium avrai zero pubblicità e download illimitati."
    );
    risposta.send(pagina);
});

applicazione.post('/p3', (richiesta, risposta) => {
    const pagina = creaPaginaRisposta(
        richiesta.body.nome, richiesta.body.cognome, "Piano VIP", "#8b5cf6",
        "/immagini/VIP.png",
        "Benvenuto nell'élite. Accesso esclusivo ad eventi privati e consulente dedicato."
    );
    risposta.send(pagina);
});

applicazione.listen(porta, () => {
    console.log(`Server attivo! Testa l'applicazione su http://localhost:${porta}`);
});