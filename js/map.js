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

var COUNT_NOTICES = 8;
var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var widthMap = map.offsetWidth;
var mapPin = map.querySelector('.map__pin');
var widthPin = mapPin.offsetWidth;
var heightPin = mapPin.offsetHeight;

var Pin = {
  MIN_LOCATION_Y: 130,
  MAX_LOCATION_Y: 630
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
var noticesArr = renderDataNotice(); // массив объектов данных

// вставляем в шаблон данные для пина
var renderPin = function (notice) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.classList.add('hidden');
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
var renderNotice = function (arrData, index) {
  var noticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var noticeElement = noticeTemplate.cloneNode(true);

  noticeElement.querySelector('.popup__title').textContent = arrData[index].offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = arrData[index].offer.address;
  noticeElement.querySelector('.popup__text--price').textContent = arrData[index].offer.price + '₽/ночь';
  noticeElement.querySelector('.popup__type').textContent = NoticeData.TYPES_HOUSES[arrData[index].offer.type].ru;
  noticeElement.querySelector('.popup__text--capacity').textContent = arrData[index].offer.rooms + ' комнаты для ' + arrData[index].offer.guests;
  noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrData[index].offer.checkin + ', ' + 'выезд до ' + arrData[index].offer.checkout;
  noticeElement.querySelector('.popup__features').innerHTML = createList(noticeElement, noticesArr[index]);
  noticeElement.querySelector('.popup__description').textContent = arrData[index].offer.description;
  noticeElement.querySelector('.popup__avatar').src = arrData[index].author.avatar;

  createImg(noticeElement, noticesArr[index]);
  return noticeElement;
};
renderPins();

// Обработчики событий
var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var doVisibleElement = function (element, hiddenClass) {
  element.classList.remove(hiddenClass);
};

var openPopup = function (index) {
  document.querySelector('.map__pins').appendChild(renderNotice(noticesArr, index));
//  document.addEventListener('keydown', popupEscHandlier);
};

var closePopup = function (element) {
  element.parentElement.removeChild(element);
  map.querySelector('.map__pin--active').classList.remove('map__pin--active');
//  document.removeEventListener('keydown', popupEscHandlier);
};

// var popupEscHandlier = function (evt) {
//   if (evt.keyCode === ESC_KEYCODE) {
//     closePopup(mapCard);
//   }
// };

// заполняем поле Адреса
var inputCoordinate = function () {
  var inputAddress = form.querySelector('#address');
  var positionX = parseInt(mainPin.style.left, 10) + (widthPin / 2);
  var positionY = parseInt(mainPin.style.top, 10) + (heightPin / 2);
  inputAddress.value = positionX + ', ' + positionY;
};
inputCoordinate();

mainPin.addEventListener('mouseup', function () {
  // активация формы, карты
  doVisibleElement(map, 'map--faded');
  doVisibleElement(form, 'ad-form--disabled');
  fieldsets.disabled = false;

  // делаем видимыми все пины на карте
  [].forEach.call(mapPins, function (item) {
    doVisibleElement(item, 'hidden');
  });
});

// клик по карте
map.addEventListener('click', function (evt) {
  var target = evt.target;
  var indexVisible = 0;

  // клик по пину
  if (target.className === 'map__pin' || target.parentElement.className === 'map__pin') {
    var mapCard = map.querySelector('.map__card');
    evt.preventDefault();
    if (mapCard !== null) {
      closePopup(mapCard);
    }
    // ищем индекс пина в коллекции пинов
    indexVisible = target.className === 'map__pin' ? [].indexOf.call(mapPins, target) : [].indexOf.call(mapPins, target.parentElement);
    openPopup(indexVisible);
    mapCard = map.querySelector('.map__card');

    // добавляем класс active по нажатому пину
    target.className === 'map__pin' ? target.classList.add('map__pin--active') : target.parentElement.classList.add('map__pin--active');

    // закрыть попап ESC
    document.addEventListener('keydown', function (evt) {
    //  debugger;
      if (evt.keyCode === ESC_KEYCODE) {
        if (mapCard !== null) {
          closePopup(mapCard);
        }

      }
    });
  }

  // закрыть попап кликом по кнопке CLOSE
  if (target.className === 'popup__close') {
    closePopup(target.parentElement);
  }
});


// нажатие клавиши Enter по пину приводит к отображению соответствующего объявления
map.addEventListener('keydown', function (evt) {
  var target = evt.target;
  var indexVisible = 0;

  if (evt.keyCode === ENTER_KEYCODE) {

    // Событие нажатия Enter по основному пину приводит к активации формы и отображению всех пинов
    if (target === mainPin || target.parentElement.className === mainPin.className) {

      // активация формы, карты
      doVisibleElement(map, 'map--faded');
      doVisibleElement(form, 'ad-form--disabled');
      fieldsets.disabled = false;

      // делаем видимыми все пины на карте
      [].forEach.call(mapPins, function (item) {
        doVisibleElement(item, 'hidden');
      });
    }

    if (target.className === 'map__pin' || target.parentElement.className === 'map__pin') {
      evt.preventDefault();

      // прячем все попапы объявлений
      [].forEach.call(mapCards, function (item) {
        item.classList.add('hidden');
      });

      // у всех пинов удаляем класс active
      removeActivePin();

      indexVisible = target.className === 'map__pin' ? [].indexOf.call(mapPins, target) : [].indexOf.call(mapPins, target.parentElement);
      openPopup(mapCards[indexVisible]);

      // добавляем класс active по нажатому пину
      target.className === 'map__pin' ? target.classList.add('map__pin--active') : target.parentElement.classList.add('map__pin--active');
    }

    if (target.className === 'popup__close') {
      closePopup(target.parentElement);
    }
  }

});
