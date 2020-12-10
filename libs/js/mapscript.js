import * as mapsource from './mapsources.js';
import { handleWeatherData } from '../js/weather.js';

let mapcords;
let countriesList;
let outlineColour = 'blue'; //default colour

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

const addPhotoSourceInformation = (data) => {
  $('#country-image-more').click(function () {
    let photographer = data.user.name;
    let portfolio = data.user.portfolio_url;
    let location = data.user.location;
    let twitter = data.user.twitter_username;
    let bio = data.user.bio;
    let created = new Date(data.created_at).toString().slice(1, 15);
    let likes = data.likes;

    alert(
      `Photographer: ${photographer}\nHome Country: ${location}\nBio: ${bio}\nThis photo has been liked ${likes} times.\n\nSee more photos by this photographer: ${portfolio} `
    );
    console.log(photographer, portfolio, location, twitter, bio, created, likes);
  });
};

const getCountryImage = (country) => {
  console.log('getting photo');

  $.ajax({
    url: 'libs/php/getCountryImage.php',
    type: 'POST',
    dataType: 'json',
    data: {
      countryName: country
    },

    success: function (result) {
      if (result.status.name === 'ok') {
        //let randomImage = Math.floor(Math.Rand * 10);
        if (result.data[0]) {
          let src = result.data[0].urls.raw + '&w=235&dpr=2';
          let alt = result.data[0].alt_description;
          console.log(result.data[0].alt_description);

          $('#country-image').attr('src', src);
          $('#country-image').attr('alt', alt);
          $('#country-image-title').text(alt);

          addPhotoSourceInformation(result.data[0]);
        } else {
          $('#country-image').attr('src', 'images/fmapthumb.png');
        }
      }
    },

    error: function (errorThrown) {
      console.log(errorThrown);
    }
  });
};

//getCountryImage('iceland');

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

const countryFocus = (country) => {
  //when one country is selected, get data and change outline to green
  $('#countrySearch').val(country);
  handleWeatherData(country);
  //console.log(weatherTableData);
  getCountryImage(country.split(' ').join('_'));
  outlineColour = 'green';

  // const weather = new Promise(function (resolve, reject) {
  //   resolve(getLocalCityWeather(country));
  // });
  // weather.then((data) => console.log(data));

  // .then((data) => handleWeatherData(data))
  // .then(() => getCountryImage(country.split(' ').join('_')));
  //console.log(cityData);
  //handleWeatherData(cityData);
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
  if (countries.length === 1) {
    $('countrySearch').val(countries[0]);
    countryFocus(countries[0]);
  } else {
    outlineColour = 'blue';
  }
  return countries;
};

//Jquery Functions

$(document).ready(function () {
  //call jquery functions after page loaded
  // $(document).keypress(function (event) {
  //   var keycode = event.keyCode ? event.keyCode : event.which;
  //   if (keycode == '13') {
  //     $('#countrySearch').val(getListOfPossibleCountries[0]);
  //   }
  // });

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
    let country = L.polygon(swapLongLat(countrycords[0]), { color: outlineColour, id: countryNum });
    countryOutlines.addLayer(country);
    country.on('click', function () {
      console.log(countriesList[country.options.id]);
      $('#selected-country').text(capitalizeCountryName(countriesList[country.options.id]));
      $('#infoModal').modal('show');
    });
  } else {
    try {
      for (let i = 0; i < countrycords.length; i++) {
        let country = L.polygon(swapLongLat(countrycords[i][0]), { color: outlineColour, id: countryNum });
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
