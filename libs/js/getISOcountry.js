export const getISOcountryName = (ISO3) => {
  let countryName = '';
  $.ajax({
    type: 'POST',
    url: 'libs/php/geodataDecode.php',
    dataType: 'json',
    data: { action: 'all' },
    success: function (response) {
      let countryData = response.geoData.features;
      for (let i = 0; i < countryData.length; i++) {
        if (countryData[i].properties.iso_3 === ISO3) {
          countryName =
            countryData[i].properties.name.charAt(0).toUpperCase() + countryData[i].properties.name.slice(1);
          console.log(countryName);
          return countryName;
        }
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    }
  });
};
