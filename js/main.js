//import { SIMILAR_OFFER_COUNT, creatOffer } from './data.js';
import './map.js';
import './util.js';
import './filters.js';
import './popup.js';
import './api.js';
import './form.js';
import './similar-offers-list.js';
import { renderPins } from './similar-offers-list.js';
import { getData, sendData } from './api.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';

const SIMILAR_OFFER_COUNT = 10;


getData((offers) => {
  renderPins(offers.slice(0, SIMILAR_OFFER_COUNT));
});

sendData(openSuccessPopup, openErrorPopup);
