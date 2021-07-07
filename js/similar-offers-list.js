// Модуль, который будет отвечать за генерацию разметки похожих элементов;
import { map } from './map.js';

const renderSimilarOffersPins = (items) => {
  const points = [];
  items.forEach((item) => {
    const point = {
      src: item.author.avatar,
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

const createCard = (similarOffer) => {
  const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offerElement = similarAdTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').src = similarOffer.author.avatar;
  offerElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${similarOffer.offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__text--capacity').textContent = `${similarOffer.offer.rooms} комнаты для ${similarOffer.offer.guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarOffer.offer.checkin}, выезд до ${similarOffer.offer.checkout}`;
  offerElement.querySelector('.popup__type').textContent = similarOffer.offer.type;
  offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;

  const fragment = document.createDocumentFragment();

  // Вывод доступных удобств;
  const featuresList = offerElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (let index = 0; index < similarOffer.offer.features.length; index++) {
    const featureNewElement = document.createElement('li');
    featureNewElement.classList.add('popup__feature');
    featureNewElement.classList.add(`popup__feature--${similarOffer.offer.features[index]}`);
    fragment.appendChild(featureNewElement);
  }
  featuresList.appendChild(fragment);

  offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;

  // Вывод фотографий;

  const photosBlock = offerElement.querySelector('.popup__photos');
  const photoElement = photosBlock.querySelector('.popup__photo');
  photosBlock.removeChild(photoElement);
  for (let index = 0; index < similarOffer.offer.photos.length; index++) {
    const photoNewElement = photoElement.cloneNode(true);
    photoNewElement.src = similarOffer.offer.photos[index];
    fragment.appendChild(photoNewElement);
  }
  photosBlock.appendChild(fragment);

  // Проверяем, если не хватает данных, например, отсутствует описание, то скрываем блок;
  if (similarOffer.offer.description === '') {
    offerElement.querySelector('.popup__description').classList.add('hidden');
  }
  return offerElement;
};

const renderPins = (similarOffer) => {
  const similarOffersPins = renderSimilarOffersPins(similarOffer);

  similarOffersPins.forEach((similarOfferElement) => {
    const {lat, lng} = similarOfferElement;

    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
        createCard(similarOfferElement),
        {
          keepInView: true,
        },
      );
  });
};

export { renderPins };
