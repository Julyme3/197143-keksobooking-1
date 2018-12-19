'use strict';

(function () {
  var STATUS_CODE = 200;
  var sendServerRequest = function (url, type, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open(type, url);
    xhr.send(data);
  };
  window.backend = {
    sendServerRequest: sendServerRequest
  };
})();
