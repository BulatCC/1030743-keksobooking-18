'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        // данные для отрисовки карточки
        window.serverData = xhr.response;
      } else {
        // если все плохо, выводит ошибку
        window.messages.onError();
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();


