'use strict';

(function () {

  var mainTag = document.querySelector('main');

  var onError = function () {
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

  var success = function () {
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
