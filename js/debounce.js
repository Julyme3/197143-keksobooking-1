'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  // window.debounce = function (cb) {
  //   var lastTimeout = null;
  //
  //   return function () {
  //     var parameters = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function () {
  //       cb.apply(null, parameters);
  //     }, DEBOUNCE_INTERVAL);
  //     console.log(lastTimeout);
  //   };
  // };
  var debounce = function (cb) {
    var lastTimeout = null;
    debugger;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
      console.log(lastTimeout);
    }();
  };

  window.debounce = {
    a: debounce
  };
})();
