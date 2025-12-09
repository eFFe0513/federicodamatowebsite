<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);
$nuovoAccount = $data['nuovoAccount'] ?? null;

if (!$nuovoAccount) {
    echo json_encode(['success' => false, 'message' => 'Dati account mancanti']);
    exit;
}

// Validazione
if (empty($nuovoAccount['email']) || empty($nuovoAccount['username']) || empty($nuovoAccount['password'])) {
    echo json_encode(['success' => false, 'message' => 'Dati incompleti']);
    exit;
}

$filename = 'datiAccountsRegistrati.json';
$accounts = [];

// Carica gli account esistenti
if (file_exists($filename)) {
    $jsonContent = file_get_contents($filename);
    $accounts = json_decode($jsonContent, true);
    
    if (!is_array($accounts)) {
        $accounts = [];
    }
    
    // Verifica se email o username o pw esistono già
    foreach ($accounts as $account) {
        if ($account['email'] === $nuovoAccount['email']) {
            echo json_encode(['success' => false, 'message' => 'Email già registrata']);
            exit;
        }
        if ($account['username'] === $nuovoAccount['username']) {
            echo json_encode(['success' => false, 'message' => 'Nome utente già in uso']);
            exit;
        }
        // Puoi anche verificare la password se vuoi
        if ($account['password'] === $nuovoAccount['password']) {
            echo json_encode(['success' => false, 'message' => 'Password già utilizzata']);
            exit;
        }
    }
}

// Aggiunge il nuovo account
$accounts[] = $nuovoAccount;

// Salva nel file JSON
if (file_put_contents($filename, json_encode($accounts, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Errore nel salvataggio']);
}
?>