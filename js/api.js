import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((responce) => (responce.ok) ? responce.json() : showAlert('Не удалось загрузить данные'))
    .then(onSuccess);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
