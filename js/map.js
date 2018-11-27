'use strict';

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
      'ru': 'Дворец'
    },
    'flat': {
      'ru': 'Квартира'
    },
    'house': {
      'ru': 'Дом'
    },
    'bungalo': {
      'ru': 'Бунгало'
    }

  },

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
var mapPin = map.querySelector('.map__pin');
var widthPin = mapPin.offsetWidth;
var heightPin = mapPin.clientHeight;
map.classList.remove('map--faded');

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
var noticesArr = renderDataNotice(); // массив объектов данных

// вставляем в шаблон данные для пина
var renderPin = function (notice) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = notice.author.avatar;
  pinElement.style.left = notice.location.x - (widthPin / 2) + 'px';
  pinElement.style.top = notice.location.y - heightPin + 'px';
  pinElement.querySelector('img').src = notice.author.avatar;
  pinElement.querySelector('img').alt = notice.offer.title;
  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < noticesArr.length; i++) {
    fragment.appendChild(renderPin(noticesArr[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

// создаем блок с фотографиями
var createImg = function (element, arrData) {
  var blockPhoto = element.querySelector('.popup__photos'); // куда вставляем элементы img

  blockPhoto.innerHTML = '';

  for (var i = 0; i <= arrData.offer.photos.length - 1; i++) {
    var imgElement = document.createElement('img');
    imgElement.className = 'popup__photo';
    imgElement.style.width = 45 + 'px';
    imgElement.style.height = 40 + 'px';
    imgElement.alt = 'Фотография жилья';
    imgElement.src = arrData.offer.photos[i];
    blockPhoto.appendChild(imgElement);
  }
};

var createList = function (element, arrData) {
  var liElement = '';

  for (var i = 0; i < arrData.offer.features.length; i++) {
    liElement += '<li class="popup__feature popup__feature--' + arrData.offer.features[i] + '"></li>';
  }

  return liElement;
};

// создаем элемент из шаблона и  заполняем его данными
var renderNotice = function (arrData) {
  var noticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var noticeElement = noticeTemplate.cloneNode(true);

  noticeElement.querySelector('.popup__title').textContent = arrData.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = arrData.offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = arrData.offer.price + '₽/ночь';
  noticeElement.querySelector('.popup__type').textContent = NoticeData.TYPES_HOUSES[arrData.offer.type].ru;
  noticeElement.querySelector('.popup__text--capacity').textContent = arrData.offer.rooms + ' комнаты для ' + arrData.offer.guests;
  noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrData.offer.checkin + ', ' + 'выезд до ' + arrData.offer.checkout;
  noticeElement.querySelector('.popup__features').innerHTML = createList(noticeElement, noticesArr[0]);
  noticeElement.querySelector('.popup__description').textContent = arrData.offer.description;
  noticeElement.querySelector('.popup__avatar').src = arrData.author.avatar;

  createImg(noticeElement, noticesArr[0]);

  return noticeElement;
};
document.querySelector('.map__pins').appendChild(renderNotice(noticesArr[0]));

renderPins();
