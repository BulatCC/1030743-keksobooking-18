'use strict';

(function () {
  var X_AXIS = 1200;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  // создает случайное число в диапазоне 2 чисел
  var createRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // случайная координата по оси Х
  var createRandomXAxis = function () {
    return Math.floor(Math.random() * X_AXIS - PIN_HEIGHT);
  };

  // создает случайный элемент из массива
  var createRandomElement = function (arr) {
    return arr [Math.floor(Math.random() * arr.length)];
  };

  // создает случайные элементы массива
  var createRandomArr = function (arr) {
    var randomArr = [];
    for (var i = 0; i < createRandomNumber(1, arr.length); i++) {
      randomArr.push(arr[i]);
    }
    return randomArr;
  };

  // проверяет нажат ли Enter
  var isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  // проверяет нажат ли Esc
  var isEscPressed = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  window.utils = {
    createRandomNumber: createRandomNumber,
    createRandomXAxis: createRandomXAxis,
    createRandomElement: createRandomElement,
    createRandomArr: createRandomArr,
    X_AXIS: X_AXIS,
    PIN_HEIGHT: PIN_HEIGHT,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
