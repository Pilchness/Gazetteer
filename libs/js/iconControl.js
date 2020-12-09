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

$('#test').click(function () {
  $.ajax({
    url: 'libs/php/getCountryImage.php',
    type: 'POST',
    dataType: 'json',

    success: function (result) {
      if (result.status.name === 'ok') {
        //let randomImage = Math.floor(Math.Rand * 10);
        let src = result.data[3].urls.small;
        console.log(src);
        $('#country-image').attr('src', src);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
});
