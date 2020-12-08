import * as mapsource from './mapsources.js';

let mapcords;
let countriesList;

$.ajax({
  type: 'POST',
  url: 'libs/php/geodataDecode.php',
  data: { action: 'test' },
  dataType: 'json',
  success: function (response) {
    mapcords = response.geoData;
    countriesList = generateCountryList();
  },

  error: function (jqXHR, textStatus, errorThrown) {
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

let previousCountriesList = [{ ...countriesList }];

const displayCountries = (countryObject) => {
  console.log(countryObject);
  countryOutlines.clearLayers();
  for (let country in countryObject) {
    drawCountryOutline(country);
  }
};

const countryCharacterSearch = (character, position) => {
  //set countriesList to possible countries based on input so far
  let matchingObject = {};
  for (let country in countriesList) {
    if (countriesList[country][position] === character) {
      matchingObject[country] = countriesList[country];
    }
  }
  previousCountriesList.push({ ...countriesList });
  countriesList = { ...matchingObject };
  displayCountries(countriesList);
  console.log(previousCountriesList);
  if (Object.keys(countriesList).length === 1) {
    $('#countrySearch').val(countriesList[Object.keys(countriesList)[0]]);
  }
};

const checkValidCountry = () => {
  //search for countries that match the current input string
  let currentInputLength = $('#countrySearch').val().length - 1;
  let userInput = $('#countrySearch').val();
  countryCharacterSearch(userInput[currentInputLength], currentInputLength);
};

const handleDeletedLetter = () => {
  if (Object.keys(countriesList).length > 1) {
    $('#countrySearch').attr('maxlength', '15');

    previousCountriesList.pop();
    checkValidCountry();
    countriesList = { ...previousCountriesList[previousCountriesList.length] };
    displayCountries(previousCountriesList[previousCountriesList.length]);
  } else {
    countriesList = generateCountryList();
  }
};

$(document).ready(function () {
  //call jquery functions after page loaded

  $('html').keyup(function (event) {
    if (Object.keys(countriesList).length === 1 && event.keyCode != 8) {
      $('#countrySearch').attr('maxlength', countriesList[Object.keys(countriesList)[0]].length.toString());
      $('#countrySearch').val(countriesList[Object.keys(countriesList)[0]]);
      console.log('max length is now ' + countriesList[Object.keys(countriesList)[0]].length);
    } else if (event.keyCode == 8) {
      handleDeletedLetter();
    } else {
      checkValidCountry();
    }
  });

  $('#countrySearch').keypress(function (event) {
    //enter key has same effect as pressing country identify button
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      countrySearch($('#countrySearch').val().toLowerCase());
    }
    event.stopPropagation();
  });

  $('#countrySearch').val(''); //resets input box to empty

  $('#mapstyle').click(function () {
    //when change map style button is clicked, change map source
    try {
      mapsource[$('#mapprovider').val()]();
    } catch {
      mapsource.stadia();
    }
  });

  $('#countryIdentify').click(function () {
    //when country search button is pressed, get country data
    countrySearch($('#countrySearch').val().toLowerCase());
  });

  $('#clear').click(function () {
    //clears all outlines and resets search box
    countryOutlines.clearLayers();
    countriesList = generateCountryList();
    $('#countrySearch').val('');
    mapsource.map.setView([51.505, -0.09], 5);
  });

  getCurrentNavCords();
});

const countrySearch = (country) => {
  //search for country in list
  let countryFound = false;
  let countryNumber = null;
  for (let item in countriesList) {
    if (countriesList[item] === country) {
      countryFound = true;
      countryNumber = item;
    }
  }
  if (countryFound) {
    drawCountryOutline(countryNumber);
  } else {
    console.log(`${country} was not found.`);
  }
};

const swapLongLat = (coordArray) => {
  //swap longitute and latitude as leaflet/geodata are in opposite order
  return coordArray.map((longLatArray) => {
    return [longLatArray[1], longLatArray[0]];
  });
};

const drawCountryOutline = (countryNum) => {
  const countrycords = mapcords.features[countryNum].geometry.coordinates;

  if (mapcords.features[countryNum].geometry.type === 'Polygon') {
    //check if the geocords are a single polygon or group of polygons
    //then use appropriate code to add to map
    let country = L.polygon(swapLongLat(countrycords[0]));
    countryOutlines.addLayer(country);
    mapsource.map.fitBounds(countryOutlines.getBounds());
  } else {
    try {
      let country = L.polygon(swapLongLat(countrycords[0][0]));
      //countryOutlines.addLayer(country);

      let bounds = country.getBounds();
      //console.log(countrycords.length);
      for (let i = 0; i < countrycords.length; i++) {
        let country = L.polygon(swapLongLat(countrycords[i][0]));
        countryOutlines.addLayer(country);
        if (i > 0) bounds.extend(country.getBounds());
      }
      mapsource.map.fitBounds(bounds);
    } catch {
      (error) => console.log(error);
    }
  }
  countryOutlines.addTo(mapsource.map);
};
