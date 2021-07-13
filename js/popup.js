import { isEscEvent } from './util.js';
const SHOW_TIME = 5000;

const onDeletePopup = (evt) => {
  const popup = document.querySelector('.displayPopup');
  if (popup) {
    if (isEscEvent(evt) || evt.type === 'click') {
      evt.preventDefault();
      popup.remove();
      document.removeEventListener('keydown', onDeletePopup);
      document.removeEventListener('click', onDeletePopup);
    }
  }
};

const showPopupSendSuccess = () => {
  const body = document.querySelector('body');
  const successPopup = document.querySelector('#success').content.querySelector('.success');
  const popupElement = successPopup.cloneNode(true);
  popupElement.classList.add('displayPopup');
  body.append(popupElement);

  document.addEventListener('keydown', onDeletePopup);
  document.addEventListener('click', onDeletePopup);
};

const showPopupSendError = (error) => {
  const body = document.querySelector('body');
  const errorPopup = document.querySelector('#error').content.querySelector('.error');
  const popupElement = errorPopup.cloneNode(true);
  const errorButton = popupElement.querySelector('.error__button');
  const errorPopupText = popupElement.querySelector('.error__Popup');
  popupElement.classList.add('displayPopup');
  body.append(popupElement);

  if (error) {
    errorPopupText.innerHTML += `<br>"${error}"`;
  }
  document.addEventListener('keydown', onDeletePopup);
  document.addEventListener('click', onDeletePopup);
  errorButton.addEventListener('click', onDeletePopup);
};

const showPopupGetError = (popup) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = popup;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME);
};

export { showPopupGetError, showPopupSendSuccess, showPopupSendError };
