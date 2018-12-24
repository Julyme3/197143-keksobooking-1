'use strict';

(function () {
  var MIN_LEFT_COORDS = 0;

  var checkBoundaries = function () {
    var minTopCoords = window.data.pin.MIN_LOCATION_Y - window.data.pin.HEIGHT - window.data.pin.HEIGHT_MARKER;
    var maxLeftCoords = window.data.map.offsetWidth - window.data.pin.WIDTH;
    var maxTopCoords = window.data.pin.MAX_LOCATION_Y - window.data.pin.HEIGHT - window.data.pin.HEIGHT_MARKER;

    if (window.data.mainPin.offsetLeft < MIN_LEFT_COORDS) {
      window.data.mainPin.style.left = MIN_LEFT_COORDS + 'px';
    } else if (window.data.mainPin.offsetLeft > maxLeftCoords) {
      window.data.mainPin.style.left = maxLeftCoords + 'px';
    }

    if (window.data.mainPin.offsetTop < minTopCoords) {
      window.data.mainPin.style.top = minTopCoords + 'px';
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
      window.form.inputCoordinate(window.data.pin.HEIGHT + window.data.pin.HEIGHT_MARKER);
    };

    var onMainPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.inputCoordinate(window.data.pin.HEIGHT + window.data.pin.HEIGHT_MARKER);
      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };
    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };
  window.dragNdrop = {
    onMainPinMouseDown: onMainPinMouseDown
  };
})();
