<?php

$executionStartTime = microtime(true) / 1000;

$url = 'http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=pilchness';

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

$output['status']['code'] = '200';
$output['status']['name'] = 'ok';
$output['status']['description'] = 'mission saved';
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . ' ms';

$geodata = json_decode($result);
$numberOfCountries = count($geodata->geonames);

$randomCountries = [
  $geodata->geonames[rand(0, $numberOfCountries / 4)],
  $geodata->geonames[rand($numberOfCountries / 4, $numberOfCountries / 2)],
  $geodata->geonames[rand($numberOfCountries / 2, $numberOfCountries - $numberOfCountries / 4)],
  $geodata->geonames[rand($numberOfCountries - $numberOfCountries / 4, $numberOfCountries)],
];

$capitalCityQuizQuestions = [
  'What is the capital of ' . $randomCountries[0]->countryName . '?',
  $randomCountries[0]->capital ? $randomCountries[0]->capital : 'No Capital',
  $randomCountries[1]->capital ? $randomCountries[1]->capital : 'No Capital',
  $randomCountries[2]->capital ? $randomCountries[2]->capital : 'No Capital',
  $randomCountries[3]->capital ? $randomCountries[3]->capital : 'No Capital',
];

$buttonStyle = "\"width: 20em; height: 2em;\"";

echo '<h3>' . $capitalCityQuizQuestions[0] . '</h3><br />';

$correctAnswer = '<button id="quiz-1" style=' . $buttonStyle . '>' . $capitalCityQuizQuestions[1] . '</button><br />';
$answerOption1 = '<button id="quiz-2" style=' . $buttonStyle . '>' . $capitalCityQuizQuestions[2] . '</button><br />';
$answerOption2 = '<button id="quiz-3" style=' . $buttonStyle . '>' . $capitalCityQuizQuestions[3] . '</button><br />';
$answerOption3 = '<button id="quiz-4" style=' . $buttonStyle . '>' . $capitalCityQuizQuestions[4] . '</button><br />';

$answerArray = [$correctAnswer, $answerOption1, $answerOption2, $answerOption3];

shuffle($answerArray);

foreach ($answerArray as $answer) {
  echo $answer;
}

?>
