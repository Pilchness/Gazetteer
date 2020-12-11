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
  $geodata->geonames[rand($numberOfCountries - $numberOfCountries / 4, $numberOfCountries - 1)],
];

$capitalCityQuizQuestions = [
  'What is the capital of ' . $randomCountries[0]->countryName . '?',
  $randomCountries[0]->capital ? $randomCountries[0]->capital : 'No Capital',
  $randomCountries[1]->capital ? $randomCountries[1]->capital : 'No Capital',
  $randomCountries[2]->capital ? $randomCountries[2]->capital : 'No Capital',
  $randomCountries[3]->capital ? $randomCountries[3]->capital : 'No Capital',
];

$buttonStyle = "\"width: 20em; height: 3em; margin: 2px\"";
$infoStyle = "\"width: 8em; height: 3em; margin: 2px\"";

echo '<h4>' . $capitalCityQuizQuestions[0] . '</h4><br />';

$correctAnswer =
  '<button id="quiz-1" value=true class="btn btn-secondary" style=' .
  $buttonStyle .
  '>' .
  $capitalCityQuizQuestions[1] .
  '</button>';
$answerOption1 =
  '<button id="quiz-2" value=false class="btn btn-secondary" style=' .
  $buttonStyle .
  '>' .
  $capitalCityQuizQuestions[2] .
  '</button>';
$answerOption2 =
  '<button id="quiz-3" value=false class="btn btn-secondary" style=' .
  $buttonStyle .
  '>' .
  $capitalCityQuizQuestions[3] .
  '</button>';
$answerOption3 =
  '<button id="quiz-4" value=false class="btn btn-secondary" style=' .
  $buttonStyle .
  '>' .
  $capitalCityQuizQuestions[4] .
  '</button>';

$answerArray = [$correctAnswer, $answerOption1, $answerOption2, $answerOption3];

shuffle($answerArray);

if (isset($_REQUEST['currentCorrectScore'])) {
  $correct = $_REQUEST['currentCorrectScore'];
} else {
  $correct = 0;
}

if (isset($_REQUEST['currentFailScore'])) {
  $incorrect = $_REQUEST['currentFailScore'];
} else {
  $incorrect = 0;
}

if (isset($_REQUEST['currentPercentage'])) {
  $percentage = $_REQUEST['currentPercentage'];
} else {
  $percentage = 0;
}

echo '<span>' .
  $answerArray[0] .
  '<button id="quiz-success" class="btn btn-success" style=' .
  $infoStyle .
  '>Correct: ' .
  $correct .
  '</button></span><br />';

echo '<span>' .
  $answerArray[1] .
  '<button id="quiz-fail" class="btn btn-danger" style=' .
  $infoStyle .
  '>Incorrect: ' .
  $incorrect .
  '</button></span><br />';

echo '<span>' .
  $answerArray[2] .
  '<button id="quiz-percentage" class="btn btn-info" style=' .
  $infoStyle .
  '>Success: ' .
  $percentage .
  '%</button></span><br />';

echo '<span>' .
  $answerArray[3] .
  '<button id="quiz-restart" class="btn btn-primary" style=' .
  $infoStyle .
  '>Restart</button></span><br />';

?>
