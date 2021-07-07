import { showAlert } from './util.js';
import { resetPage } from './map.js';
import { offerForm } from './form.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, onFail) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
          resetPage();
        } else {
          onFail();
        }
      })
      .catch(() => onFail());
  });
};

export { getData, sendData };
