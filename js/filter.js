'use strict';

(function () {
// загружает данные с сервера
  window.load();

  // фильтрует данные
  var comparing = function () {
    // сохраняем данные с сервера в перемнную
    window.compared = window.serverData;
    if (window.map.filterPlaceType.value === 'any') {
      window.compared = window.serverData;
    } else {
      window.compared = window.serverData.filter(function (placetype) {
        return placetype.offer.type === window.map.filterPlaceType.value;
      });
    }
  };
  window.filter = {
    comparing: comparing
  };
})();
