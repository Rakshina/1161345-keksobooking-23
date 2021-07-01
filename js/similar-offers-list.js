
// Модуль, который будет отвечать за генерацию разметки похожих элементов;


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

  const featuresList = offerElement.querySelector('.popup__features');
  const fragment = document.createDocumentFragment();
  featuresList.innerHTML = '';
  for (let index = 0; index < similarOffer.offer.features.length; index++) {
    const featureNewElement = document.createElement('li');
    featureNewElement.classList.add('popup__feature');
    featureNewElement.classList.add(`popup__feature--${similarOffer.offer.features[index]}`);
    fragment.appendChild(featureNewElement);
  }
  featuresList.appendChild(fragment);

  
  offerElement.querySelector('.popup__description').textContent = similarOffer.offer.description;

  const photosBlock = offerElement.querySelector('.popup__photos');
  const photoElement = photosBlock.querySelector('.popup__photo');
  photosBlock.removeChild(photoElement);
  for (let index = 0; index < similarOffer.offer.photos.length; index++) {
    const photoNewElement = photoElement.cloneNode(true);
    photoNewElement.src = similarOffer.offer.photos[index];
    fragment.appendChild(photoNewElement);
  }
  photosBlock.appendChild(fragment);

  if (similarOffer.offer.description === '') {
    offerElement.querySelector('.popup__description').classList.add('hidden');
  }
  return offerElement;
};

export { createCard };
