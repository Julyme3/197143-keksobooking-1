'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var checkBoundaries = function () {
    var MIN_LEFT_COORDS = 0;
    var MIN_TOP_COORDS = window.data.pin.MIN_LOCATION_Y - window.data.pin.HEIGHT - window.data.pin.HEIGHT_LEG;
    var maxLeftCoords = window.data.map.offsetWidth - window.data.pin.WIDTH;
    var maxTopCoords = window.data.pin.MAX_LOCATION_Y - window.data.pin.HEIGHT - window.data.pin.HEIGHT_LEG;

    if (window.data.mainPin.offsetLeft < MIN_LEFT_COORDS) {
      window.data.mainPin.style.left = MIN_LEFT_COORDS + 'px';
    } else if (window.data.mainPin.offsetLeft > maxLeftCoords) {
      window.data.mainPin.style.left = maxLeftCoords + 'px';
    }

    if (window.data.mainPin.offsetTop < MIN_TOP_COORDS) {
      window.data.mainPin.style.top = MIN_TOP_COORDS + 'px';
    } else if (window.data.mainPin.offsetTop > maxTopCoords) {
      window.data.mainPin.style.top = maxTopCoords + 'px';
    }
  };

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.data.mainPin.style.top = (window.data.mainPin.offsetTop - shift.y) + 'px';
      window.data.mainPin.style.left = (window.data.mainPin.offsetLeft - shift.x) + 'px';
      checkBoundaries();
      window.form.inputCoordinate(window.data.pin.HEIGHT + window.data.pin.HEIGHT_LEG);
    };

    var onMainPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.inputCoordinate(window.data.pin.HEIGHT + window.data.pin.HEIGHT_LEG);
      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };
    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  var doVisibleElement = function (element, hiddenClass) {
    element.classList.remove(hiddenClass);
  };

  var successHandler = function (array) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.notice.COUNT; i++) {
      if (array[i].offer) {
        fragment.appendChild(window.pins.render(array[i]));
      } else {
        return;
      }
    }
    window.data.mapPins.appendChild(fragment);
  };

  // активация формы, карты
  var onMainPinMouseDownActivate = function () {
    doVisibleElement(window.data.map, 'map--faded');
    doVisibleElement(form, 'ad-form--disabled');
    window.form.changeFieldsetStatus(false);
    window.backend.load(successHandler, window.utils.errorHandler);
    window.data.mainPin.removeEventListener('mousedown', onMainPinMouseDownActivate);
  };

  window.data.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  window.data.mainPin.addEventListener('mousedown', onMainPinMouseDownActivate);

  window.dragNdrop = {
    onMainPinMouseDownActivate: onMainPinMouseDownActivate
  };
})();
