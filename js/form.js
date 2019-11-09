'use strict';

(function () {
  var BUNGALO_PRICE = 0;
  var FLAT_PRICE = 1000;
  var HOUSE_PRICE = 5000;
  var PALACE_PRICE = 10000;

  var roomNumber = window.map.form.querySelector('#room_number');
  var guests = window.map.form.querySelector('#capacity');
  var placeType = window.map.form.querySelector('#type');
  var price = window.map.form.querySelector('#price');
  var timeIn = window.map.form.querySelector('#timein');
  var timeOut = window.map.form.querySelector('#timeout');

  var disableElement = function (value) {
    return guests[value].setAttribute('disabled', '');
  };

  var enableElement = function (value) {
    return guests[value].removeAttribute('disabled');
  };

  window.map.form.addEventListener('click', function () {
    if (roomNumber.value === '1') {
      guests.value = 1;
      disableElement(0);
      disableElement(1);
      enableElement(2);
      disableElement(3);
    } else if (roomNumber.value === '2') {
      disableElement(0);
      enableElement(1);
      enableElement(2);
      disableElement(3);
    } else if (roomNumber.value === '3') {
      enableElement(0);
      enableElement(1);
      enableElement(2);
      disableElement(3);
    } else if (roomNumber.value === '100') {
      guests.value = 0;
      disableElement(0);
      disableElement(1);
      disableElement(2);
      enableElement(3);
    }

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

  var priceSet = function (pricenumber) {
    price.min = pricenumber;
    price.placeholder = pricenumber;
  };

  window.map.form.addEventListener('click', function () {
    if (placeType.value === 'bungalo') {
      priceSet(BUNGALO_PRICE);
    } else if (placeType.value === 'flat') {
      priceSet(FLAT_PRICE);
    } else if (placeType.value === 'house') {
      priceSet(HOUSE_PRICE);
    } else if (placeType.value === 'palace') {
      priceSet(PALACE_PRICE);
    }
  });

  var validateTimeInOut = function (listIn, listOut) {
    listOut.selectedIndex = listIn.selectedIndex;
  };

  timeIn.addEventListener('change', function () {
    validateTimeInOut(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    validateTimeInOut(timeOut, timeIn);
  });

})();
