'use strict';

(function () {
  // находит шаблон пина в теге template
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // находит место в разметке куда надо вставить шаблон пина
  var similarAdv = document.querySelector('.map__pins');

  // создает метку для карты
  var createMapPin = function (adv) {
    // клонирует шаблон
    var pinElement = pinTemplate.cloneNode(true);
    // добавляет координаты на карте
    pinElement.style.left = adv.location.x + 'px';
    pinElement.style.top = adv.location.y + 'px';
    pinElement.querySelector('img').src = adv.author.avatar;
    pinElement.querySelector('img').alt = adv.offer.title;

    return pinElement;
  };

  window.pin = {
    createMapPin: createMapPin,
    similarAdv: similarAdv
  };
})();
