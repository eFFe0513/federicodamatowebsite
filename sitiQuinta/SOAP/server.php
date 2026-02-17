<?php
// Server SOAP per conversione Metri <-> Pollici

function convert($value, $fromUnit, $toUnit) {
    // 1 pollice = 0.0254 metri
    $metersPerInch = 0.0254;

    // Converto sempre il valore in metri come unità intermedia
    if ($fromUnit == 'm') {
        $meters = $value;
    } elseif ($fromUnit == 'in') {
        $meters = $value * $metersPerInch;
    } else {
        return "Unità di partenza non supportata (usa 'm' o 'in')";
    }

    // Converto dai metri all'unità desiderata
    if ($toUnit == 'm') {
        return $meters;
    } elseif ($toUnit == 'in') {
        return $meters / $metersPerInch;
    } else {
        return "Unità di destinazione non supportata (usa 'm' o 'in')";
    }
}

$server = new SoapServer("test.wsdl");
$server->addFunction("convert");
$server->handle();
?>