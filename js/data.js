// модуль, который создаёт данные;
// Модуль создания и работы с похожими объявлениями;
import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomFeatures
} from './util.js';

// Фиксированные значения;
const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const TITLES = [
  'Уютная квартирка с видом на старую площадь',
  'Дом в викторианском стиле с настоящим дворецким',
  'Тропическое бунгало в центре современного мегаполиса',
  'Двухэтажное бунгало на сваях и с прозрачным полом',
  'Дворец в стиле венецианское барокко',
];
const DESCRIPTIONS = [
  '10 минут от Метро',
  'Окна выходят во двор',
  'Ди­зайн квар­ти­ры вы­пол­нен в классическом сти­ле',
  'Ис­поль­зо­вани­ем ка­чес­твен­ных и современных ма­тери­алов',
];
const TIME_CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

const SIMILAR_OFFER_COUNT = 4;

// Создание массива похожих объявлений;
const creatOffer = () => {
  const COORDINATES = {
    lat: getRandomPositiveFloat(35.65, 35.7, 5),
    lng: getRandomPositiveFloat(139.7, 139.8, 5),
  };

  return {
    author: {
      avatar: getRandomArrayElement(AVATARS),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${COORDINATES.lat}, ${COORDINATES.lng}`,
      price: getRandomPositiveInteger(0, 10000),
      type: getRandomArrayElement(Object.values(TYPES)),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(TIME_CHECK),
      checkout: getRandomArrayElement(TIME_CHECK),
      features: getRandomFeatures(FEATURES),
      descriptions: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomFeatures(PHOTOS),
    },
    location: {
      lat: COORDINATES.lat,
      lng: COORDINATES.lng,
    },
  };
};


export { SIMILAR_OFFER_COUNT, creatOffer };
