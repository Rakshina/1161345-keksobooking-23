const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TITLES = ['Уютная квартирка с видом на старую площадь', 'Дом в викторианском стиле с настоящим дворецким','Тропическое бунгало в центре современного мегаполиса', 'Двухэтажное бунгало на сваях и с прозрачным полом', 'Дворец в стиле венецианское барокко'];
const DESCRIPTION = ['10 минут от Метро', 'Окна выходят во двор', 'Ди­зайн квар­ти­ры вы­пол­нен в классическом сти­ле', 'Ис­поль­зо­вани­ем ка­чес­твен­ных и современных ма­тери­алов'];
const TIME_CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/randomIdxavascript-1/keksobooking/duonguyen-8LrGtIxxa4w.randomIdxpg', 'https://assets.htmlacademy.ru/content/intensive/randomIdxavascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.randomIdxpg', 'https://assets.htmlacademy.ru/content/intensive/randomIdxavascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.randomIdxpg'];
const AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

const SIMILAR_COUNT = 4;

function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat (min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const getRandomArrayElement = (items) => items[getRandomPositiveInteger(0, items.length - 1)];


const creatAdvertisement = () => {
  const COORDINATES = {
    lat: getRandomPositiveFloat(35.65, 35.7, 5),
    lng: getRandomPositiveFloat(139.7, 139.8, 5),
  };

  return {
    author: {
      avatar: getRandomArrayElement(AVATAR),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${COORDINATES.lat}, ${COORDINATES.lng}`,
      price: getRandomPositiveInteger(0, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 10),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(TIME_CHECK),
      checkout: getRandomArrayElement(TIME_CHECK),
      features: getRandomArrayElement(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),
      location: {
        lat: COORDINATES.lat,
        lng: COORDINATES.lng,
      },
    },
  };
};

const similarAdvertisement = new Array(SIMILAR_COUNT).fill(null).map(() => creatAdvertisement());

similarAdvertisement.slice();
