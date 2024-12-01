function inviaForm() {
    let cognome = document.getElementById("cognome").value;
    let nome = document.getElementById("nome").value;
    let età = document.getElementById("età").value;
    let indirizzo = document.getElementById("indirizzo").value;
    let città = document.getElementById("città").value;
    let cap = document.getElementById("cap").value;
    let output = "<h2>Dati inseriti:</h2><p>Cognome: " + cognome + "</p><p>Nome: " + nome + "</p><p>Età: " + età + "</p><p>Indirizzo: " + indirizzo + "</p><p>Città: " + città + "</p><p>CAP: " + cap + "</p>";
    document.getElementById("result").innerHTML = output;
}