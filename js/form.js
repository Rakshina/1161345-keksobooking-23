// Модуль для работы с формой добавления объявления;
import {isEscEvent} from './util.js';
import {sendData} from './api.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const offerForm = document.querySelector('.ad-form');
const adFormElement = offerForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');
const adTitle = offerForm.querySelector('#title');
const adPrice = offerForm.querySelector('#price');
const adCapacitySelect = offerForm.querySelector('#capacity');
const adCapacitySelectOption = adCapacitySelect.querySelectorAll('option');
const adRoomNumberSelect = offerForm.querySelector('#room_number');
const adTimeInSelect = offerForm.querySelector('#timein');
const adTimeOutSelect = offerForm.querySelector('#timeout');
const adTypeSelect = offerForm.querySelector('#type');
const adAddress = offerForm.querySelector('#address');

const roomsValue = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// Неакивная форма
const diactivateForm = () => {
  offerForm.classList.add('ad-form--disabled');
  adFormElement.forEach((item) => item.setAttribute('disabled', 'disabled'));
  mapFiltersForm.classList.add('ad-form--disabled');
  mapFiltersFormElements.forEach((item) => item.setAttribute('disabled', 'disabled'));
  mapFiltersFormFeatures.setAttribute('disabled', 'disabled');
};

// Активная форма;
const activateForm = () => {
  offerForm.classList.remove('ad-form--disabled');
  adFormElement.forEach((item) => item.removeAttribute('disabled', null));
  mapFiltersForm.classList.remove('ad-form--disabled');
  mapFiltersFormElements.forEach((item) => item.removeAttribute('disabled', null));
  mapFiltersFormFeatures.removeAttribute('disabled', null);
};

// Валидации заголовка;
adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

// Валидации цены;
adPrice.addEventListener('input', () => {
  const valueInput = parseInt(adPrice.value, 10);
  const minPrice = adPrice.getAttribute('min');
  const maxPrice = adPrice.getAttribute('max');

  if (valueInput < minPrice) {
    adPrice.setCustomValidity(`Минимальная цена ${ minPrice}`);
  } else if (valueInput > maxPrice) {
    adPrice.setCustomValidity(`Максимальная цена ${ maxPrice}`);
  } else {
    adPrice.setCustomValidity('');
  }
  adPrice.reportValidity();
});

// Валидация комнат;

const onRoomChange = (evt) => {
  adCapacitySelectOption.forEach((option) => {
    option.disabled = true;
  });

  roomsValue[evt.value].forEach((seatsAmount) => {
    adCapacitySelectOption.forEach((option) => {
      if (Number(option.value) === seatsAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

onRoomChange(adRoomNumberSelect);

adRoomNumberSelect.addEventListener('change', (evt) =>{
  onRoomChange(evt.target);
});

// Валидация время заезда
adTimeInSelect.addEventListener('change', () => {
  adTimeOutSelect.value = adTimeInSelect.value;
});

adTimeOutSelect.addEventListener('change', () => {
  adTimeInSelect.value = adTimeOutSelect.value;
});

// Валидация типа жилья;

adTypeSelect.addEventListener('change', (evt) => {
  adPrice.setAttribute('placeholder', typePrice[evt.target.value]);
  adPrice.setAttribute('min', typePrice[evt.target.value]);
});

const createMessage = (message) => {
  const messageTemplate = document.querySelector(`#${message}`).content.querySelector(`.${message}`);
  const element = messageTemplate.cloneNode(true);
  document.body.appendChild(element);

  const onMessageEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      element.remove();
      //closeMessage();
    }
  };

  const openMessage = () => document.addEventListener('keydown', onMessageEscKeyDown);
  const closeMessage = () => document.removeEventListener('keydown', onMessageEscKeyDown);

  openMessage();

  element.addEventListener('click', () => {
    element.remove();
    closeMessage();
  });

};

const resetForm = (resetMarker) => {
  offerForm .reset();
  mapFiltersForm.reset();
  onRoomChange(adRoomNumberSelect);
  resetMarker();
};

const dataUserFormSubmit = (onSuccess) => {
  offerForm .addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {resetForm(onSuccess); createMessage('success');},
      () => createMessage('error'),
      new FormData(evt.target),
    );
  });
};


export { activateForm, diactivateForm, adAddress, dataUserFormSubmit, resetForm };
