'use strict';

(function () {
  var fileChooser = window.form.element.querySelector('.ad-form-header__input');
  var previewAvatar = window.form.element.querySelector('.ad-form-header__preview img');

  // инпут для фото аватарки
  var onChangeFileInput = function (input, img) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = fileName.match(/(gif|png|jpe?g)/);

    if (matches) {
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        img.src = fileReader.result;
      });
      fileReader.readAsDataURL(file);
    }
  };

  var photosHouse = window.form.element.querySelector('.ad-form__input');
  var previewHouse = window.form.element.querySelector('.ad-form__photo');
  var previewContainer = window.form.element.querySelector('.ad-form__photo-container');

  // инпут для фото жилья
  var onChangeFileInputHouse = function () {
    previewHouse.remove();
    var previewImg = document.createElement('img');
    previewImg.width = 70;
    previewImg.height = 70;
    var blockPreview = previewHouse.cloneNode();
    blockPreview.appendChild(previewImg);
    previewContainer.appendChild(blockPreview);
    onChangeFileInput(photosHouse, previewImg);
  };

  fileChooser.addEventListener('change', function () {
    onChangeFileInput(fileChooser, previewAvatar);
  });

  previewContainer.addEventListener('change', onChangeFileInputHouse);

  var sortImg = function () {
    var dragEl;

    var onDragOver = function (evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
      var target = evt.target;
      if (target.parentElement.className === 'ad-form__photo') {
        previewContainer.insertBefore(dragEl, target.parentElement);
      }
    };

    var onDragEnd = function (evt) {
      evt.preventDefault();
      previewContainer.removeEventListener('dragover', onDragOver);
      previewContainer.removeEventListener('dragend', onDragEnd);
    };

    previewContainer.addEventListener('dragstart', function (evt) {
      if (evt.target.tagName === 'IMG') {
        dragEl = evt.target.parentElement; // элемент который будем перемещать
        evt.dataTransfer.setData('Text', dragEl.textContent);
        evt.dataTransfer.effectAllowed = 'move';
        // Подписываемся на события при dnd
        previewContainer.addEventListener('dragover', onDragOver);
        previewContainer.addEventListener('dragend', onDragEnd);
      }
    });

  };

  sortImg();
})();
