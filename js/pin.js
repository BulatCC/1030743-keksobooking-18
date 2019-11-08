'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var similarAdv = document.querySelector('.map__pins-adv');

  var createMapPin = function (adv) {
    var pinElement = pinTemplate.cloneNode(true);
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
