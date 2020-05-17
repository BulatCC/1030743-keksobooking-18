'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === window.utils.HTTP_STATUS_OK) {
        window.serverData = xhr.response;
      } else {
        window.messages.onError();
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  };
})();


