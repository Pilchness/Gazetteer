import * as mapsource from './mapsources.js';

$(document).ready(function () {
  $('#weather').click(function () {
    console.log('weather');
    $('#weatherModal').modal('show');
  });

  $('#maptype').click(function () {
    console.log('map');
    $('#mapModal').modal('show');
  });

  $('#location').click(function () {
    console.log('location');
    $('#locationModal').modal('show');
  });

  $('#info').click(function () {
    console.log('info');
    $('#infoModal').modal('show');
  });

  $('#quiz').click(function () {
    console.log('quiz');
    $('#quizModal').modal('show');
  });

  $('#stadia').click(function () {
    console.log('stadia');
    mapsource.stadia();
  });

  $('#here').click(function () {
    console.log('here');
    mapsource.here();
  });

  $('#jawg').click(function () {
    console.log('jawg');
    mapsource.jawg();
  });

  $('#forest').click(function () {
    console.log('forest');
    mapsource.forest();
  });
});
