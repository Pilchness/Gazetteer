import * as mapsource from './mapsources.js';

$(document).ready(function () {
  $('#cities-button').on('click', function () {
    console.log($('#cities-button').val());
    if ($('#cities-button').val() === 'off') {
      $('#cities-button').css('background-color', 'rgba(20, 250, 20, 0.3)');
      $('#cities-button').val('on');
    } else {
      $('#cities-button').css('background-color', 'rgba(250, 20, 20, 0.3)');
      $('#cities-button').val('off');
    }
  });

  $('#current-button').on('click', function () {
    console.log($('#current-button').val());
    if ($('#current-button').val() === 'off') {
      $('#current-button').css('background-color', 'rgba(20, 250, 20, 0.3)');
      $('#current-button').val('on');
    } else {
      $('#current-button').css('background-color', 'rgba(250, 20, 20, 0.3)');
      $('#current-button').val('off');
    }
  });

  $('#pois-button').on('click', function () {
    console.log($('#pois-button').val());
    if ($('#pois-button').val() === 'off') {
      $('#pois-button').css('background-color', 'rgba(20, 250, 20, 0.3)');
      $('#pois-button').val('on');
    } else {
      $('#pois-button').css('background-color', 'rgba(250, 20, 20, 0.3)');
      $('#pois-button').val('off');
    }
  });

  $('#names-button').on('click', function () {
    console.log($('#names-button').val());
    if ($('#names-button').val() === 'off') {
      $('#names-button').css('background-color', 'rgba(20, 250, 20, 0.3)');
      $('#names-button').val('on');
    } else {
      $('#names-button').css('background-color', 'rgba(250, 20, 20, 0.3)');
      $('#names-button').val('off');
    }
  });
});
