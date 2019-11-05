'use strict';

(function () {
  var INACTIVE_HALF_MAIN_PIN_SIZE = 32;

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
    // сохраняет в перемнную данные с сервера
    window.filter.comparing(window.serverData);
    // отрисовывает пины с учетом фильтации (так должно быть, но пока не работает)
    onSuccess(window.compared);
    map.classList.remove('map--faded');
    // записывает координаты метки в поле 'адрес'
    addressField.setAttribute('placeholder', getCoordinatesPin(window.utils.PIN_HEIGHT));
    form.classList.remove('ad-form--disabled');
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].removeAttribute('disabled');
    }
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
  var onSuccess = function (pindata) {
    // отчищает div перед отрисовкой
    window.pin.similarAdv.innerHTML = '';
    // создает фрагмент для вставки в шаблон
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window.compared.length; k++) { // !!!!!потом исправить
      fragment.appendChild(window.pin.createMapPin(pindata[k]));
    }
    window.pin.similarAdv.append(fragment);
    // находит пины на карте, кроме основной метки
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    // выводит переменную в глобальную область видимости
    window.mapPins = mapPins;
    // добавляет дата-атрибуты пинам
    for (var j = 0; j < window.compared.length; j++) { // !!!!!потом исправить
      mapPins[j].setAttribute('data-index', j);
    }
    // отслеживает на какой пин был клик
    onClickPin();
  };


  // отрисовывает карточку объявления
  var showOffer = function (dataindex) {
    // создает фрагмент с карточкой объявления для вставки в шаблон
    var cardFragment = document.createDocumentFragment();
    // создает карточку по индексу пина
    cardFragment.appendChild(window.card(window.compared[dataindex])); // !!!!!потом исправить
    window.pin.similarAdv.appendChild(cardFragment);
  };

  // проверяет отрисована ли карточка попап
  var isPopupRendered = function () {
    var cardPopup = map.querySelector('.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
  };

  // функция для однократной отрисовки карточки объявления
  var getRenderedCard = function (dataindex) {
    isPopupRendered();
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
    var addClickListener = function (mappin) {
      mapPin.addEventListener('click', function () {
        // удаляет класс map__pin--active при переключении на другую карточку
        getActivePin();
        // находит пин по дата атрибуту
        var cardIndex = mappin.getAttribute('data-index');
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

  // отправляет данные формы без перезагрузки страницы
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
    });
    evt.preventDefault();
  });

  // переводит страницу в неактивное состяние
  var resetMapAndForm = function () {
    isPopupRendered();
    form.reset();
    window.mapPins.forEach(function (item) {
      item.remove();
    });
    mainPin.style.top = '375px';
    mainPin.style.left = '570px';
    map.classList.add('map--faded');
    addressField.setAttribute('value', '602, 407');
    window.messages.success();
  };

  window.map = {
    form: form,
    mainPin: mainPin,
    INACTIVE_HALF_MAIN_PIN_SIZE: INACTIVE_HALF_MAIN_PIN_SIZE,
    addressField: addressField,
    resetMapAndForm: resetMapAndForm,
    onShowMapAndForm: onShowMapAndForm,
    map: map
  };
})();
