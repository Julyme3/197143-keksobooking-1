'use strict';

(function () {
  var createImg = function (element, arrData) {
    var blockPhoto = element.querySelector('.popup__photos'); // куда вставляем элементы img

    blockPhoto.innerHTML = '';
    if (arrData.offer.photos.length) {
      for (var i = 0; i <= arrData.offer.photos.length - 1; i++) {
        var imgElement = document.createElement('img');
        imgElement.className = 'popup__photo';
        imgElement.style.width = 45 + 'px';
        imgElement.style.height = 40 + 'px';
        imgElement.alt = 'Фотография жилья';
        imgElement.src = arrData.offer.photos[i];
        blockPhoto.appendChild(imgElement);
      }
    } else {
      blockPhoto.remove();
    }

  };

  var createList = function (element, arrData) {
    var liElement = '';
    var ulList = element.querySelector('.popup__features');
    if (arrData.offer.features.length) {
      for (var i = 0; i < arrData.offer.features.length; i++) {
        liElement += '<li class="popup__feature popup__feature--' + arrData.offer.features[i] + '"></li>';
      }
    } else {
      ulList.remove();
    }
    return liElement;
  };

  var onClosePopupClick = function () {
    window.map.closePopup();
  };

  var onClosePopupEnter = function (evt) {
    window.utils.isEscEvent(evt, window.map.closePopup);
  };

  var setTextContent = function (obj) {
    for (var key in obj) {
      if (key) {
        obj.textContent = obj[key];
      } else {
        obj.remove();
      }
    }
  };

  // создаем элемент из шаблона и  заполняем его данными
  var renderNotice = function (arrData) {
    var noticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var noticeElement = noticeTemplate.cloneNode(true);
    var fieldContentMap = {
      'popup__title': arrData.offer.title,
      'popup__text--address': arrData.offer.address,
      'popup__text--price': arrData.offer.price + '₽/ночь',
      'popup__type': window.data.notice.TYPES_HOUSES[arrData.offer.type].ru,
      'popup__text--capacity': arrData.offer.rooms + ' комнаты для ' + arrData.offer.guests,
      'popup__text--time': 'Заезд после ' + arrData.offer.checkin + ', ' + 'выезд до ' + arrData.offer.checkout,
      'popup__description': arrData.offer.description
    };
    setTextContent(fieldContentMap);
    noticeElement.querySelector('.popup__features').innerHTML = createList(noticeElement, arrData);
    noticeElement.querySelector('.popup__avatar').src = arrData.author.avatar;

    createImg(noticeElement, arrData);

    var closeBtn = noticeElement.querySelector('.popup__close');
    closeBtn.addEventListener('click', onClosePopupClick);
    closeBtn.addEventListener('keydown', onClosePopupEnter);

    return noticeElement;
  };

  window.card = {
    render: renderNotice
  };
})();
