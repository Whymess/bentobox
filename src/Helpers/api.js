import { LOCATIONS } from './constants';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function fetchLocations() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(LOCATIONS);
    }, getRandomInt(1250));
  });
}
