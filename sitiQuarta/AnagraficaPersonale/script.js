document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    nome = document.getElementById('nome').value;
    cognome = document.getElementById('cognome').value;
    indirizzo = document.getElementById('indirizzo').value;

    table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    newRow = table.insertRow();

    cell1 = newRow.insertCell(0);
    cell2 = newRow.insertCell(1);
    cell3 = newRow.insertCell(2);

    cell1.textContent = nome;
    cell2.textContent = cognome;
    cell3.textContent = indirizzo;

    document.getElementById('inputForm').reset();
});
