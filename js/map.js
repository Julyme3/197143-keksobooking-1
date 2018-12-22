'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var form = document.querySelector('.ad-form');

  var removeActiveClass = function () {
    var activePin = window.data.map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var openPopup = function (notice) {
    window.data.mapPins.appendChild(window.card.render(notice));
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    var mapCard = window.data.map.querySelector('.popup');
    if (mapCard) {
      window.utils.removeElement(mapCard);
      removeActiveClass();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, window.map.closePopup);
  };

  var doHiddenElement = function (element, hiddenClass) {
    element.classList.add(hiddenClass);
  };

  var getDefaultMapState = function () {
    var mapPinCollection = window.data.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = window.data.map.querySelector('.popup');
    doHiddenElement(window.data.map, 'map--faded');
    doHiddenElement(form, 'ad-form--disabled');
    window.form.changeFieldsetStatus(true);
    window.pins.remove(mapPinCollection);
    window.utils.removeElement(card);
    window.form.inputCoordinate(window.data.pin.HEIGHT / 2, window.data.pin.INITIAL_X, window.data.pin.INITIAL_Y);
    window.data.mainPin.style.left = window.data.pin.INITIAL_X + 'px';
    window.data.mainPin.style.top = window.data.pin.INITIAL_Y + 'px';
    window.data.mainPin.addEventListener('mouseup', onMainPinMouseDownActivate);
  };

  var doVisibleElement = function (element, hiddenClass) {
    element.classList.remove(hiddenClass);
  };

  var allNotices;

  var successHandler = function (array) {
    window.pins.render(array);
    allNotices = array;
    return allNotices;
  };

  var onMainPinMouseDownActivate = function () {
    doVisibleElement(window.data.map, 'map--faded');
    doVisibleElement(form, 'ad-form--disabled');
    window.form.changeFieldsetStatus(false);
    window.backend.sendServerRequest(URL, 'GET', successHandler, window.utils.errorHandler);
    window.data.mainPin.removeEventListener('mousedown', onMainPinMouseDownActivate);
  };

  window.form.changeFieldsetStatus(true);
  window.data.mainPin.addEventListener('mousedown', window.dragNdrop.onMainPinMouseDown);
  window.data.mainPin.addEventListener('mousedown', onMainPinMouseDownActivate);

  var onFiltersChange = window.debounce(function () {
    window.pins.remove();
    var card = window.data.map.querySelector('.popup');
    window.utils.removeElement(card);
    window.filters.updatePins(allNotices);
  });
  window.filters.form.addEventListener('change', onFiltersChange);

  window.map = {
    openPopup: openPopup,
    closePopup: closePopup,
    getDefaultMapState: getDefaultMapState
  };

})();
