import { isEscEvent } from './util.js';


const closePopup = (popup) => {
  popup.remove();
};


const showPopupSendSuccess = () => {
  const body = document.querySelector('body');
  const successPopup = document.querySelector('#success').content.querySelector('.success');
  const popupElement = successPopup.cloneNode(true);
  body.append(popupElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closePopup(popupElement);
    }
  });

  document.addEventListener('click', () => {
    closePopup(popupElement);
  });
};


const showPopupSendError = () => {
  const body = document.querySelector('body');
  const errorPopup = document.querySelector('#error').content.querySelector('.error');
  const popupElement = errorPopup.cloneNode(true);
  const errorButton = popupElement.querySelector('.error__button');
  body.append(popupElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      closePopup(popupElement);
    }
  });

  document.addEventListener('click', () => {
    closePopup(popupElement);
  });

  errorButton.addEventListener('click', () => {
    closePopup(popupElement);
  });
};


const showPopupGetError = (popup) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = popup;
  document.body.append(alertContainer);
};

export { showPopupGetError, showPopupSendSuccess, showPopupSendError };
