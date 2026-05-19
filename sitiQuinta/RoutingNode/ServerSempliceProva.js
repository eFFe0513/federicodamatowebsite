const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const applicazione = express();
const porta = 3000;

applicazione.use(bodyParser.urlencoded({ extended: false }));

applicazione.use(express.static(path.join(__dirname, 'pubblico')));

applicazione.post('/elabora-dati', (richiesta, risposta) => {
    
    const nomeUtente = richiesta.body.nome;
    const cognomeUtente = richiesta.body.cognome;

    const paginaDinamica = `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <title>Pagina Dinamica</title>
        </head>
        <body>
            <h1>Dati ricevuti con successo!</h1>
            <p>Benvenuto, <strong>${nomeUtente} ${cognomeUtente}</strong>.</p>
            <p>Questa pagina è stata generata dinamicamente dal server Node.js.</p>
            <a href="/">Torna indietro</a>
        </body>
        </html>
    `;

    risposta.send(paginaDinamica);
});

applicazione.listen(porta, () => {
    console.log(`Server avviato correttamente! Vai su http://localhost:${porta}`);
});