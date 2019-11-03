'use strict';

(function () {
  // тэг main
  var mainTag = document.querySelector('main');

  // выводит и скрывает сообщение об ошибке если ошибка сервера
  var onError = function () {
    // клонирует шаблон сообщения об ошибке
    var errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    mainTag.appendChild(errorTemplate);
    var errorMessage = mainTag.querySelector('.error');
    document.addEventListener('click', function () {
      errorMessage.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        errorMessage.remove();
      }
    });
  };

  // выводит и скрывает сообщение что все ок
  var success = function () {
  // клонирует шаблон сообщения об успехе
    var successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    mainTag.appendChild(successTemplate);
    var successMessage = mainTag.querySelector('.success');
    document.addEventListener('click', function () {
      successMessage.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        successMessage.remove();
      }
    });
  };
  window.messages = {
    onError: onError,
    success: success
  };

})();
