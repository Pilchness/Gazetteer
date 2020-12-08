<?php

      $strJsonGeoData = json_decode(file_get_contents("../../data/countryBorders.geo.json"));

      
   
    if(isset($_POST['action']) && !empty($_POST['action'])) {
        echo json_encode(array("geoData"=>$strJsonGeoData));
    }



?>
