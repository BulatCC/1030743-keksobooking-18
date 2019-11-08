'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarUploadInput = document.querySelector('.ad-form-header__input');
  var avatarImg = document.querySelector('.ad-form-header__avatar');
  var housingUploadInput = document.querySelector('.ad-form__input');

  // див куда надо отрисовать фото помещения
  var housingImgContainer = document.querySelector('.ad-form__photo');

  // функция для загрузки картинки
  var onImgUploader = function (input, image) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  // загружает аватар
  avatarUploadInput.addEventListener('change', function () {
    onImgUploader(avatarUploadInput, avatarImg);
  });

  // загружает фото помещения
  housingUploadInput.addEventListener('change', function () {

    // создает тэг img для отрисовки вото помещения
    var housingImg = document.createElement('img');
    housingImg.classList.add('ad-form__photo-housing');
    housingImg.setAttribute('alt', 'фото помещения');
    housingImg.setAttribute('width', '100%');
    housingImg.setAttribute('height', '100%');
    housingImgContainer.append(housingImg);

    onImgUploader(housingUploadInput, housingImg);
  });

})();
