import * as mapsource from './mapsources.js';

export const handleWeatherData = country => {
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

  const getCities = countryCode => {
    console.log(countryCode);
    $.ajax({
      type: 'POST',
      url: 'libs/php/cityWeatherDecode.php',
      data: { action: 'test' },
      dataType: 'json',
      success: function (response) {
        let weatherCities = response.cityWeatherData;
        let matchingCities = [];
        weatherCities.forEach(cityDataObject => {
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

  const getCountryCode = country => {
    let countryCode = '';
    countryObjects.forEach(countryDataObject => {
      if (countryDataObject.properties.name.toLowerCase() === country.toLowerCase()) {
        countryCode = countryDataObject.properties.iso_a2;
      }
    });
    return countryCode;
  };

  const getWeatherData = cityArray => {
    console.log('getting weather');
    const generateCityCodeString = () => {
      let cityCodeString = cityArray[0];
      for (let i = 1; i < 10; i++) {
        let randomCity = Math.floor(Math.random() * cityArray.length);
        cityCodeString = cityCodeString + ',' + cityArray[randomCity];
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
          const cityData = result.data;
          let cityWeatherTable = '';

          $('#weather').on('click', function () {
            console.log('getting city data');
            cityData.map(data => {
              cityWeatherTable += `<tr><td>${data.name}</td><td>${data.weather[0].description}</td><td>${
                data.wind.speed
              }</td><td>${Math.round(data.main.temp - 273.15)}</td></tr>`; //need to convert temp from K to C
              if ($('#cities-button').val() === 'on') {
                L.marker([data.coord.lat, data.coord.lon])
                  .bindTooltip(data.name, {
                    permanent: false,
                    direction: 'auto'
                  })
                  .addTo(mapsource.map);
              }
            });
          });

          console.log(cityWeatherTable);
          $('#city-weather-table').find('tr:gt(0)').remove();
          $(cityWeatherTable).appendTo('#city-weather-table tbody');
        }
      },

      error: function (errorThrown) {
        console.log(generateCityCodeString());
        console.log(errorThrown);
      }
    });
  };
};
