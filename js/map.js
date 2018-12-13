'use strict';

(function () {
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
      window.data.mapPins.removeChild(mapCard);
      removeActiveClass();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, window.map.closePopup);
  };

  var removePins = function (pins) {
    Array.from(pins).forEach(function (item) {
      window.utils.removeElement(item);
    });
  };

  var doHiddenElement = function (element, hiddenClass) {
    element.classList.add(hiddenClass);
  };

  var getDefaultMapState = function () {
    var mapPinCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('.popup');
    doHiddenElement(window.data.map, 'map--faded');
    doHiddenElement(form, 'ad-form--disabled');
    window.form.changeFieldsetStatus(true);
    removePins(mapPinCollection);
    window.utils.removeElement(card);
    window.form.inputCoordinate(window.data.pin.HEIGHT / 2, window.data.pin.INITIAL_X, window.data.pin.INITIAL_Y);
    window.data.mainPin.style.left = window.data.pin.INITIAL_X + 'px';
    window.data.mainPin.style.top = window.data.pin.INITIAL_Y + 'px';
    window.data.mainPin.addEventListener('mouseup', window.dragNdrop.onMainPinMouseDownActivate);
  };

  window.map = {
    openPopup: openPopup,
    closePopup: closePopup,
    getDefaultMapState: getDefaultMapState
  };

})();
