const express = require('express');
const applicazione = express();

// ✅ Aggiunta supporto CORS
applicazione.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Funzione di cifratura: risultatoCifrato = 2 * (5 * valore + 7)^3
applicazione.get('/cripta', (req, res) => {
  const valore = Number(req.query.valore);
  if (Number.isNaN(valore) || !Number.isInteger(valore)) {
    return res.status(400).send('Parametro non valido');
  }
  const risultatoCifrato = 2 * Math.pow((5 * valore + 7), 3);
  res.send(risultatoCifrato.toString());
});

// Funzione inversa (decifratura): valore = (cuberoot(codiceCifrato/2) - 7) / 5
applicazione.get('/decripta', (req, res) => {
  const codiceCifrato = Number(req.query.codiceCifrato);
  if (Number.isNaN(codiceCifrato)) {
    return res.status(400).send('Parametro non valido');
  }
  const meta = codiceCifrato / 2;
  const radiceCubica = Math.cbrt(meta);
  const valore = (radiceCubica - 7) / 5;
  res.send(valore.toString());
});

const ascoltatore = applicazione.listen(process.env.PORT, () => {
  console.log('Server in ascolto sulla porta ' + ascoltatore.address().port);
});
