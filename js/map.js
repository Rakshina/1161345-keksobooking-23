// Модуль работы с картой;
import { createOffers } from './data.js';
import {  activateForm, adAddress } from './form.js';

const InitialSettingMap = {
  LAT: 35.681700,
  LNG: 139.753891,
  ZOOM: 10,
};

const MainMarkerSetting = {
  WIDTH: 52,
  HEIGHT: 52,
  URL: './img/main-pin.svg',
};

const SimilarMarkerSetting = {
  WIDTH: 40,
  HEIGHT: 40,
  URL: './img/pin.svg',
};

const map = L.map('map-canvas')
  .on('load', activateForm)
  .setView({
    lat: InitialSettingMap.LAT,
    lng: InitialSettingMap.LNG,
  }, InitialSettingMap.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главный маркет на карте;
const mainMarkerIcon = L.icon(
  {
    iconUrl: MainMarkerSetting.URL,
    iconSize: [MainMarkerSetting.WIDTH, MainMarkerSetting.HEIGHT],
    iconAnchor: [MainMarkerSetting.WIDTH / 2, MainMarkerSetting.HEIGHT],
  },
);
const mainMarker = L.marker(
  {
    lat: InitialSettingMap.LAT,
    lng: InitialSettingMap.LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

// Метки похожих объявлений;

// Массив похожих объявлений;
const renderSimilarOffersPins = (items) => {
  const points = [];
  items.forEach((item) => {
    const point = {
      src: item.author,
      title: item.offer.title,
      address: item.offer.address,
      price: item.offer.price,
      type: item.offer.type,
      rooms: item.offer.rooms,
      guests: item.offer.guests,
      checkin: item.offer.checkin,
      checkout: item.offer.checkout,
      features: item.offer.features,
      photos: item.offer.photos,
      lat: item.location.lat,
      lng: item.location.lng,
      description: item.offer.description,
    };
    points.push(point);
  });
  return points;
};

const similarOffers = createOffers;

const similarOffersPins = renderSimilarOffersPins(similarOffers);

const createCustomPopup = (point) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = popupTemplate.cloneNode(true);
  popupElement.querySelector('.popup__avatar').src = point.author.avatar;
  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  popupElement.querySelector('.popup__type').textContent = point.offer.type;

  const featuresList = popupElement.querySelector('.popup__features');
  const fragment = document.createDocumentFragment();
  featuresList.innerHTML = '';
  for (let index = 0; index < point.features.length; index++) {
    const featureNewElement = document.createElement('li');
    featureNewElement.classList.add('popup__feature');
    featureNewElement.classList.add(`popup__feature--${point.features[index]}`);
    fragment.appendChild(featureNewElement);
  }
  featuresList.appendChild(fragment);

  popupElement.querySelector('.popup__description').textContent = point.description;

  const photosBlock = popupElement.querySelector('.popup__photos');
  const photoElement = photosBlock.querySelector('.popup__photo');
  photosBlock.removeChild(photoElement);
  for (let index = 0; index < point.photos.length; index++) {
    const photoNewElement = photoElement.cloneNode(true);
    photoNewElement.src = point.photos[index];
    fragment.appendChild(photoNewElement);
  }
  photosBlock.appendChild(fragment);

  if (point.description === '') {
    popupElement.querySelector('.popup__description').classList.add('hidden');
  }

  return popupElement;
};

similarOffersPins.forEach((similarOffer) => {
  const {lat, lng} = similarOffer;

  const icon = L.icon({
    iconUrl: SimilarMarkerSetting.URL,
    iconSize: [SimilarMarkerSetting.WIDTH, SimilarMarkerSetting.HEIGHT],
    iconAnchor: [SimilarMarkerSetting.WIDTH / 2, SimilarMarkerSetting.HEIGHT],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCustomPopup(similarOffer),
      {
        keepInView: true,
      },
    );
});

// Добавляет координаты адресса в форму;
const getMainMarkerCurrentPosition = (evt) => {
  const currentLatitude = evt.target.getLatLng().lat.toFixed(5);
  const currentLongitude = evt.target.getLatLng().lng.toFixed(5);

  adAddress.value = `${currentLatitude}, ${currentLongitude}`;
};

mainMarker.on('moveend', getMainMarkerCurrentPosition);
