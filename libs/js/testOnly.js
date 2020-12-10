$('#api1').click(function () {
  $.ajax({
    url: 'libs/php/getNeighbouringCountries.php',
    type: 'POST',
    dataType: 'json',
    data: {
      country: 'france'
    },

    success: function (result) {
      if (result.status.name === 'ok') {
        console.log(result);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
});

$('#api2').click(function () {
  $.ajax({
    url: 'libs/php/getUKPostcodeArea.php',
    type: 'POST',
    dataType: 'json',
    data: {
      postcode: $.trim($('#inpPostcode').val().replace(/\s+/g, ''))
    },

    success: function (result) {
      if (result.data[0] === undefined) {
        $('#results').html('<br/>RESULTS: ' + $('#inpPostcode').val() + ' is an invalid Postcode, please try again.');
      }

      if (result.status.name == 'ok') {
        $('#results').html(
          '<br/>RESULTS: ' +
            $('#inpPostcode').val() +
            ' is in ' +
            result.data[0]['adminName3'] +
            ', ' +
            result.data[0]['adminName2']
        );
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
});

$('#api3').click(function () {
  $.ajax({
    url: 'libs/php/getUSTimeZone.php',
    type: 'POST',
    dataType: 'json',
    data: {
      lat: $('#state').val().split(',')[0],
      long: $('#state').val().split(',')[1]
    },

    success: function (result) {
      if (result.status.name == 'ok') {
        $('#results').html(
          '<br/>RESULTS: ' +
            $('#state option:selected').text() +
            ' is ' +
            Math.abs(result.data.gmtOffset) +
            ' hours ' +
            (result.data.gmtOffset < 0 ? 'behind' : 'ahead of') +
            ' GMT time.'
        );
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
});
