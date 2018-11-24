'use strict';

var NoticeData = {
  TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  MIN_AVATAR_SRC: 1,
  MAX_AVATAR_SRC: 8,
  MIN_COUNT_ROOMS: 1,
  MAX_COUNT_ROOMS: 5,
  MAX_COUNT_GUESTS: 100,
  TYPES_HOUSES: ['palace', 'flat', 'house', 'bungalo'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  PICTURES: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  CHECKIN_TIME: ['12:00', '13:00', '14:00'],
  CHECKOUT_TIME: ['12:00', '13:00', '14:00'],
  COORDINATE_X: 1000,
  COORDINATE_Y: 500
};

var Pin = {
  MIN_LOCATION_Y: 130,
  MAX_LOCATION_Y: 630
};

var COUNT_NOTICES = 8;
var map = document.querySelector('.map');
var widthMap = map.offsetWidth;
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
map.classList.remove('map--faded');

// Функция для вычисления уникального случайного числа
var getUniqNumber = function (min, max) {
  var uniqElement; // рандомное значение
  var outputArr = []; // массив из неповторяющихся значений

  while (outputArr.length <= max - min) {
    uniqElement = Math.round(Math.random() * (max - min) + min);

    if (outputArr.indexOf(uniqElement) === -1) {
      outputArr.push(uniqElement);
    }

  }
  return outputArr;
};

// рандомное значение
var getRandom = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// получаем рандомный массив рандомной длины
var getRandomString = function (arr) {
  var randomFrom = getRandom(0, arr.length - 1); // с какого индекса
  var randomTo = getRandom(0, arr.length - 1); // какое количество
  arr.splice(randomFrom, randomTo);
  return arr;
};
// получаем рандомный массив с урлами из PICTURES
var concateUniqString = function (inputArr) {
  var outputArr = [];
  var arrUniqElements = getUniqNumber(0, inputArr.length - 1); // массив неповторяющихся элементов

  for (var i = 0; i <= arrUniqElements.length - 1; i++) {
    outputArr.push(inputArr[arrUniqElements[i]]); // заполняем массив конкретными значениями
  }

  return outputArr;
};

// генерируем массив данных объявлений
var renderDataNotice = function () {
  var notice;
  var noticesArr = []; // массив с объявлениями
  var arrTitles = getUniqNumber(0, NoticeData.TITLES.length - 1); // массив неповторяющихся значений
  var arrImgSrc = getUniqNumber(NoticeData.MIN_AVATAR_SRC, NoticeData.MAX_AVATAR_SRC); // хвост для формирования пути к картинке

  for (var i = 0; i < COUNT_NOTICES; i++) {
    notice =
      {
        'author': {
          'avatar': 'img/avatars/user0' + arrImgSrc[i] + '.png'
        },

        'offer': {
          'title': NoticeData.TITLES[arrTitles[i]], // заголовок
          'address': getRandom(0, NoticeData.COORDINATE_X) + ', ' + getRandom(0, NoticeData.COORDINATE_Y),
          'price': getRandom(NoticeData.MIN_PRICE, NoticeData.MAX_PRICE),
          'type': NoticeData.TYPES_HOUSES[getRandom(0, NoticeData.TYPES_HOUSES.length - 1)],
          'rooms': getRandom(NoticeData.MIN_COUNT_ROOMS, NoticeData.MAX_COUNT_ROOMS),
          'guests': getRandom(0, NoticeData.MAX_COUNT_GUESTS),
          'checkin': NoticeData.CHECKIN_TIME[getRandom(0, NoticeData.CHECKIN_TIME.length - 1)],
          'checkout': NoticeData.CHECKOUT_TIME[getRandom(0, NoticeData.CHECKOUT_TIME.length - 1)],
          'features': getRandomString(NoticeData.FEATURES),
          'description': '',
          'photos': concateUniqString(NoticeData.PICTURES)
        },

        'location': {
          'x': getRandom(0, widthMap),
          'y': getRandom(Pin.MIN_LOCATION_Y, Pin.MAX_LOCATION_Y)
        }
      };
    noticesArr.push(notice);
  }
};
renderDataNotice();

var renderPin = function () {
  var pinElement = pinTemplate.cloneNode(true);
  document.querySelector('.map__pins').appendChild(pinElement);

};
renderPin();
