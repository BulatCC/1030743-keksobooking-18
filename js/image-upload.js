'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarUploadInput = document.querySelector('.ad-form-header__input');
  var avatarImg = document.querySelector('.ad-form-header__avatar');
  var housingUploadInput = document.querySelector('.ad-form__input');
  var housingImgContainer = document.querySelector('.ad-form__photo');

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

  avatarUploadInput.addEventListener('change', function () {
    onImgUploader(avatarUploadInput, avatarImg);
  });

  housingUploadInput.addEventListener('change', function () {
    var housingImg = document.createElement('img');
    housingImg.classList.add('ad-form__photo-housing');
    housingImg.setAttribute('alt', 'фото помещения');
    housingImg.setAttribute('width', '100%');
    housingImg.setAttribute('height', '100%');
    housingImgContainer.append(housingImg);

    onImgUploader(housingUploadInput, housingImg);
  });

})();
