'use strict';

(function () {
  var renderPin = function (notice) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
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

    window.form.resetBtn.addEventListener('click', function () {
      pinElement.remove();
    });

    return pinElement;
  };

  window.pins = {
    render: renderPin
  };
})();
