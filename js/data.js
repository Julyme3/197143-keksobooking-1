'use strict';

(function () {
  var NoticeData = {
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_COUNT_ROOMS: 1,
    MAX_COUNT_ROOMS: 5,
    MAX_COUNT_GUESTS: 100,
    HOUSES_ARRAY: ['palace', 'flat', 'house', 'bungalo'],
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

    },

    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PICTURES: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    CHECKIN_TIME: ['12:00', '13:00', '14:00'],
    CHECKOUT_TIME: ['12:00', '13:00', '14:00'],
    COORDINATE_X: 1000,
    COORDINATE_Y: 500
  };

  var COUNT_NOTICES = 8;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var widthMap = map.offsetWidth;

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

  // рандомное значение
  var getRandom = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var shuffleArray = function (a) {
    var j;
    var x;
    var i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  // генерируем массив данных объявлений
  var renderDataNotice = function () {
    var notice;
    var noticesArr = []; // массив с объявлениями
    var arrTitles = shuffleArray(NoticeData.TITLES); // массив неповторяющихся значений

    for (var i = 0; i < COUNT_NOTICES; i++) {
      notice =
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },

          'offer': {
            'title': arrTitles[i], // заголовок
            'address': getRandom(0, NoticeData.COORDINATE_X) + ', ' + getRandom(0, NoticeData.COORDINATE_Y),
            'price': getRandom(NoticeData.MIN_PRICE, NoticeData.MAX_PRICE),
            'type': NoticeData.HOUSES_ARRAY[getRandom(0, NoticeData.HOUSES_ARRAY.length - 1)],
            'rooms': getRandom(NoticeData.MIN_COUNT_ROOMS, NoticeData.MAX_COUNT_ROOMS),
            'guests': getRandom(0, NoticeData.MAX_COUNT_GUESTS),
            'checkin': NoticeData.CHECKIN_TIME[getRandom(0, NoticeData.CHECKIN_TIME.length - 1)],
            'checkout': NoticeData.CHECKOUT_TIME[getRandom(0, NoticeData.CHECKOUT_TIME.length - 1)],
            'features': shuffleArray(NoticeData.FEATURES).splice(0, getRandom(0, NoticeData.FEATURES.length - 1)),
            'description': '',
            'photos': shuffleArray(NoticeData.PICTURES)
          },

          'location': {
            'x': getRandom(0, widthMap),
            'y': getRandom(Pin.MIN_LOCATION_Y, Pin.MAX_LOCATION_Y)
          }
        };
      noticesArr.push(notice);

    }

    return noticesArr;
  };

  window.data = {
    array: renderDataNotice(),
    map: document.querySelector('.map'),
    mainPin: map.querySelector('.map__pin--main'),
    mapPins: map.querySelector('.map__pins'),
    notice: NoticeData,
    pin: Pin
  };
})();
