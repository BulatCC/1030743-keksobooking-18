'use strict';

(function () {
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;
  var MIN_WIDTH = -32;
  var MAX_WIDTH = 1200;

  // Перетсакиваем основную метку
  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (e) {
      e.preventDefault();
      // координаты относительно начальной точки при каждом движении мыши
      var shift = {
        x: startCoords.x - e.clientX,
        y: startCoords.y - e.clientY
      };

      startCoords = {
        x: e.clientX,
        y: e.clientY
      };

      var coordinatesY = window.map.mainPin.offsetTop - shift.y; // ↑
      var coordinatesX = window.map.mainPin.offsetLeft - shift.x; // ←

      // координаты для вставки в поле адрес
      var coordinatesForAdressField = (coordinatesX + window.map.INACTIVE_HALF_MAIN_PIN_SIZE) + ', ' + (coordinatesY + window.utils.PIN_HEIGHT);

      // вставляет координаты в поле адрес
      window.map.addressField.setAttribute('value', coordinatesForAdressField);

      // ограничивает границы перетаскивания основной метки
      if (coordinatesY < MIN_HEIGHT - window.utils.PIN_HEIGHT) {
        coordinatesY = MIN_HEIGHT - window.utils.PIN_HEIGHT;
      } else if (coordinatesY > MAX_HEIGHT - window.utils.PIN_HEIGHT) {
        coordinatesY = MAX_HEIGHT - window.utils.PIN_HEIGHT;
      }

      if (coordinatesX < MIN_WIDTH) {
        coordinatesX = MIN_WIDTH;
      } else if (coordinatesX > MAX_WIDTH - window.map.INACTIVE_HALF_MAIN_PIN_SIZE) {
        coordinatesX = MAX_WIDTH - window.map.INACTIVE_HALF_MAIN_PIN_SIZE;
      }

      // передаем координаты в атрибут style
      window.map.mainPin.style.top = coordinatesY + 'px';
      window.map.mainPin.style.left = coordinatesX + 'px';

    };
    // удаляет обработчики mousedown и mousemove по событию mouseup
    var onMouseUp = function (evt1) {
      evt1.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
