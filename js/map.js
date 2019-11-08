'use strict';

(function () {
  var INACTIVE_HALF_MAIN_PIN_SIZE = 32;
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var filters = map.querySelectorAll('.map__filter');
  var filterCheckboxes = map.querySelectorAll('.map__checkbox');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinCoordinates = mainPin.getAttribute('style');
  var addressField = document.querySelector('#address');
  var addressFormCoordinates = mainPinCoordinates.match(/\d+/g);
  var formResetButton = form.querySelector('.ad-form__reset');
  var mapFilters = map.querySelectorAll('.map__filter');

  var getCoordinatesPin = function (pin) {
    return [+addressFormCoordinates[0] + INACTIVE_HALF_MAIN_PIN_SIZE, +addressFormCoordinates[1] + pin].join(', ');
  };

  addressField.setAttribute('value', getCoordinatesPin(INACTIVE_HALF_MAIN_PIN_SIZE));

  var fieldsetsDisabler = function () {
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
    filters.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
    filterCheckboxes.forEach(function (item) {
      item.checked = false;
    });
  };
  fieldsetsDisabler();

  var onShowMapAndForm = function () {
    window.filter.comparing(window.serverData);
    onSuccess(window.compared);
    map.classList.remove('map--faded');
    addressField.setAttribute('placeholder', getCoordinatesPin(window.utils.PIN_HEIGHT));
    form.classList.remove('ad-form--disabled');
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].removeAttribute('disabled');
    }
    filters.forEach(function (item) {
      item.removeAttribute('disabled', '');
    });
    mainPin.removeEventListener('mousedown', onShowMapAndForm);
    formResetButton.addEventListener('click', resetMapAndForm);
    window.filter.filterFeatures.addEventListener('keydown', window.filter.onEnterCheckboxPress);
  };

  mainPin.addEventListener('mousedown', onShowMapAndForm);

  mainPin.addEventListener('keydown', function () {
    if (window.utils.isEnterPressed) {
      onShowMapAndForm();
    }
  });

  var onSuccess = function (pindata) {
    window.pin.similarAdv.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < window.compared.length; k++) {
      fragment.appendChild(window.pin.createMapPin(pindata[k]));
    }
    window.pin.similarAdv.append(fragment);
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.mapPins = mapPins;
    for (var j = 0; j < window.compared.length; j++) {
      mapPins[j].setAttribute('data-index', j);
    }
    onClickPin();
  };

  var showOffer = function (dataindex) {
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(window.card(window.compared[dataindex]));
    window.pin.similarAdv.appendChild(cardFragment);
  };

  var isPopupRendered = function () {
    var cardPopup = map.querySelector('.popup');
    if (cardPopup) {
      cardPopup.remove();
    }
  };

  var getRenderedCard = function (dataindex) {
    isPopupRendered();
    showOffer(dataindex);
  };

  var getActivePin = function () {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var cardAndActiveClassRemove = function () {
    map.querySelector('.map__card').classList.add('hidden');
    map.querySelector('.map__pin--active').classList.remove('map__pin--active');
  };

  var onClickPin = function () {
    window.mapPins.forEach(function (mappin) {
      mappin.addEventListener('click', function () {
        getActivePin();
        var cardIndex = mappin.getAttribute('data-index');
        mappin.classList.add('map__pin--active');
        getRenderedCard(cardIndex);
        document.addEventListener('keydown', onEscClosePopup);
        var closePopup = map.querySelector('.popup__close');
        closePopup.addEventListener('click', onClickClosePopup);
      });
    });

    var onEscClosePopup = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        cardAndActiveClassRemove();
      }
    };

    var onClickClosePopup = function () {
      cardAndActiveClassRemove();
    };
  };

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
    });
    evt.preventDefault();
  });

  var resetMapAndForm = function () {
    isPopupRendered();
    form.reset();
    window.mapPins.forEach(function (item) {
      item.remove();
    });
    mainPin.style.top = '375px';
    mainPin.style.left = '570px';
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    addressField.setAttribute('value', '602, 407');
    fieldsetsDisabler();
    window.messages.success();
    mainPin.addEventListener('mousedown', onShowMapAndForm);
    formResetButton.removeEventListener('click', resetMapAndForm);
    window.filter.filterFeatures.removeEventListener('keydown', window.filter.onEnterCheckboxPress);
    form.querySelector('.ad-form-header__avatar').setAttribute('src', 'img/muffin-grey.svg');
    mapFilters.forEach(function (item) {
      item.value = 'any';
    });
    if (form.querySelector('.ad-form__photo-housing')) {
      form.querySelector('.ad-form__photo-housing').remove();
    }
  };


  window.map = {
    form: form,
    mainPin: mainPin,
    INACTIVE_HALF_MAIN_PIN_SIZE: INACTIVE_HALF_MAIN_PIN_SIZE,
    addressField: addressField,
    resetMapAndForm: resetMapAndForm,
    onShowMapAndForm: onShowMapAndForm,
    map: map,
    onSuccess: onSuccess,
    filterCheckboxes: filterCheckboxes
  };
})();
