<html>
<head>
    <title>Convertitore Metri / Pollici (SOAP)</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-4">
        <form method="POST" action="" class="form-inline">
            <div class="form-group">
                <div class="col">
                    <input type="number" step="any" name="value" value="1" min="0" required/>
                </div>
                <div class="col">
                    <select name="fromUnit" class="form-control" required>
                        <option value="m">Metri (m)</option>
                        <option value="in">Pollici (in)</option>
                    </select>
                </div>
                <div class="col">
                    <select name="toUnit" class="form-control" required>
                        <option value="in">Pollici (in)</option>
                        <option value="m">Metri (m)</option>
                    </select>
                </div>
                <div class="col">
                    <input type="submit" value="Converti" class="btn btn-primary"/>
                </div>
            </div>
        </form>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['value'], $_POST['fromUnit'], $_POST['toUnit'])) {
            $wsdl_url = "http://fdwebsite.infinityfree.me/SOAP/test.wsdl";

            try {
                $value = (float)$_POST['value'];
                $from  = $_POST['fromUnit'];
                $to    = $_POST['toUnit'];

                $client = new SoapClient($wsdl_url, [
                    // 'location' => 'http://fdwebsite.infinityfree.me/SOAP/server.php', // opzionale se uguale al WSDL
                    'trace' => 1
                ]);

                $result = $client->convert($value, $from, $to);

                echo '<div class="jumbotron mt-4">';
                echo "<h2>Risultato: $value $from = $result $to</h2>";
                echo '</div>';

            } catch (SoapFault $e) {
                echo "<div class='alert alert-danger mt-4'>Errore SOAP: " . $e->getMessage() . "</div>";
            }
        }
        ?>
    </div>
</body>
</html>