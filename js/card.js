'use strict';

 (function () {
// находит шаблон карточки объявления в теге template
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// создает шаблон карточки объявления для карты
window.card = function (card) {
  // клонирует шаблон
  var cardElement = cardTemplate.cloneNode(true);
  // заполняет карточку объявления данными
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = placeType[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  // удаляетт дочерние элементы у блока popup__features
  var features = cardElement.querySelector('.popup__features');
  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }

  // добавляет опции кондиционер лифт вайфай и т.д.
  for (var k = 0; k < card.offer.features.length; k++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + card.offer.features[k]);
    features.append(li);
  }

  // удалаяет дочерний элемент у блока popup__description
  var photos = cardElement.querySelector('.popup__photos');
  var photo = cardElement.querySelector('.popup__photo');
  photos.removeChild(photo);

  // добавляет фото помещения
  for (var j = 0; j < card.offer.photos.length; j++) {
    var image = document.createElement('img');
    image.classList.add('popup__photo');
    image.setAttribute('width', '45');
    image.setAttribute('height', '45');
    image.setAttribute('alt', 'Фотография жилья');
    image.setAttribute('src', card.offer.photos[j]);
    photos.append(image);
  }
  return cardElement;
};

var placeType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
})();
