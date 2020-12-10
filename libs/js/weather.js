const getLocalCityWeather = (country) => {
  let countryObjects;

  $.ajax({
    type: 'POST',
    url: 'libs/php/geodataDecode.php',
    data: { action: 'test' },
    dataType: 'json',
    success: function (response) {
      countryObjects = response.geoData.features;
      getCities(getCountryCode(country));
    },
    error: function (errorThrown) {
      console.log(errorThrown);
    }
  });

  const getCities = (countryCode) => {
    console.log(countryCode);
    $.ajax({
      type: 'POST',
      url: 'libs/php/cityWeatherDecode.php',
      data: { action: 'test' },
      dataType: 'json',
      success: function (response) {
        let weatherCities = response.cityWeatherData;
        let matchingCities = [];
        weatherCities.forEach((cityDataObject) => {
          if (cityDataObject.country === countryCode) {
            matchingCities.push(cityDataObject.id);
          }
        });
        getWeatherData(matchingCities);
      },
      error: function (errorThrown) {
        console.log(errorThrown);
      }
    });
  };

  const getCountryCode = (country) => {
    let countryCode = '';
    countryObjects.forEach((countryDataObject) => {
      if (countryDataObject.properties.name.toLowerCase() === country.toLowerCase()) {
        countryCode = countryDataObject.properties.iso_a2;
      }
    });
    return countryCode;
  };

  const getWeatherData = (cityArray) => {
    console.log('getting weather');
    const generateCityCodeString = () => {
      let cityCodeString = cityArray[0];
      for (let i = 1; i < 10; i++) {
        cityCodeString = cityCodeString + ',' + cityArray[i];
      }
      return cityCodeString;
    };

    $.ajax({
      url: 'libs/php/getCityWeather.php',
      type: 'POST',
      dataType: 'json',
      data: {
        cities: generateCityCodeString()
      },

      success: function (result) {
        if (result.status.name === 'ok') {
          console.log(result.data);
        }
      },

      error: function (errorThrown) {
        console.log(generateCityCodeString());
        console.log(errorThrown);
      }
    });
  };

  //getWeatherData([681648, 681645, 5923101]);
};

getLocalCityWeather('france');
