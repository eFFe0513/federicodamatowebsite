<html>
<head>
    <title>Convertitore Metri ⇄ Pollici (SOAP)</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .converter-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            backdrop-filter: blur(5px);
            padding: 2rem;
            max-width: 800px;
            width: 100%;
            margin: 20px;
        }
        .swap-btn {
            background: #667eea;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            transition: transform 0.3s;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
        }
        .swap-btn:hover {
            transform: rotate(180deg);
            background: #764ba2;
        }
        .result-card {
            border-left: 5px solid #28a745;
            background-color: #f8f9fa;
            border-radius: 10px;
        }
        .error-card {
            border-left: 5px solid #dc3545;
            background-color: #f8f9fa;
            border-radius: 10px;
        }
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        .loading i {
            font-size: 2rem;
            color: #667eea;
            animation: spin 1s infinite linear;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="converter-card">
        <div class="text-center mb-4">
            <i class="fas fa-arrows-alt-h fa-3x text-primary mb-3"></i>
            <h1 class="h2">Convertitore Metri ↔ Pollici</h1>
            <p class="text-muted">Servizio SOAP per conversioni rapide e precise</p>
        </div>

        <form method="POST" action="" id="convertForm">
            <div class="form-row align-items-end">
                <div class="col-md-4 mb-3">
                    <label for="value" class="font-weight-bold">Valore</label>
                    <input type="number" step="any" class="form-control form-control-lg" id="value" name="value" value="1" min="0" required>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="fromUnit" class="font-weight-bold">Da</label>
                    <select name="fromUnit" id="fromUnit" class="form-control form-control-lg" required>
                        <option value="m">Metri (m)</option>
                        <option value="in">Pollici (in)</option>
                    </select>
                </div>
                <div class="col-md-1 mb-3 d-flex align-items-center justify-content-center">
                    <div class="swap-btn" onclick="swapUnits()">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <label for="toUnit" class="font-weight-bold">A</label>
                    <select name="toUnit" id="toUnit" class="form-control form-control-lg" required>
                        <option value="in">Pollici (in)</option>
                        <option value="m">Metri (m)</option>
                    </select>
                </div>
                <div class="col-md-1 mb-3">
                    <button type="submit" class="btn btn-primary btn-lg btn-block" style="border-radius: 10px;">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
        </form>

        <div class="loading" id="loading">
            <i class="fas fa-spinner"></i>
            <p class="mt-2">Conversione in corso...</p>
        </div>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['value'], $_POST['fromUnit'], $_POST['toUnit'])) {
            $wsdl_url = "http://fdwebsite.infinityfree.me/SOAP/test.wsdl";

            echo '<script>document.getElementById("loading").style.display = "block";</script>';

            try {
                $value = (float)$_POST['value'];
                $from  = $_POST['fromUnit'];
                $to    = $_POST['toUnit'];

                $client = new SoapClient($wsdl_url, [
                    'trace' => 1
                ]);

                $result = $client->convert($value, $from, $to);

                echo '<script>document.getElementById("loading").style.display = "none";</script>';
                echo '<div class="result-card p-4 mt-4">';
                echo '  <div class="d-flex align-items-center">';
                echo '      <i class="fas fa-check-circle text-success fa-3x mr-3"></i>';
                echo '      <div>';
                echo '          <h4 class="mb-1">Conversione effettuata</h4>';
                echo '          <p class="lead mb-0">' . $value . ' ' . $from . ' = <strong>' . $result . ' ' . $to . '</strong></p>';
                echo '      </div>';
                echo '  </div>';
                echo '</div>';

            } catch (SoapFault $e) {
                echo '<script>document.getElementById("loading").style.display = "none";</script>';
                echo '<div class="error-card p-4 mt-4">';
                echo '  <div class="d-flex align-items-center">';
                echo '      <i class="fas fa-exclamation-triangle text-danger fa-3x mr-3"></i>';
                echo '      <div>';
                echo '          <h4 class="mb-1">Errore SOAP</h4>';
                echo '          <p class="mb-0">' . $e->getMessage() . '</p>';
                echo '      </div>';
                echo '  </div>';
                echo '</div>';
            }
        }
        ?>

        <div class="text-center mt-4 text-muted small">
            <i class="fas fa-code-branch"></i> Servizio SOAP didattico | 1 pollice = 0.0254 metri
        </div>
    </div>

    <script>
        function swapUnits() {
            let from = document.getElementById('fromUnit');
            let to = document.getElementById('toUnit');
            let temp = from.value;
            from.value = to.value;
            to.value = temp;
        }

        // Mostra il loader quando il form viene inviato
        document.getElementById('convertForm').addEventListener('submit', function() {
            document.getElementById('loading').style.display = 'block';
        });
    </script>

    <!-- Bootstrap JS (opzionale per alcuni componenti, ma non necessario) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>