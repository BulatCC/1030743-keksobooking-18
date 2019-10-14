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

// <---------------------------------------- 8. Личный проект: подробности ---------------------------------------->

var ENTER_KEYCODE = 13;
var INACTIVE_HALF_MAIN_PIN_SIZE = 32;
var IS_PINS_RENDERED = false; // переменная для провеки условия отрисовки меток

// карта
var map = document.querySelector('.map');

// форма
var form = document.querySelector('.ad-form');

// добавляет атрибут 'disabled' форме
var fieldsets = document.querySelectorAll('fieldset');
for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', '');
}

// основная метка в разметке
var mainPin = document.querySelector('.map__pin--main');

// считывает координаты основной метки
var mainPinCoordinates = mainPin.getAttribute('style');

// поле ввода адреса (координат)
var addressField = document.querySelector('#address');

// координаты цифрами с помощью регулярного выражения
var addressFormCoordinates = mainPinCoordinates.match(/\d+/g);

// координаты основной метки в НЕАКТИВНОМ состянии
var getCoordinatesInactivePin = function () {
  return [+addressFormCoordinates[0] + INACTIVE_HALF_MAIN_PIN_SIZE, +addressFormCoordinates[1] + INACTIVE_HALF_MAIN_PIN_SIZE];
};

// координаты основной метки в АКТИВНОМ состянии
var getCoordinatesActivePin = function () {
  return [+addressFormCoordinates[0] + INACTIVE_HALF_MAIN_PIN_SIZE, +addressFormCoordinates[1] + PIN_HEIGHT];
};

// добавляет координаты карты в неактивном состоянии
addressField.setAttribute('placeholder', getCoordinatesInactivePin());

// делает карту и форму активными, отрисовывает метки на карте
var onShowMapAndForm = function () {
  // условие для однократной отрисовки меток на карте
  if (!IS_PINS_RENDERED) {
    createMapPins();
    map.classList.remove('map--faded');
    // записывает координаты метки в поле 'адрес'
    addressField.setAttribute('placeholder', getCoordinatesActivePin());
    form.classList.remove('ad-form--disabled');
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].removeAttribute('disabled');
    }
    IS_PINS_RENDERED = true;
  }
};

// активирует карту и форму по клику на основную метку
mainPin.addEventListener('mousedown', onShowMapAndForm);

// активирует карту и форму по нажатию enter на основную метку
mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onShowMapAndForm();
  }
});

// поле ввода количества комнат в разметке
var roomNumber = form.querySelector('#room_number');

// поле ввода количества гостей
var guests = form.querySelector('#capacity');

// ставит атрибут 'disabled' в поле выбора количества гостей
var setGuestValue = function (value) {
  return guests[value].setAttribute('disabled', '');
};

// удаляет атрибут 'disabled' в поле выбора количества гостей
var removeGuestValue = function (value) {
  return guests[value].removeAttribute('disabled');
};

form.addEventListener('click', function () {
  // синхронизирует поле «Количество комнат» с полем «Количество мест»
  if (roomNumber.value === '1') {
    guests.value = 1;
    setGuestValue(0);
    setGuestValue(1);
    removeGuestValue(2);
    setGuestValue(3);
  } else if (roomNumber.value === '2') {
    setGuestValue(0);
    removeGuestValue(1);
    removeGuestValue(2);
    setGuestValue(3);
  } else if (roomNumber.value === '3') {
    removeGuestValue(0);
    removeGuestValue(1);
    removeGuestValue(2);
    setGuestValue(3);
  } else if (roomNumber.value === '100') {
    guests.value = 0;
    setGuestValue(0);
    setGuestValue(1);
    setGuestValue(2);
    removeGuestValue(3);
  }

  // выводит кастомные сообщения об ошибке
  if (roomNumber.value === '100' && guests.value !== '0') {
    roomNumber.setCustomValidity('Не для гостей');
  } else if (guests.value === '0' && roomNumber.value !== '100') {
    guests.setCustomValidity('Выберите 100 комнат для выбора данной опции');
  } else if (roomNumber.value < guests.value && guests.value !== '0') {
    roomNumber.setCustomValidity('Гостей больше, чем мест. Выберете больше комнат');
    guests.setCustomValidity('Гостей больше, чем мест. Выберете больше комнат');
  } else {
    roomNumber.setCustomValidity('');
    guests.setCustomValidity('');
  }
});
