import { offerForm, adFormElement, resetFormButton, adAddress } from './form.js';
import { mapFilters, mapFiltersElements } from './filters.js';

const ZOOM = 10;

const INITIAL_SETTING_MAP = {
  lat: 35.67500,
  lng: 139.75000,
};

const activatePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  adFormElement.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
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

// Установка в поле адреса начальных координат маркера
const setMainMarkerInitialPosition = () => {
  adAddress.value = `${mainMarker._latlng.lat}, ${mainMarker._latlng.lng}`;
};

setMainMarkerInitialPosition();

// Получение текущей позиции маркера и установка в поле адреса
const getMainMarkerCurrentPosition = (evt) => {
  const currentLatitude = evt.target.getLatLng().lat.toFixed(5);
  const currentLongitude = evt.target.getLatLng().lng.toFixed(5);

  adAddress.value = `${currentLatitude}, ${currentLongitude}`;
};

mainMarker.on('moveend', getMainMarkerCurrentPosition);

// Сброс позиции маркера и карты
const resetMapPosition = () => {
  mainMarker.setLatLng({
    lat: INITIAL_SETTING_MAP.LAT,
    lng: INITIAL_SETTING_MAP.LNG,
  });
  map.setView({
    lat: INITIAL_SETTING_MAP.LAT,
    lng: INITIAL_SETTING_MAP.LNG,
  }, ZOOM);
};

const resetPage = () => {
  offerForm.reset();
  resetMapPosition();
  mapFilters.reset();
  setMainMarkerInitialPosition();
};

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
  resetMapPosition();
  setMainMarkerInitialPosition();
});

export { map, INITIAL_SETTING_MAP, resetPage, resetMapPosition };
