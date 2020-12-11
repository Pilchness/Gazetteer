export const getCountryFlagInfo = (country) => {
  let ISOcode = '';
  $.ajax({
    type: 'POST',
    url: 'libs/php/geodataDecode.php',
    dataType: 'json',
    data: { action: 'all' },
    success: function (response) {
      let countryData = response.geoData.features;
      for (let i = 0; i < countryData.length; i++) {
        if (countryData[i].properties.name.toLowerCase() === country) {
          ISOcode = countryData[i].properties.iso_a3;
          console.log(ISOcode);
        }
      }
    },

    error: function (errorThrown) {
      console.log(errorThrown);
    }
  });
};
