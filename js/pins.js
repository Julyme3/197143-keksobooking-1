'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (notice) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = notice.author.avatar;
    pinElement.style.left = notice.location.x - (window.data.pin.WIDTH / 2) + 'px';
    pinElement.style.top = notice.location.y - window.data.pin.HEIGHT + 'px';
    pinElement.querySelector('img').src = notice.author.avatar;
    pinElement.querySelector('img').alt = notice.offer.title;

    var onActivatePin = function () {
      window.map.closePopup();
      pinElement.classList.add('map__pin--active');
      window.map.openPopup(notice);
    };

    pinElement.addEventListener('click', function () {
      onActivatePin();
    });

    pinElement.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, onActivatePin);
    });

    return pinElement;
  };
  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    var countNotice = array.length > window.data.notice.COUNT ? window.data.notice.COUNT : array.length;
    for (var i = 0; i < countNotice; i++) {
      if (array[i].offer) {
        fragment.appendChild(renderPin(array[i]));
      } else {
        return;
      }
    }
    window.data.mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var pins = window.data.map.querySelectorAll('.map__pin:not(.map__pin--main)');
    [].forEach.call(pins, function (item) {
      window.utils.removeElement(item);
    });
  };
  window.pins = {
    render: renderPins,
    remove: removePins
  };
})();
