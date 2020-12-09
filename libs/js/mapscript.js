import * as mapsource from './mapsources.js';

let mapcords;
let countriesList;

//get geodata for country outlines and create country list object
$.ajax({
  type: 'POST',
  url: 'libs/php/geodataDecode.php',
  data: { action: 'test' },
  dataType: 'json',
  success: function (response) {
    mapcords = response.geoData;
    countriesList = generateCountryList();
  },

  error: function (errorThrown) {
    console.log(errorThrown);
  }
});

mapsource.stadia(); //default map style
let countryOutlines = L.featureGroup();

const getCurrentNavCords = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      L.marker([position.coords.latitude, position.coords.longitude]).addTo(mapsource.map);
      //`https://api.opencagedata.com/geocode/v1/json?q=${postion.coords.latitude}+${position.coords.longitude}&key=e6653782923143fba432e00a48a0f2fa`;
    });
  } else {
    console.log("Browser doesn't support geolocation!");
  }
};

const generateCountryList = () => {
  //create object of countries from geodata
  let countries = {};
  for (let i = 0; i < mapcords.features.length; i++) {
    countries[i] = mapcords.features[i].properties.name.toLowerCase();
  }
  return countries;
};

const getListOfPossibleCountries = () => {
  let input = $('#countrySearch').val();
  const regex = new RegExp(`^${input}`);
  let countries = [];
  for (let country in countriesList) {
    if (regex.test(countriesList[country])) {
      countries.push(countriesList[country]);
    }
  }
  return countries;
};

//Jquery Functions

$(document).ready(function () {
  //call jquery functions after page loaded

  $('html').keyup(() => countrySearch(getListOfPossibleCountries()));

  $('#countrySearch').keypress(function (event) {
    //enter key has same effect as pressing country identify button
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      countrySearch($('#countrySearch').val().toLowerCase());
    }
    event.stopPropagation();
  });

  $('#countrySearch').val('').focus(); //resets input box to empty

  $('#mapstyle').click(function () {
    //when change map style button is clicked, change map source
    try {
      mapsource[$('#mapprovider').val()]();
    } catch {
      mapsource.stadia();
    }
  });

  $('#clear').click(function () {
    //clears all outlines and resets search box
    countryOutlines.clearLayers();
    $('#countrySearch').val('');
    mapsource.map.setView([51.505, -0.09], 5);
  });

  getCurrentNavCords();
});

const countrySearch = (countries) => {
  countryOutlines.clearLayers();

  if (countries.length !== Object.keys(countriesList).length) {
    for (let i = 0; i < countries.length; i++) {
      let countryFound = false;
      let countryNumber = null;
      for (let item in countriesList) {
        if (countriesList[item] === countries[i]) {
          countryFound = true;
          countryNumber = item;
        }
      }
      if (countryFound) {
        drawCountryOutline(countryNumber);
      } else {
        console.log(`${countries[i]} was not found.`);
      }
    }
    mapsource.map.fitBounds(countryOutlines.getBounds());
  }
};

const swapLongLat = (coordArray) => {
  //swap longitute and latitude as leaflet/geodata are in opposite order
  return coordArray.map((longLatArray) => {
    return [longLatArray[1], longLatArray[0]];
  });
};

const capitalizeCountryName = (name) => {
  let separateWord = name.toLowerCase().split(' ');
  for (let i = 0; i < separateWord.length; i++) {
    separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(' ');
};

const drawCountryOutline = (countryNum) => {
  const countrycords = mapcords.features[countryNum].geometry.coordinates;

  if (mapcords.features[countryNum].geometry.type === 'Polygon') {
    //check if the geocords are a single polygon or group of polygons
    //then use appropriate code to add to map
    let country = L.polygon(swapLongLat(countrycords[0]), { color: 'yellow', id: countryNum });
    countryOutlines.addLayer(country);
    country.on('click', function () {
      console.log(countriesList[country.options.id]);
      $('#selected-country').text(capitalizeCountryName(countriesList[country.options.id]));
      $('#infoModal').modal('show');
    });
  } else {
    try {
      for (let i = 0; i < countrycords.length; i++) {
        let country = L.polygon(swapLongLat(countrycords[i][0]), { color: 'yellow', id: countryNum });
        countryOutlines.addLayer(country);
        country.on('click', function () {
          console.log(countriesList[country.options.id]);
          $('#selected-country').text(capitalizeCountryName(countriesList[country.options.id]));
          $('#infoModal').modal('show');
        });
      }
    } catch {
      (error) => console.log(error);
    }
  }

  countryOutlines.addTo(mapsource.map);
};
