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
  var showOffer = function () {
    // создает фрагмент с карточкой объявления для вставки в шаблон
    var cardFragment = document.createDocumentFragment();
    var randomAdv = window.data.createRandomAdv();
    cardFragment.appendChild(window.card(randomAdv[0]));
    window.pin.similarAdv.appendChild(cardFragment);

  };

  // <-------------------- 9. доверяй, но проверяй -------------------->

  // var onPinClick = function (evt) {
  //   var target = evt.target;
  //   var isContainMainPin = evt.target.parentElement.classList.contains('map__pin--main');
  //   if (target.tagName === 'IMG' && !isContainMainPin) {
  //     showOffer();
  //   }
  // }

  // map.addEventListener('click', onPinClick);

  // функция для однократной отрисовки карточки объявления
  var getRenderedCard = function () {
    var cardPopup = map.querySelector('.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
    showOffer();
  };

  // находит пин по которому был клик
  var onClickPin = function () {
    var addClickListener = function (mapPin) {
      mapPin.addEventListener('click', function () {
        mapPin.classList.add('map__pin--active');
        getRenderedCard();
        // обработчик нажатия esc для закрытия карточки
        document.addEventListener('keydown', onEscClosePopup);
        // обработчик нклика для закрытия карточки
        var closePopup = map.querySelector('.popup__close');
        closePopup.addEventListener('click', onClickClosePopup);
      });
    };
    // находит пин по которму был клик
    for (var j = 0; j < window.mapPins.length; j++) {
      var mapPin = window.mapPins[j];
      addClickListener(mapPin);
      // onEscClosePopup(mapPin);
    }
    // находит карточку-попап
    var getCardPopup = function () {
      return map.querySelector('.map__card');
    };

    // закрывает карточку объявления по нажатию на Esc
    var onEscClosePopup = function () {
      if (window.utils.isEscPressed) {
        getCardPopup().classList.add('hidden');
      }
    };
    // закрывает карточку объявления по клику
    var onClickClosePopup = function () {
      getCardPopup().classList.add('hidden');
    };
  };

  window.map = {
    form: form
  };
})();
