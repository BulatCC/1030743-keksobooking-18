'use strict';

(function () {
  // поле ввода количества комнат в разметке
  var roomNumber = window.map.form.querySelector('#room_number');

  // поле ввода количества гостей
  var guests = window.map.form.querySelector('#capacity');

  // ставит атрибут 'disabled' в поле выбора количества гостей
  var disableElement = function (value) {
    return guests[value].setAttribute('disabled', '');
  };

  // удаляет атрибут 'disabled' в поле выбора количества гостей
  var enableElement = function (value) {
    return guests[value].removeAttribute('disabled');
  };

  window.map.form.addEventListener('click', function () {
    // синхронизирует поле «Количество комнат» с полем «Количество мест»
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

  // <-------------------- 9. доверяй, но проверяй -------------------->

  // поле выбора типа жилья
  var placeType = window.map.form.querySelector('#type');

  // поле ввода цены
  var price = window.map.form.querySelector('#price');

  // записывает атрибуты в поле «Цена»
  var priceSet = function (pricenumber) {
    price.min = pricenumber;
    price.placeholder = pricenumber;
  };

  // синхронизирует поле «Тип жилья» с полем «Цена»
  window.map.form.addEventListener('click', function () {
    if (placeType.value === 'bungalo') {
      priceSet(0);
    } else if (placeType.value === 'flat') {
      priceSet(1000);
    } else if (placeType.value === 'house') {
      priceSet(5000);
    } else if (placeType.value === 'palace') {
      priceSet(10000);
    }
  });

  // поле заезда
  var timeIn = window.map.form.querySelector('#timein');

  // поле выезда
  var timeOut = window.map.form.querySelector('#timeout');

  // функция синхронизации время заезда и выезда
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
