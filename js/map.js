'use strict';

(function () {
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

  // координаты основной метки
  var getCoordinatesPin = function (pin) {
    return [+addressFormCoordinates[0] + INACTIVE_HALF_MAIN_PIN_SIZE, +addressFormCoordinates[1] + pin].join(', ');
  };

  // добавляет координаты карты в неактивном состоянии
  addressField.setAttribute('placeholder', getCoordinatesPin(INACTIVE_HALF_MAIN_PIN_SIZE));

  // делает карту и форму активными, отрисовывает метки на карте
  var onShowMapAndForm = function () {
    // условие для однократной отрисовки меток на карте
    if (!IS_PINS_RENDERED) {
      createMapPins();
      showOffer();
      map.classList.remove('map--faded');
      // записывает координаты метки в поле 'адрес'
      addressField.setAttribute('placeholder', getCoordinatesPin(window.utils.PIN_HEIGHT));
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

  // отрисовывает пины на карте
  var createMapPins = function () {
    // создает фрагмент для вставки в шаблон
    var fragment = document.createDocumentFragment();
    var randomAdv = window.data.createRandomAdv();
    for (var k = 0; k < window.data.ADV_NUMBER; k++) {
      fragment.appendChild(window.pin.createMapPin(randomAdv[k]));
    }

    window.pin.similarAdv.appendChild(fragment);
  };

  // отрисовывает карточку объявления
  var showOffer = function () {
    // создает фрагмент с карточкой объявления для вставки в шаблон
    var cardFragment = document.createDocumentFragment();
    var randomAdv = window.data.createRandomAdv();
    cardFragment.appendChild(window.card(randomAdv[0]));
    window.pin.similarAdv.appendChild(cardFragment);
  };

  // вынес в объект одно значение потомучто позже надо будет больше значений передавать в глобальную область видимости
  window.map = {
    form: form
  };
})();
