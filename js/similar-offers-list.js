import { similarOffers } from "./data.js";

// Модуль, который будет отвечать за генерацию разметки похожих элементов.
const map = document.querySelector('.map');
const mapList = map.querySelector('.map__canvas');
const cardTemplate = document.querySelector("#card")
.content
.querySelector('.popup');

const createOffers = similarOffers();
const similarListFragment = document.createDocumentFragment();

createOffers.forEach(
  ({
    avatar,
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    descriptions,
    photos,
    location,
  }) => {
    const offerElement = cardTemplate.cloneNode(true);

    offerElement.querySelector('.popup__avatar').src = avatar;
    offerElement.querySelector('.popup__title').textContent = title;
    offerElement.querySelector('.popup__text--address').textContent = address;
    offerElement.querySelector('.popup__text--price').textContent = price + ' ₽/ночь';
    offerElement.querySelector('.popup__type').textContent = type; // ???
    offerElement.querySelector('.popup__text--capacity').textContent = rooms + ' комнаты для ' + guests + ' гостей';
    offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + checkin, + ' выезд до ' + checkout;
    offerElement.querySelector('.popup__features').textContent = features;
    offerElement.querySelector('.popup__description').textContent = descriptions;
    offerElement.querySelector('.popup__photos').src = photos;
    similarListFragment.appendChild(offerElement);

  }
);

mapList.appendChild(offerElement); 

