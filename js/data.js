'use strict';

(function () {
  var NoticeData = {
    COUNT: 8,
    TYPES_HOUSES: {
      'palace': {
        'ru': 'Дворец',
        'min': 10000
      },
      'flat': {
        'ru': 'Квартира',
        'min': 1000
      },
      'house': {
        'ru': 'Дом',
        'min': 5000
      },
      'bungalo': {
        'ru': 'Бунгало',
        'min': 0
      }

    }
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var Pin = {
    MIN_LOCATION_Y: 130,
    MAX_LOCATION_Y: 630,
    INITIAL_X: 570,
    INITIAL_Y: 375,
    INITIAL_LEG_HEIGHT: 0,
    HEIGHT_LEG: 22,
    HEIGHT: mainPin.offsetHeight,
    WIDTH: mainPin.offsetWidth
  };

  window.data = {
    map: document.querySelector('.map'),
    mainPin: map.querySelector('.map__pin--main'),
    mapPins: map.querySelector('.map__pins'),
    notice: NoticeData,
    pin: Pin
  };
})();
