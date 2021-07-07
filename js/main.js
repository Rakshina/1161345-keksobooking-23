//import { SIMILAR_OFFER_COUNT, creatOffer } from './data.js';
import { createAdMarker, resetMarker, markerGroup } from './map.js';
import  { resetForm, dataUserFormSubmit } from './form.js';
import {getData} from './api.js';

// const createOffers = new Array(SIMILAR_OFFER_COUNT).fill(null).map(creatOffer);

// createOffers.forEach((dataAd) => createAdMarker(dataAd));

const adResetButton = document.querySelector('.ad-form__reset');

getData((dataAd) => {
  createAdMarker(dataAd);

  adResetButton.addEventListener('click', (evt) =>{
    evt.preventDefault();
    resetForm(resetMarker);
    markerGroup.clearLayers();
    createAdMarker(dataAd);
  });

  dataUserFormSubmit(() =>{
    resetForm(resetMarker);
    markerGroup.clearLayers();
    createAdMarker(dataAd);
  });
});
