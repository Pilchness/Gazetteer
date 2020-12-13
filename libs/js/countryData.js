import * as mapsource from './mapsources.js';
//import { getISOcountryName } from './getISOcountry.js';

export const displayCountryData = (countryData) => {
  console.log(countryData);
  const countryName = countryData.data.name;
  const flagLink = countryData.data.flag;
  const population = countryData.data.population;
  const borders = countryData.data.borders;
  const capital = countryData.data.capital;
  const currencies = countryData.data.currencies;
  const languages = countryData.data.languages;
  const region = countryData.data.region;
  const timezones = countryData.data.timezones;
  const subregion = countryData.data.subregion;
  const giniRating = countryData.data.gini;
  const area = countryData.data.area;
  const latitude = countryData.data.latlng[0];
  const longitude = countryData.data.latlng[1];

  console.log(borders);

  let decodedBordersCode = '';
  let decodedBordersArray = [];

  const getISOCountryNames = () => {
    let country = '';
    $.ajax({
      type: 'POST',
      url: 'libs/php/geodataDecode.php',
      dataType: 'json',
      data: { action: 'all' },
      success: function (response) {
        //console.log(response.geoData.features);
        let countryData = response.geoData.features;
        console.log(countryData[15]);
        for (let j = 0; j < borders.length; j++) {
          for (let i = 0; i < countryData.length; i++) {
            //console.log(countryData[i].properties.iso_a3, borders[j]);
            if (countryData[i].properties.iso_a3 === borders[j]) {
              country =
                countryData[i].properties.name.charAt(0).toUpperCase() + countryData[i].properties.name.slice(1);
              decodedBordersArray.push(country);
              //console.log(country);
            }
          }
        }
        console.log(decodedBordersArray);
        if (decodedBordersArray.length > 0) {
          decodedBordersArray.map((country) => {
            decodedBordersCode += `${country}, `;
          });
          console.log(decodedBordersCode);
          L.marker([latitude, longitude])
            .addTo(mapsource.map)
            .bindPopup(
              `<b><h3>${countryName}</h3></b><br/><img src=${flagLink} alt=${
                countryName + ' flag'
              } width=100px /><p>${countryName} is a country of population ${population}, located in ${subregion}. It has an area of ${area}km² and its capital is ${capital}.
</p>`,
              { className: 'leaflet-pop' }
            )
            .openPopup();
          $('#selected-country').text(countryName);
          //   $('#place-info').html(`
          //       <div>
          //         <ul>
          //           <li>Population: ${population}</li>
          //           <li>Area: ${area} km²</li>
          //           <li>Region: ${region}</li>
          //           <li>Sub Region: ${subregion}</li>
          //           <li>Timezones</li>
          //           <li>Currencies</li>
          //           <li>Borders</li>
          //           <li>Languages</li>
          //         </ul>
          //       </div>`);

          let facts = `<div id="figure-facts-overlay" style="width: 300px; display: none; background-color: rgba(63, 127, 191, 0.7); color: white">
             <ul>
               <li>Population: ${population}</li>
               <li>Area: ${area} km²</li>
               <li>Region: ${region}</li>
               <li>Sub Region: ${subregion}</li>
               <li>Gini Rating: ${giniRating}</li>
             </ul>
           </div>`;

          let bordersInfo = `<figure id="figure-border-overlay" style="display: none; background-color: rgba(63, 127, 191, 0.7);
      margin-top: 39px; margin-left:20px; padding: 5px; width:354px; height: 231px; color: white; position: absolute; top: 0; left: 0;">
             
${
  borders.length === 0
    ? `<p>${countryName} has borders with no other countries.</p>`
    : borders.length > 1
    ? `<p>${countryName} has borders with ${borders.length} other countries: </p>${decodedBordersCode.slice(
        0,
        decodedBordersCode.length - 2
      )}`
    : `<p>${countryName} only has a border with ${decodedBordersArray[0]}.</p></figure>`
}`;

          $('#menu-facts').on('click', function () {
            $('#info-overlay').html(facts);
            $('#country-image-title').css({ color: 'transparent', transition: 'color 2s' });
            $('#figure-facts-overlay').fadeIn(3000, function () {
              $('#info-menu-background').on('click', function () {
                $('#figure-facts-overlay').fadeOut(3000, function () {});
              });
            });
          });

          $('#menu-borders').on('click', function () {
            $('#info-overlay').html(bordersInfo);
            $('#country-image-title').css({ color: 'transparent', transition: 'color 2s' });
            $('#figure-border-overlay').fadeIn(3000, function () {});
          });
        }
      },
      error: function (errorThrown) {
        console.log(errorThrown);
      }
    });
  };

  getISOCountryNames();

  // specify popup options
};
