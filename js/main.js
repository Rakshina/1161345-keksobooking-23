// Функция, для генерации временных географических координат;

// Функция плавующих чисел;

function getRandomFloat(min, max) {
  if (min >= 0 && max >= min) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
  throw new Error('Некорректное число');
}

getRandomFloat(9, 110);

// Функция целых чисел;

function getRandomInteger(min, max) {
  if (min >= 0 && max >= min) {
    return Math.round(Math.random() * (max - min)) + min;
  }
  throw new Error('Некорректное число');
}

getRandomInteger(9, 110);
