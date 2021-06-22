import { createOffers } from './data.js';

// Модуль, который будет отвечать за генерацию разметки похожих элементов.
const mapCanvas = document.querySelector('#map-canvas');
const similarOfferTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const similarOffers = createOffers;

similarOffers.forEach((similarOffer) => {
  const offerElement = similarOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').src = similarOffer.author.avatar;
  offerElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${similarOffer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__text--capacity').textContent = `${similarOffer.offer.rooms} комнаты для ${similarOffer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`;
  if (similarOffer.offer.type === 'palace') {
    offerElement.querySelector('.popup__type').textContent = 'Дворец';
  } else if (similarOffer.offer.type === 'flat') {
    offerElement.querySelector('.popup__type').textContent = 'Квартира';
  } else if (similarOffer.offer.type === 'bungalow') {
    offerElement.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (similarOffer.offer.type === 'house') {
    offerElement.querySelector('.popup__type').textContent = 'Дом';
  } else if (similarOffer.offer.type === 'hotel') {
    offerElement.querySelector('.popup__type').textContent = 'Отель';
  }
  // Вывод доступных удобств
  const featuresList = offerElement.querySelector('.popup__features');
  const fragment = document.createDocumentFragment();
  // Сначала очищаем список с удобствами
  while (featuresList.firstChild) {
    featuresList.removeChild(featuresList.firstChild);
  }
  featuresList.innerHTML = '';
  // Затем добавляем в него новые удобства
  for (let index = 0; index < similarOffer.offer.features.length; index++) {
    const featureNewElement = document.createElement('li');
    featureNewElement.classList.add('popup__feature');
    featureNewElement.classList.add(`popup__feature--${similarOffer.offer.features[index]}`);
    fragment.appendChild(featureNewElement);
  }
  featuresList.appendChild(fragment);

  offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;

  // Вывод фотографий
  const photosBlock = offerElement.querySelector('.popup__photos');
  const photoElement = photosBlock.querySelector('.popup__photo');
  photosBlock.removeChild(photoElement);
  for (let index = 0; index < similarOffer.offer.photos.length; index++) {
    const photoNewElement = photoElement.cloneNode(true);
    photoNewElement.src = similarOffer.offer.photos[index];
    fragment.appendChild(photoNewElement);
  }
  photosBlock.appendChild(fragment);

  // Проверяем, если не хватает данных, например, отсутствует описание, то скрываем блок
  if (similarOffer.offer.description === '') {
    offerElement.querySelector('.popup__description').classList.add('hidden');
  }
  mapCanvas.appendChild(offerElement);
});
