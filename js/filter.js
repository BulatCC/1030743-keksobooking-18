'use strict';

(function () {
// загружает данные с сервера
  window.load();

  // фильтрует данные
  var comparing = function () {
    // переменная с данными для отрисовки
    var compared = window.serverData;
    window.compared = compared;
    window.map.filterPlaceType.addEventListener('change', function () {
      if (window.map.filterPlaceType.value === 'any') {
        compared = window.serverData;
      }
      compared = window.serverData.filter(function (placetype) {
        return placetype.offer.type === window.map.filterPlaceType.value;
      });
    });
  };
  window.filter = {
    comparing: comparing
  };
})();
