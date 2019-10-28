'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        // если все норм, переводит страницу в неактивное состяние
        window.map.resetMapAndForm();
      } else {
        // если все плохо, выводит ошибку
        window.messages.onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();


