'use strict';

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
var X_AXIS = 1200;
var ADV_NUMBER = 8; //  количество объявлений
var PIN_HEIGHT = 70;

// У блока .map убераем класс .map--faded
document.querySelector('.map').classList.remove('map--faded');

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

// создает массив со случайнуми объектами (рандомное объявление)
var createRandomAdv = function () {
  var createAdv = [];
  for (var i = 0; i < ADV_NUMBER; i++) {
    createAdv[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: createRandomElement(TITLE),
        address: createRandomElement(ADDRESS),
        price: createRandomElement(PRICE),
        type: createRandomElement(TYPE_OF_PLACE),
        rooms: createRandomElement(NUMBER_OF_ROOMS),
        guests: createRandomElement(GUESTS),
        checkin: createRandomElement(CHECKIN_CHECKOUT),
        checkout: createRandomElement(CHECKIN_CHECKOUT),
        features: createRandomArr(FEATURES),
        description: createRandomElement(DESCRIPTION),
        photos: createRandomArr(PHOTOS)
      },
      location: {
        y: createRandomNumber(MAX_Y, MIN_Y),
        x: createRandomXAxis(X_AXIS)
      }
    };
  }
  return createAdv;
};

// находит шаблон в теге template
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

var createMapPins = function () {
  // создает фрагмент для вставки в шаблон
  var fragment = document.createDocumentFragment();
  var randomAdv = createRandomAdv();

  for (var i = 0; i < ADV_NUMBER; i++) {
    fragment.appendChild(createMapPin(randomAdv[i]));
  }

  similarAdv.appendChild(fragment);
};

createMapPins();
