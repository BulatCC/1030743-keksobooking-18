'use strict';

(function () {
// загружает данные с сервера
  window.load();
  var MAX_PIN_NUMBER = 5;

  // находит расположение фильтров в разметке
  var filters = window.map.map.querySelector('.map__filters');
  var filterPlaceType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRoomsQuantity = filters.querySelector('#housing-rooms');
  var filterGuestsQuantity = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');

  // значение цен
  var PriceValue = {
    LOW: 'low',
    MID: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  // чекбоксы реагируют на нажатие enter
  var onEnterCheckboxPress = function (arr) {
    arr.forEach(function (item) {
      item.addEventListener('keyup', function (evt) {
        if (evt.keyCode === window.utils.ENTER_KEYCODE) {
          event.preventDefault();
          item.click();
        }
      });
    });
  };

  onEnterCheckboxPress(window.map.filterCheckboxes);


  // устранения "дребезга"
  var onFilterChange = window.debounce(function () {
    comparing(window.serverData);
    window.map.onSuccess(window.compared);
  });

  // обработчик событий реагирующие на изменеия параметров фильтра
  filters.addEventListener('change', onFilterChange);

  // функция для фильтрации по типу жилья
  var placeFiltration = function (item) {
    if (filterPlaceType.value === 'any') {
      return true;
    } else {
      return filterPlaceType.value === item.offer.type;
    }
  };

  // функция для фильтрации по цене
  var priceFiltration = function (item) {
    if (filterPrice.value === 'any') {
      return true;
    } else if (filterPrice.value === PriceValue.LOW) {
      return item.offer.price < PriceValue.MIN;
    } else if (filterPrice.value === PriceValue.MID) {
      return item.offer.price >= PriceValue.MIN && item.offer.price <= PriceValue.MAX;
    } else {
      return item.offer.price > PriceValue.MAX;
    }
  };

  // функция для фильтрации по количеству комнат
  var roomsFiltration = function (item) {
    if (filterRoomsQuantity.value === 'any') {
      return true;
    } else {
      return +filterRoomsQuantity.value === item.offer.rooms;
    }
  };

  // функция для фильтрации по количеству гостей
  var guestsFiltration = function (item) {
    if (filterGuestsQuantity.value === 'any') {
      return true;
    } else {
      return +filterGuestsQuantity.value === item.offer.guests;
    }
  };

  // функция для фильтрации по фичам
  var featuresFiltration = function (item) {
    return Array.from(filterFeatures.querySelectorAll(':checked'))
      .filter(function (feature) {
        return feature.value;
      })
      .map(function (feature) {
        return feature.value;
      })
      .every(function (feature) {
        return item.offer.features.includes(feature);
      });
  };


  // фильтрует данные для отрисовки
  var comparing = function (data) {
    window.compared = data.filter(function (item) {
      return (
        placeFiltration(item)
        && roomsFiltration(item)
        && priceFiltration(item)
        && guestsFiltration(item)
        && featuresFiltration(item)
      );
    }).slice(0, MAX_PIN_NUMBER);
  };

  window.filter = {
    comparing: comparing,
    onEnterCheckboxPress: onEnterCheckboxPress
  };
})();
