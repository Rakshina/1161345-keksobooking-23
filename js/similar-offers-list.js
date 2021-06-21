import { similarOffers } from './data.js';

// Модуль, который будет отвечать за генерацию разметки похожих элементов.
const mapCanvas = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const createOffers = similarOffers();

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
  }) => {
    const offerElement = similarOfferTemplate.cloneNode(true);

    offerElement.querySelector('.popup__avatar').src = avatar;
    offerElement.querySelector('.popup__title').textContent = title;
    offerElement.querySelector('.popup__text--address').textContent = address;
    offerElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
    offerElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для  ${guests} гостей`;
    offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    if (type === 'palace') {
      offerElement.querySelector('.popup__type').textContent = 'Дворец';
    } else if (type === 'flat') {
      offerElement.querySelector('.popup__type').textContent = 'Квартира';
    } else if (type === 'bungalow') {
      offerElement.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (type === 'house') {
      offerElement.querySelector('.popup__type').textContent = 'Дом';
    } else if (type === 'hotel') {
      offerElement.querySelector('.popup__type').textContent = 'Отель';
    }
    // Вывод доступных удобств
    const fragment = document.createDocumentFragment();
    const featuresList = offerElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    //добавляем в него новые удобства
    for (let index = 0; index < features.length; index++) {
      const featureNewElement = document.createElement('li');
      featureNewElement.classList.add('popup__feature');
      featureNewElement.classList.add(`popup__feature--${features[index]}`);
      fragment.appendChild(featureNewElement);
    }
    featuresList.appendChild(fragment);

    offerElement.querySelector('.popup__description').textContent = descriptions;

    // Вывод фотографий
    const photosBlock = offerElement.querySelector('.popup__photos');
    const photoElement = photosBlock.querySelector('.popup__photo');
    photosBlock.removeChild(photoElement);
    for (let index = 0; index < photos.length; index++) {
      const photoNewElement = photoElement.cloneNode(true);
      photoNewElement.src = photos[index];
      fragment.appendChild(photoNewElement);
    }
    photosBlock.appendChild(fragment);

    // Проверяем, если не хватает данных, например, отсутствует описание, то скрываем блок
    if ( descriptions === '') {
      offerElement.querySelector('.popup__description').classList.add('hidden');
    }

    mapCanvas.appendChild(offerElement);
  });

