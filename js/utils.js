'use strict';

(function () {
  var X_AXIS = 1200;
  var PIN_HEIGHT = 80;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var HTTP_STATUS_OK = 200;

  var isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  window.utils = {
    X_AXIS: X_AXIS,
    PIN_HEIGHT: PIN_HEIGHT,
    isEnterPressed: isEnterPressed,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    HTTP_STATUS_OK: HTTP_STATUS_OK
  };
})();

