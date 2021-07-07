import { isEscEvent } from './util.js';

const popupSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const popupSuccessElement = popupSuccessTemplate.cloneNode(true);
const popupErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const popupErrorElement = popupErrorTemplate.cloneNode(true);
const errorButton = popupErrorElement.querySelector('.error__button');

const closeSuccessPopup = () => {
  popupSuccessElement.classList.add('hidden');
  document.removeEventListener('click', closeSuccessPopup);
};

const closeErrorPopup = () => {
  popupErrorElement.classList.add('hidden');
  document.removeEventListener('click', closeErrorPopup);
  document.removeEventListener('keydown', closeErrorPopup);
};

const onSuccessPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
    document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  }
};

const onErrorPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorPopup();
    document.removeEventListener('keydown', onErrorPopupEscKeydown);
  }
};

const openSuccessPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupSuccessElement);
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
  document.addEventListener('click', closeSuccessPopup);
};

const openErrorPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupErrorElement);
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  document.addEventListener('click', closeErrorPopup);
};

errorButton.addEventListener('click', closeErrorPopup);

export { openSuccessPopup, openErrorPopup };
