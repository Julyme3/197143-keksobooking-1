'use strict';

(function () {
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

  window.map = {
    openPopup: openPopup,
    closePopup: closePopup
  };

})();
