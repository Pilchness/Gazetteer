$.ajax({
  type: 'POST',
  url: 'libs/php/getAllCountryData.php',
  //dataType: 'json',
  //data: { code: ISOcode },
  success: function (response) {
    //     const topTenPopulation = () => {
    //       const countries = response.data;

    //       console.log(countries);
    //       let topTenPopulations = [];
    //       for (let i = 0; i < 10; i++) {
    //         topTenPopulations.push({ name: countries[i].name, population: countries[i].population });
    //       }
    //       response.data.forEach((country) => {
    //         for (let i = 0; i < topTenPopulations.length; i++) {
    //           if (country.population > topTenPopulations[i].population) {
    //             topTenPopulations[i] = { country: country.name, population: country.population };
    //             break;
    //           }
    //         }
    //       });
    //       topTenPopulations.sort(function (a, b) {
    //         return b.population - a.population;
    //       });
    //       return topTenPopulations;
    //     };

    //     console.log(topTenPopulation());

    //     const topTenArea = () => {
    //       const countries = response.data;
    //       let topTenAreas = [];
    //       for (let i = 0; i < 10; i++) {
    //         topTenAreas.push({ name: countries[i].name, area: countries[i].area });
    //       }
    //       response.data.forEach((country) => {
    //         for (let i = 0; i < topTenAreas.length; i++) {
    //           if (country.area > topTenAreas[i].area) {
    //             topTenAreas[i] = { country: country.name, area: country.area };
    //             break;
    //           }
    //         }
    //       });
    //       topTenAreas.sort(function (a, b) {
    //         return b.area - a.area;
    //       });
    //       return topTenAreas;
    //     };

    //     console.log(topTenArea());

    const topTen = (property, direction) => {
      const countries = response.data;
      let topTen = [];
      for (let i = 0; i < 10; i++) {
        topTen.push({ name: countries[i].name, [property]: countries[i][property] });
      }
      response.data.forEach((country) => {
        for (let i = 0; i < topTen.length; i++) {
          if (country[property] > topTen[i][property]) {
            topTen[i] = { country: country.name, [property]: country[property] };
            break;
          }
        }
      });
      if (direction) {
        topTen.sort(function (a, b) {
          return b[property] - a[property];
        });
        return topTen;
      } else {
        topTen.sort(function (a, b) {
          return a[property] - b[property];
        });
        return topTen;
      }
    };
    console.log(topTen('area', true));
    console.log(topTen('population', false));
    console.log(topTen('gini', true));
  },
  error: function (errorThrown) {
    console.log(errorThrown);
  }
});
