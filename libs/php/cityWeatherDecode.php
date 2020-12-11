<?php

ini_set('memory_limit', '1024M');

$strJsonCityWeatherData = json_decode(file_get_contents('../../data/city.list.json'));

if (isset($_POST['action']) && !empty($_POST['action'])) {
  echo json_encode(['cityWeatherData' => $strJsonCityWeatherData]);
}

?>
