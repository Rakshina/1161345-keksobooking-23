import { SIMILAR_OFFER_COUNT, creatOffer } from './data.js';
import { createAdMarker } from './map.js';
import './form.js';

const createOffers = new Array(SIMILAR_OFFER_COUNT).fill(null).map(creatOffer);

createOffers.forEach((dataAd) => createAdMarker(dataAd));
