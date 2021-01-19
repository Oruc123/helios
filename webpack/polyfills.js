/* global window */
/* eslint-disable no-var, prefer-arrow-callback, comma-dangle */
if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the userForm has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// polyfill Promise.delay
window.Promise.delay = function(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
};

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// Polyfill window.location.origin (it doesn't work in some versions of IE)
const loc = window.location;

if (!loc.origin) {
  const value = loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '');

  try {
    Object.defineProperty(loc, 'origin', { value: value, enumerable: true });
  } catch (err) {
    loc.origin = value;
  }
}
