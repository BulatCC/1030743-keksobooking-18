'use strict';

(function () {
  window.load();
  var MAX_PIN_NUMBER = 5;

  var filters = window.map.map.querySelector('.map__filters');
  var filterPlaceType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRoomsQuantity = filters.querySelector('#housing-rooms');
  var filterGuestsQuantity = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');

  var PriceValue = {
    LOW: 'low',
    MID: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var onEnterCheckboxPress = function (evt) {
    if (evt.target.classList.contains('map__checkbox') && evt.keyCode === window.utils.ENTER_KEYCODE) {
      evt.target.click();
    }
  };

  var onFilterChange = window.debounce(function () {
    comparing(window.serverData);
    window.map.onSuccess(window.compared);
  });

  filters.addEventListener('change', onFilterChange);

  var placeFiltration = function (item) {
    if (filterPlaceType.value === 'any') {
      return true;
    }
      return filterPlaceType.value === item.offer.type;
  };

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

  var roomsFiltration = function (item) {
    if (filterRoomsQuantity.value === 'any') {
      return true;
    }
      return +filterRoomsQuantity.value === item.offer.rooms;
  };

  var guestsFiltration = function (item) {
    if (filterGuestsQuantity.value === 'any') {
      return true;
    }
      return +filterGuestsQuantity.value === item.offer.guests;
  };

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
    filterFeatures: filterFeatures,
    onEnterCheckboxPress: onEnterCheckboxPress
  };
})();
