'use strict';

(function () {
  var createImg = function (element, arrData) {
    var blockPhoto = element.querySelector('.popup__photos'); // куда вставляем элементы img

    blockPhoto.innerHTML = '';

    for (var i = 0; i <= arrData.offer.photos.length - 1; i++) {
      var imgElement = document.createElement('img');
      imgElement.className = 'popup__photo';
      imgElement.style.width = 45 + 'px';
      imgElement.style.height = 40 + 'px';
      imgElement.alt = 'Фотография жилья';
      imgElement.src = arrData.offer.photos[i];
      blockPhoto.appendChild(imgElement);
    }
  };

  var createList = function (element, arrData) {
    var liElement = '';

    for (var i = 0; i < arrData.offer.features.length; i++) {
      liElement += '<li class="popup__feature popup__feature--' + arrData.offer.features[i] + '"></li>';
    }

    return liElement;
  };

  var onClosePopupClick = function () {
    window.map.closePopup();
  };

  var onClosePopupEnter = function (evt) {
    window.utils.isEscEvent(evt, window.map.closePopup);
  };

  var onResetBtnClick = function () {
    window.map.closePopup();
  };

  var onResetBtnEnter = function (evt) {
    window.utils.isEnterEvent(evt, window.map.closePopup);
  };

  // создаем элемент из шаблона и  заполняем его данными
  var renderNotice = function (arrData) {
    var noticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var noticeElement = noticeTemplate.cloneNode(true);

    noticeElement.querySelector('.popup__title').textContent = arrData.offer.title;
    noticeElement.querySelector('.popup__text--address').textContent = arrData.offer.address;
    noticeElement.querySelector('.popup__text--price').textContent = arrData.offer.price + '₽/ночь';
    noticeElement.querySelector('.popup__type').textContent = window.data.notice.TYPES_HOUSES[arrData.offer.type].ru;
    noticeElement.querySelector('.popup__text--capacity').textContent = arrData.offer.rooms + ' комнаты для ' + arrData.offer.guests;
    noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrData.offer.checkin + ', ' + 'выезд до ' + arrData.offer.checkout;
    noticeElement.querySelector('.popup__features').innerHTML = createList(noticeElement, arrData);
    noticeElement.querySelector('.popup__description').textContent = arrData.offer.description;
    noticeElement.querySelector('.popup__avatar').src = arrData.author.avatar;

    createImg(noticeElement, arrData);

    var closeBtn = noticeElement.querySelector('.popup__close');

    closeBtn.addEventListener('click', onClosePopupClick);
    closeBtn.addEventListener('keydown', onClosePopupEnter);
    window.form.resetBtn.addEventListener('click', onResetBtnClick);
    window.form.resetBtn.addEventListener('click', onResetBtnEnter);

    return noticeElement;
  };

  window.card = {
    render: renderNotice
  };
})();
