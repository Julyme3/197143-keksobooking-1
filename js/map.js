'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_AVATAR_SRC = 1;
var MAX_AVATAR_SRC = 8;
var MIN_COUNT_ROOMS = 1;
var MAX_COUNT_ROOMS = 5;
var MAX_COUNT_GUESTS = 100;
var TYPES_HOUSES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PICTURES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Функция для вычисления уникального случайного числа
var getUniqNumber = function (min, max) {
  var uniqElement; // рандомное значение
  var outputArr = []; // массив из неповторяющихся значений

  while (outputArr.length < max) {
    uniqElement = (Math.round(Math.random() * (max - min) + min));

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
  var randomFrom = getRandom(0, arr.length - 1);
  var randomTo = getRandom(0, arr.length - 1);
  arr.splice(randomFrom, randomTo);
};

var offers = [
  {
    "author": {
      "avatar": 'img/avatars/user0' + getUniqNumber(MIN_AVATAR_SRC, MAX_AVATAR_SRC) + '.png'
    },

    "offer": {
      "title": TITLES[getUniqNumber(0, TITLES.length - 1)[0]], // для первого элемента
      "address": this.location.x,
      "price": getRandom(MIN_PRICE, MAX_PRICE),
      "type": TYPES_HOUSES[getRandom(0, TYPES_HOUSES.length - 1)],
      "rooms": getRandom(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
      "guests": getRandom(0, MAX_COUNT_GUESTS),
      "checkin": CHECKIN_TIME[getRandom(0, CHECKIN_TIME.length)],
      "checkout": CHECKOUT_TIME[getRandom(0, CHECKOUT_TIME.length)],
      "features": getRandomString(FEATURES),
      "description": '',
      "photos": PICTURES[getUniqNumber(0, PICTURES.length)]
    },

    "location": {
      "x": '',
      "y": getRandom(MIN_LOCATION_Y, MAX_LOCATION_Y)
    }
  }
];
