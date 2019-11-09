'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.utils.HTTP_STATUS_OK) {
        window.map.resetMapAndForm();
      } else {
        window.messages.onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();


