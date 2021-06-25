// модуль с вспомогательными функциями;

function getRandomPositiveInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat(min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const getRandomArrayElement = (items) =>
  items[getRandomPositiveInteger(0, items.length - 1)];

const getRandomFeatures = (items) => {
  const randomIndex = getRandomPositiveInteger(0, items.length - 1);
  const randomFeatures = items.slice(0, randomIndex + 1);
  return randomFeatures;
};

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomFeatures
};
