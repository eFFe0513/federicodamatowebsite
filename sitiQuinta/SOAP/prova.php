<?php
$wsdl = file_get_contents('http://fdwebsite.infinityfree.me/SOAP/test.wsdl');
echo htmlspecialchars($wsdl);
?>