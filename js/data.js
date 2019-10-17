'use strict';

(function () {
  var TITLE = ['Однушка', 'Дом', 'Коттедж', 'Двушка', 'Трешка', 'Пентхаус', 'Глухие соседи', 'С видом на море'];
  var ADDRESS = ['600, 350', '650, 300', '550, 250', '500, 300', '450, 150', '700, 400', '400, 400', '350, 350'];
  var PRICE = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
  var TYPE_OF_PLACE = ['palace', 'flat', 'house', 'bungalo']; //  вид жилища
  var NUMBER_OF_ROOMS = [1, 2, 3, 4, 5, 6];
  var GUESTS = [1, 2, 3, 4, 5, 6];
  var CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00']; //  время заезда или выезда
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // плюшки
  var DESCRIPTION = ['близко к метро', 'тихо', 'уютно', 'спокойно', 'тепло', 'высоко', 'хороший ремонт', 'с клопами'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_Y = 130;
  var MAX_Y = 630;
  var ADV_NUMBER = 8; //  количество объявлений

// создает массив со случайнуми объектами (рандомное объявление)
var createRandomAdv = function () {
  var createAdv = [];
  for (var i = 0; i < ADV_NUMBER; i++) {
    createAdv[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: window.utils.createRandomElement(TITLE),
        address: window.utils.createRandomElement(ADDRESS),
        price: window.utils.createRandomElement(PRICE),
        type: window.utils.createRandomElement(TYPE_OF_PLACE),
        rooms: window.utils.createRandomElement(NUMBER_OF_ROOMS),
        guests: window.utils.createRandomElement(GUESTS),
        checkin: window.utils.createRandomElement(CHECKIN_CHECKOUT),
        checkout: window.utils.createRandomElement(CHECKIN_CHECKOUT),
        features: window.utils.createRandomArr(FEATURES),
        description: window.utils.createRandomElement(DESCRIPTION),
        photos: window.utils.createRandomArr(PHOTOS)
      },
      location: {
        y: window.utils.createRandomNumber(MAX_Y, MIN_Y),
        x: window.utils.createRandomXAxis(window.utils.X_AXIS)
      }
    };
  }
  return createAdv;
};

window.data = {
  createRandomAdv: createRandomAdv,
  ADV_NUMBER: ADV_NUMBER
};
})();
