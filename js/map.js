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
  TYPES_HOUSES: [
    {
      'en': 'palace',
      'ru': 'Дворец'
    },
    {
      'en': 'flat',
      'ru': 'Квартира'
    },
    {
      'en': 'house',
      'ru': 'Дом'
    },
    {
      'en': 'bungalo',
      'ru': 'Бунгало'
    }

  ],
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
var mapPin = document.querySelector('.map__pin');
var widthPin = mapPin.offsetWidth;
var heightPin = mapPin.clientHeight;
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
  var outputArr = arr.slice(0);
  var randomFrom = getRandom(0, outputArr.length - 1); // с какого индекса
  var randomTo = getRandom(0, outputArr.length - 1); // какое количество
  outputArr.splice(randomFrom, randomTo);
  return outputArr;
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
          'type': NoticeData.TYPES_HOUSES[getRandom(0, NoticeData.TYPES_HOUSES.length - 1)].en,
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

  return noticesArr;
};
var noticesArr = renderDataNotice(); // массив объектов данных

var fragment = document.createDocumentFragment();

// вставляем в шаблон данные для пина
var renderPin = function (notice) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = notice.author.avatar;
  pinElement.style.left = notice.location.x - (widthPin/2)  + 'px';
  pinElement.style.top = notice.location.y - heightPin + 'px';
  pinElement.querySelector('img').src = notice.author.avatar;
  pinElement.querySelector('img').alt = notice.offer.title;
  return pinElement;
};

for (var i = 0; i < noticesArr.length; i++) {
  fragment.appendChild(renderPin(noticesArr[i]));
}
document.querySelector('.map__pins').appendChild(fragment);

// создаем элемент из шаблона и  заполняем его данными
var renderNotice = function (arrData) {
  var noticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var noticeElement = noticeTemplate.cloneNode(true);

  noticeElement.querySelector('.popup__title').textContent = arrData.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = arrData.offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = arrData.offer.price + '₽/ночь';
  noticeElement.querySelector('.popup__type').textContent = NoticeData.TYPES_HOUSES[getRandom(0, NoticeData.TYPES_HOUSES.length - 1)].ru;
  noticeElement.querySelector('.popup__text--capacity').textContent = arrData.offer.rooms + ' комнаты для ' + arrData.offer.guests;
  noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrData.offer.checkin + ', ' + 'выезд до ' + arrData.offer.checkout;
  noticeElement.querySelector('.popup__features').textContent = arrData.offer.features;
  noticeElement.querySelector('.popup__description').textContent = arrData.offer.description;
  noticeElement.querySelector('.popup__avatar').src = arrData.author.avatar;

  return noticeElement;
};
document.querySelector('.map__pins').appendChild(renderNotice(noticesArr[0]));

// создаем блок с фотографиями
var createImg = function (arrData) {
  var blockPhoto = document.querySelector('.popup__photos'); // куда вставляем элементы img

  if (arrData.offer.photos.length === blockPhoto.children.length) { // если фотография всего одна
    blockPhoto.querySelector('.popup__photo').src = arrData.offer.photos;
  } else {

    for (var i = 1; i <= arrData.offer.photos.length - 1; i++) {
      blockPhoto.querySelector('.popup__photo').src = arrData.offer.photos[0]; // тег img который уже есть в шаблоне

      var imgElement = document.createElement('img');
      imgElement.className = 'popup__photo';
      imgElement.style.width = 45 + 'px';
      imgElement.style.height = 40 + 'px';
      imgElement.alt = 'Фотография жилья';
      imgElement.src = arrData.offer.photos[i];
      fragment.appendChild(imgElement);
    }
  }

};
createImg(noticesArr[0]);
document.querySelector('.popup__photos').appendChild(fragment);
