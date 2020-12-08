export const map = L.map('mapid').setView([51.505, -0.09], 5);

export const here = () => {
  return L.tileLayer
    .provider('HEREv3.terrainDay', {
      apiKey: 'HvkPdvSs-fo46BuqakUsfDTOtZcehw8PAZf7wX4KmXI'
    })
    .addTo(map);
};

export const stadia = () => {
  return L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org">OpenMapTiles</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);
};

export const jawg = () => {
  return L.tileLayer
    .provider('Jawg.Streets', {
      variant: '',
      accessToken: 'YFmp77AAW81RBaq2LhxMCkDSdGniKo085kcxnS9PwVn0TboLUaw3Q21waAn7jTQ5'
    })
    .addTo(map);
};

export const forest = () => {
  return L.tileLayer.provider('Thunderforest.Landscape', { apikey: '6edf007c572b46c88e5016bfe349c3bc' }).addTo(map);
};
