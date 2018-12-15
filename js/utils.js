'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var errorHandler = function () {
    var errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMsgElement = errorMsgTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMsgElement);
    window.map.getDefaultMapState();

    var removeErrMsg = function () {
      errorMsgElement.remove();
    };

    document.addEventListener('click', function () {
      removeErrMsg();
    });

    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, removeErrMsg);
    });
  };

  var removeElement = function (item) {
    if (item) {
      item.remove();
    }
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    errorHandler: errorHandler,
    removeElement: removeElement
  };
})();
