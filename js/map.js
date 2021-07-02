import { activateForm } from './form.js';
import { createCard } from './similar-offers-list.js';

const INITIAL_SETTING_MAP = {
  lat: 35.67500,
  lng: 139.75000,
};

const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: INITIAL_SETTING_MAP .lat,
    lng: INITIAL_SETTING_MAP .lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainIcon = L.icon(
  {
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainMarker = L.marker(
  {
    lat: INITIAL_SETTING_MAP .lat,
    lng: INITIAL_SETTING_MAP .lng,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainMarker.addTo(map);

addressInput.value = `${mainMarker._latlng.lat.toFixed(5)}, ${mainMarker._latlng.lng.toFixed(5)}`;

mainMarker.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createAdMarker = (dataAd) => {

  const { location } = dataAd;

  const iconAd = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markerAd = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: iconAd,
    },
    {
      keepInView: true,
    },
  );

  markerAd.addTo(markerGroup).bindPopup(createCard(dataAd));
};


export { createAdMarker };
