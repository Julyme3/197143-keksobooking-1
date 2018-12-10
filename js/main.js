// var NoticeData = {
//   TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
//   MIN_PRICE: 1000,
//   MAX_PRICE: 1000000,
//   MIN_COUNT_ROOMS: 1,
//   MAX_COUNT_ROOMS: 5,
//   MAX_COUNT_GUESTS: 100,
//   HOUSES_ARRAY: ['palace', 'flat', 'house', 'bungalo'],
//   TYPES_HOUSES: {
//     'palace': {
//       'ru': 'Дворец',
//       'min': 10000
//     },
//     'flat': {
//       'ru': 'Квартира',
//       'min': 1000
//     },
//     'house': {
//       'ru': 'Дом',
//       'min': 5000
//     },
//     'bungalo': {
//       'ru': 'Бунгало',
//       'min': 0
//     }
//
//   },
//
//   FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//   PICTURES: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
//   CHECKIN_TIME: ['12:00', '13:00', '14:00'],
//   CHECKOUT_TIME: ['12:00', '13:00', '14:00'],
//   COORDINATE_X: 1000,
//   COORDINATE_Y: 500
// };
//
// var COUNT_NOTICES = 8;
// var map = document.querySelector('.map');
 //var mainPin = map.querySelector('.map__pin--main');
 //var mapPins = map.querySelector('.map__pins');
// var form = document.querySelector('.ad-form');
// var fieldsets = form.querySelectorAll('fieldset');
// var widthMap = map.offsetWidth;
//
// var Pin = {
//   MIN_LOCATION_Y: 130,
//   MAX_LOCATION_Y: 630,
//   INITIAL_X: 570,
//   INITIAL_Y: 375,
//   INITIAL_LEG_HEIGHT: 0,
//   HEIGHT_LEG: 22,
//   HEIGHT: mainPin.offsetHeight,
//   WIDTH: mainPin.offsetWidth
// };
//
// // рандомное значение
// var getRandom = function (min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// };
//
// var shuffleArray = function (a) {
//   var j;
//   var x;
//   var i;
//   for (i = a.length - 1; i > 0; i--) {
//     j = Math.floor(Math.random() * (i + 1));
//     x = a[i];
//     a[i] = a[j];
//     a[j] = x;
//   }
//   return a;
// };
//
// // генерируем массив данных объявлений
// var renderDataNotice = function () {
//   var notice;
//   var noticesArr = []; // массив с объявлениями
//   var arrTitles = shuffleArray(NoticeData.TITLES); // массив неповторяющихся значений
//
//   for (var i = 0; i < COUNT_NOTICES; i++) {
//     notice =
//       {
//         'author': {
//           'avatar': 'img/avatars/user0' + (i + 1) + '.png'
//         },
//
//         'offer': {
//           'title': arrTitles[i], // заголовок
//           'address': getRandom(0, NoticeData.COORDINATE_X) + ', ' + getRandom(0, NoticeData.COORDINATE_Y),
//           'price': getRandom(NoticeData.MIN_PRICE, NoticeData.MAX_PRICE),
//           'type': NoticeData.HOUSES_ARRAY[getRandom(0, NoticeData.HOUSES_ARRAY.length - 1)],
//           'rooms': getRandom(NoticeData.MIN_COUNT_ROOMS, NoticeData.MAX_COUNT_ROOMS),
//           'guests': getRandom(0, NoticeData.MAX_COUNT_GUESTS),
//           'checkin': NoticeData.CHECKIN_TIME[getRandom(0, NoticeData.CHECKIN_TIME.length - 1)],
//           'checkout': NoticeData.CHECKOUT_TIME[getRandom(0, NoticeData.CHECKOUT_TIME.length - 1)],
//           'features': shuffleArray(NoticeData.FEATURES).splice(0, getRandom(0, NoticeData.FEATURES.length - 1)),
//           'description': '',
//           'photos': shuffleArray(NoticeData.PICTURES)
//         },
//
//         'location': {
//           'x': getRandom(0, widthMap),
//           'y': getRandom(Pin.MIN_LOCATION_Y, Pin.MAX_LOCATION_Y)
//         }
//       };
//     noticesArr.push(notice);
//
//   }
//
//   return noticesArr;
// };
// var noticesArr = renderDataNotice(); // массив объектов данных

// вставляем в шаблон данные для пина
// var renderPin = function (notice) {
//   var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//   var pinElement = pinTemplate.cloneNode(true);
//   pinElement.querySelector('img').src = notice.author.avatar;
//   pinElement.style.left = notice.location.x - (Pin.WIDTH / 2) + 'px';
//   pinElement.style.top = notice.location.y - Pin.HEIGHT + 'px';
//   pinElement.querySelector('img').src = notice.author.avatar;
//   pinElement.querySelector('img').alt = notice.offer.title;
//
//   pinElement.addEventListener('click', function () {
//     closePopup();
//     pinElement.classList.add('map__pin--active');
//     openPopup(notice);
//   });
//
//   pinElement.addEventListener('keydown', function (evt) {
//     if (evt.keyCode === ENTER_KEYCODE) {
//       closePopup();
//       pinElement.classList.add('map__pin--active');
//       openPopup(notice);
//     }
//   });
//
//   resetBtn.addEventListener('click', function () {
//     pinElement.remove();
//   });
//
//   return pinElement;
// };
//
// var renderPins = function () {
//   var fragment = document.createDocumentFragment();
//
//   for (var i = 0; i < window.notice.array.length; i++) {
//     fragment.appendChild(renderPin(window.notice.array[i]));
//   }
//   mapPins.appendChild(fragment);
// };

// создаем блок с фотографиями
// var createImg = function (element, arrData) {
//   var blockPhoto = element.querySelector('.popup__photos'); // куда вставляем элементы img
//
//   blockPhoto.innerHTML = '';
//
//   for (var i = 0; i <= arrData.offer.photos.length - 1; i++) {
//     var imgElement = document.createElement('img');
//     imgElement.className = 'popup__photo';
//     imgElement.style.width = 45 + 'px';
//     imgElement.style.height = 40 + 'px';
//     imgElement.alt = 'Фотография жилья';
//     imgElement.src = arrData.offer.photos[i];
//     blockPhoto.appendChild(imgElement);
//   }
// };
//
// var createList = function (element, arrData) {
//   var liElement = '';
//
//   for (var i = 0; i < arrData.offer.features.length; i++) {
//     liElement += '<li class="popup__feature popup__feature--' + arrData.offer.features[i] + '"></li>';
//   }
//
//   return liElement;
// };
//
// var onClosePopupClick = function () {
//   closePopup();
// };
//
// var onClosePopupEnter = function (evt) {
//   if (evt.keyCode === ENTER_KEYCODE) {
//     closePopup();
//   }
// };
//
// var onResetBtnClick = function () {
//   closePopup();
// };
//
// var onResetBtnEnter = function (evt) {
//   if (evt.keyCode === ENTER_KEYCODE) {
//     closePopup();
//   }
// };
//
// // создаем элемент из шаблона и  заполняем его данными
// var renderNotice = function (arrData) {
//   var noticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
//   var noticeElement = noticeTemplate.cloneNode(true);
//
//   noticeElement.querySelector('.popup__title').textContent = arrData.offer.title;
//   noticeElement.querySelector('.popup__text--address').textContent = arrData.offer.address;
//   noticeElement.querySelector('.popup__text--price').textContent = arrData.offer.price + '₽/ночь';
//   noticeElement.querySelector('.popup__type').textContent = window.data.notice.TYPES_HOUSES[arrData.offer.type].ru;
//   noticeElement.querySelector('.popup__text--capacity').textContent = arrData.offer.rooms + ' комнаты для ' + arrData.offer.guests;
//   noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrData.offer.checkin + ', ' + 'выезд до ' + arrData.offer.checkout;
//   noticeElement.querySelector('.popup__features').innerHTML = createList(noticeElement, arrData);
//   noticeElement.querySelector('.popup__description').textContent = arrData.offer.description;
//   noticeElement.querySelector('.popup__avatar').src = arrData.author.avatar;
//
//   createImg(noticeElement, arrData);
//
//   var closeBtn = noticeElement.querySelector('.popup__close');
//
//   closeBtn.addEventListener('click', onClosePopupClick);
//   closeBtn.addEventListener('keydown', onClosePopupEnter);
//   resetBtn.addEventListener('click', onResetBtnClick);
//   resetBtn.addEventListener('click', onResetBtnEnter);
//
//   return noticeElement;
// };

// Обработчики событий
// var ENTER_KEYCODE = 13;
// var ESC_KEYCODE = 27;
// var inputAddress = form.querySelector('#address');
//
// var doVisibleElement = function (element, hiddenClass) {
//   element.classList.remove(hiddenClass);
// };
//
// var doHiddenElement = function (element, hiddenClass) {
//   element.classList.add(hiddenClass);
// };
//
// var removeActiveClass = function () {
//   var activePin = map.querySelector('.map__pin--active');
//   if (activePin) {
//     activePin.classList.remove('map__pin--active');
//   }
// };
//
// var openPopup = function (notice) {
//   mapPins.appendChild(renderNotice(notice));
//   document.addEventListener('keydown', onPopupEscPress);
// };
//
// var closePopup = function () {
//   var mapCard = map.querySelector('.popup');
//
//   if (mapCard) {
//     mapPins.removeChild(mapCard);
//     removeActiveClass();
//     document.removeEventListener('keydown', onPopupEscPress);
//   }
// };
//
// var onPopupEscPress = function (evt) {
//   if (evt.keyCode === ESC_KEYCODE) {
//     closePopup();
//   }
// };
//
// var changeFieldsetStatus = function (state) {
//   Array.from(fieldsets).forEach(function (item) {
//     item.disabled = state;
//   });
// };
//
// // заполняем поле Адреса
// var inputCoordinate = function (offsetTop, pinX, pinY) {
//   var currentX = pinX || mainPin.style.left;
//   var currentY = pinY || mainPin.style.top;
//   var positionX = Math.round(parseInt(currentX, 10) + Pin.WIDTH / 2);
//   var positionY = Math.round(parseInt(currentY, 10) + offsetTop);
//   inputAddress.value = positionX + ', ' + positionY;
// };
//
// // активация формы, карты
// var onMainPinMouseDownActivate = function () {
//   doVisibleElement(map, 'map--faded');
//   doVisibleElement(form, 'ad-form--disabled');
//   changeFieldsetStatus(false);
//   renderPins();
//   mainPin.removeEventListener('mousedown', onMainPinMouseDownActivate);
// };

// Перемещение главного пина
// var checkBoundaries = function () {
//   var MIN_LEFT_COORDS = 0;
//   var MIN_TOP_COORDS = Pin.MIN_LOCATION_Y - Pin.HEIGHT - Pin.HEIGHT_LEG;
//   var maxLeftCoords = widthMap - Pin.WIDTH;
//   var maxTopCoords = Pin.MAX_LOCATION_Y - Pin.HEIGHT - Pin.HEIGHT_LEG;
//
//   if (mainPin.offsetLeft < MIN_LEFT_COORDS) {
//     mainPin.style.left = MIN_LEFT_COORDS + 'px';
//   } else if (mainPin.offsetLeft > maxLeftCoords) {
//     mainPin.style.left = maxLeftCoords + 'px';
//   }
//
//   if (mainPin.offsetTop < MIN_TOP_COORDS) {
//     mainPin.style.top = MIN_TOP_COORDS + 'px';
//   } else if (mainPin.offsetTop > maxTopCoords) {
//     mainPin.style.top = maxTopCoords + 'px';
//   }
// };
//
// var onMainPinMouseDown = function (evt) {
//   evt.preventDefault();
//   var startCoords = {
//     x: evt.clientX,
//     y: evt.clientY
//   };
//
//   var onMainPinMouseMove = function (moveEvt) {
//     moveEvt.preventDefault();
//     var shift = {
//       x: startCoords.x - moveEvt.clientX,
//       y: startCoords.y - moveEvt.clientY
//     };
//     startCoords = {
//       x: moveEvt.clientX,
//       y: moveEvt.clientY
//     };
//
//     mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
//     mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
//     checkBoundaries();
//     inputCoordinate(Pin.HEIGHT + Pin.HEIGHT_LEG);
//   };
//
//   var onMainPinMouseUp = function (upEvt) {
//     upEvt.preventDefault();
//     inputCoordinate(Pin.HEIGHT + Pin.HEIGHT_LEG);
//     document.removeEventListener('mousemove', onMainPinMouseMove);
//     document.removeEventListener('mouseup', onMainPinMouseUp);
//   };
//   document.addEventListener('mousemove', onMainPinMouseMove);
//   document.addEventListener('mouseup', onMainPinMouseUp);
// };
//
// inputCoordinate(Pin.HEIGHT / 2);
// mainPin.addEventListener('mousedown', onMainPinMouseDown);
// mainPin.addEventListener('mousedown', onMainPinMouseDownActivate);

// Валидация формы// Валидация формы обхявления
// var type = form.querySelector('#type');
// var price = form.querySelector('#price');
// var roomNumber = form.querySelector('#room_number');
// var capacity = form.querySelector('#capacity');
// var timein = form.querySelector('#timein');
// var timeout = form.querySelector('#timeout');
// var inputs = form.querySelectorAll('input');
// var submit = form.querySelector('.ad-form__submit');
// var resetBtn = form.querySelector('.ad-form__reset');
// var ROOMS_CAPACITY = {
//   '1': ['1'],
//   '2': ['2', '1'],
//   '3': ['3', '2', '1'],
//   '100': ['0']
// };
//
// // поля Тип жилья - цена
// var onTypeHousesChange = function () {
//   var currentValue = type.value;
//   price.placeholder = NoticeData.TYPES_HOUSES[currentValue].min;
// };
//
// var onRoomNumberChange = function () {
//
//   if (capacity.options.length > 0) {
//     [].forEach.call(capacity.options, function (item) {
//       item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
//       item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
//     });
//   }
// };
//
// onRoomNumberChange(); // сразу прячем неподходящие options для Кол-ва гостей
//
// roomNumber.addEventListener('change', onRoomNumberChange);
// type.addEventListener('change', onTypeHousesChange);
//
// timein.addEventListener('change', function () {
//   timeout.value = timein.value;
// });
//
// timeout.addEventListener('change', function () {
//   timein.value = timeout.value;
// });
//
// // Кастомные сообщения об ошибке
// function CustomValidation() { }
// CustomValidation.prototype = {
//
//   invalidities: [],
//
//   checkValidity: function (input) {
//     var validity = input.validity;
//
//     if (validity.tooLong) {
//       this.addInvalidity('Максимальная длина — 100 символов.');
//     }
//
//     if (validity.tooShort) {
//       this.addInvalidity('Минимальная длина — 30 символов.');
//     }
//
//     if (validity.rangeOverflow) {
//       var max = input.max;
//       this.addInvalidity('Максимальное значение — 1 000 000 ' + max + '.');
//     }
//
//     if (validity.valueMissing) {
//       this.addInvalidity('Это поле обязательно для заполнения.');
//     }
//   },
//
//   addInvalidity: function (message) {
//     this.invalidities = [];
//     this.invalidities.push(message);
//   },
//
//   getInvalidities: function () {
//     return this.invalidities.join('. \n');
//   },
//
//   getInvaliditiesForHTML: function () {
//     return this.invalidities.join('. <br>');
//   }
// };
//
// var removeErrorMsg = function () {
//   var errors = document.querySelectorAll('.error-message'); // сообщения об ошибке
//   if (errors) {
//     [].forEach.call(errors, function (error) {
//       error.remove();
//     });
//   }
//
//   [].forEach.call(inputs, function (item) {
//     item.style.boxShadow = 'none';
//   });
// };
//
// var onSubmitForm = function (evt) {
//   evt.preventDefault();
//   var isValid = true;
//   removeErrorMsg();
//
//   [].forEach.call(inputs, function (item) {
//     item.style.boxShadow = 'none';
//
//     if (item.checkValidity() === false) {
//       isValid = false;
//       item.style.boxShadow = '0 0 2px 2px #ff6547';
//       var inputCustomValidation = new CustomValidation();
//       inputCustomValidation.checkValidity(item);
//       var customValidityMessage = inputCustomValidation.getInvalidities();
//       item.setCustomValidity(customValidityMessage);
//
//       var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
//       item.insertAdjacentHTML('afterEnd', '<p class="error-message" style="color: red;">' + customValidityMessageForHTML + '</p>');
//     }
//   });
//
//   if (isValid) {
//     form.submit();
//     form.reset();
//   }
// };
//
// var getdefaultStateSelectBox = function () {
//
//   if (capacity.options.length > 0) {
//     [].forEach.call(capacity.options, function (item) {
//       if (item.hidden) {
//         item.hidden = false;
//       }
//     });
//   }
// };
//
// var onClickReset = function (evt) {
//   evt.preventDefault();
//   form.reset();
//   doHiddenElement(map, 'map--faded');
//   doHiddenElement(form, 'ad-form--disabled');
//
//   changeFieldsetStatus(true);
//   inputCoordinate(Pin.HEIGHT / 2, Pin.INITIAL_X, Pin.INITIAL_Y);
//   mainPin.style.left = Pin.INITIAL_X + 'px';
//   mainPin.style.top = Pin.INITIAL_Y + 'px';
//   var defaultType = type[type.selectedIndex].value;
//   price.placeholder = NoticeData.TYPES_HOUSES[defaultType].min;
//   getdefaultStateSelectBox();
//   removeErrorMsg();
//   mainPin.addEventListener('mouseup', onMainPinMouseDownActivate);
// };
//
// resetBtn.addEventListener('click', onClickReset);
// submit.addEventListener('click', onSubmitForm);
//
// form.addEventListener('input', function (evt) {
//   if (evt.target.tagName === 'INPUT') {
//     evt.target.style.boxShadow = 'none';
//   }
// });
