'use strict';

(function () {
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
  addressField.setAttribute('value', getCoordinatesPin(INACTIVE_HALF_MAIN_PIN_SIZE));


  // делает карту и форму активными, отрисовывает метки на карте
  var onShowMapAndForm = function () {
    // условие для однократной отрисовки меток на карте
    if (!IS_PINS_RENDERED) {
      createMapPins();
      map.classList.remove('map--faded');
      // записывает координаты метки в поле 'адрес'
      addressField.setAttribute('placeholder', getCoordinatesPin(window.utils.PIN_HEIGHT));
      form.classList.remove('ad-form--disabled');
      for (var j = 0; j < fieldsets.length; j++) {
        fieldsets[j].removeAttribute('disabled');
      }
      IS_PINS_RENDERED = true;
    }
    // находит пины на карте, кроме основной метки
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    // выводит переменную в глобальную область видимости
    window.mapPins = mapPins;
    // добавляет дата-атрибуты пинам
    for (var k = 0; k < window.data.ADV_NUMBER; k++) {
      mapPins[k].setAttribute('data-index', k);
    }
    // отслеживает на какой пин был клик
    onClickPin();
  };

  // активирует карту и форму по клику на основную метку
  mainPin.addEventListener('mousedown', onShowMapAndForm);

  // активирует карту и форму по нажатию enter на основную метку
  mainPin.addEventListener('keydown', function () {
    if (window.utils.isEnterPressed) {
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
  var showOffer = function (dataindex) {
    // создает фрагмент с карточкой объявления для вставки в шаблон
    var cardFragment = document.createDocumentFragment();
    var randomCard = window.data.createRandomAdv();
    // создает карточку по индексу пина
    cardFragment.appendChild(window.card(randomCard[dataindex]));

    window.pin.similarAdv.appendChild(cardFragment);
  };

  // <-------------------- 9. доверяй, но проверяй -------------------->

  // функция для однократной отрисовки карточки объявления
  var getRenderedCard = function (dataindex) {
    var cardPopup = map.querySelector('.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
    showOffer(dataindex);
  };

  // удаляет класс map__pin--active при переключении на другую карточку
  var getActivePin = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // скрывает карточку объявления и удаляет класс map__pin--active у пина
  var cardAndActiveClassRemove = function () {
    map.querySelector('.map__card').classList.add('hidden');
    map.querySelector('.map__pin--active').classList.remove('map__pin--active');
  };

  // находит пин по которому был клик
  var onClickPin = function () {
    var addClickListener = function (mapPin) {
      mapPin.addEventListener('click', function () {
        // удаляет класс map__pin--active при переключении на другую карточку
        getActivePin();
        // находит пин по дата атрибуту
        var cardIndex = mapPin.getAttribute('data-index');
        mapPin.classList.add('map__pin--active');
        // отрисовывает карточку по индексу пина
        getRenderedCard(cardIndex);
        // обработчик нажатия esc для закрытия карточки
        document.addEventListener('keydown', onEscClosePopup);
        // обработчик клика для закрытия карточки
        var closePopup = map.querySelector('.popup__close');
        closePopup.addEventListener('click', onClickClosePopup);
      });
    };
    // находит пин по которму был клик
    for (var j = 0; j < window.mapPins.length; j++) {
      var mapPin = window.mapPins[j];
      addClickListener(mapPin);
    }

    // закрывает карточку объявления по нажатию на Esc
    var onEscClosePopup = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        cardAndActiveClassRemove();
      }
    };
    // закрывает карточку объявления по клику
    var onClickClosePopup = function () {
      cardAndActiveClassRemove();
    };
  };

  window.map = {
    form: form
  };
})();

