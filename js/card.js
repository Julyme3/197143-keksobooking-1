'use strict';

(function () {
  var createImg = function (element, arrData) {
    var blockPhoto = element.querySelector('.popup__photos');

    blockPhoto.innerHTML = '';
    if (arrData.offer.photos.length) {
      arrData.offer.photos.forEach(function (i) {
        var imgElement = document.createElement('img');
        imgElement.className = 'popup__photo';
        imgElement.style.width = 45 + 'px';
        imgElement.style.height = 40 + 'px';
        imgElement.alt = 'Фотография жилья';
        imgElement.src = i;
        blockPhoto.appendChild(imgElement);
      });
    } else {
      window.utils.removeElement(blockPhoto);
    }

  };

  var createList = function (element, arrData) {
    var liElement = '';
    var ulList = element.querySelector('.popup__features');
    if (arrData.offer.features.length) {
      arrData.offer.features.forEach(function (i) {
        liElement += '<li class="popup__feature popup__feature--' + i + '"></li>';
      });
    } else {
      window.utils.removeElement(ulList);
    }
    return liElement;
  };

  var onClosePopupClick = function () {
    window.map.closePopup();
  };

  var onClosePopupEnter = function (evt) {
    window.utils.isEscEvent(evt, window.map.closePopup);
  };

  var setTextContent = function (obj, element) {
    for (var key in obj) {
      if (key) {
        element.querySelector(key).textContent = obj[key];
      } else {
        obj.remove();
      }
    }
  };

  var renderNotice = function (arrData) {
    var noticeTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var noticeElement = noticeTemplate.cloneNode(true);
    var popupFeatures = noticeElement.querySelector('.popup__features');
    var fieldContentMap = {
      '.popup__title': arrData.offer.title,
      '.popup__text--address': arrData.offer.address,
      '.popup__text--price': arrData.offer.price + '₽/ночь',
      '.popup__type': window.data.notice.TYPES_HOUSES[arrData.offer.type].ru,
      '.popup__text--capacity': arrData.offer.rooms + ' комнаты для ' + arrData.offer.guests,
      '.popup__text--time': 'Заезд после ' + arrData.offer.checkin + ', ' + 'выезд до ' + arrData.offer.checkout,
      '.popup__description': arrData.offer.description
    };
    setTextContent(fieldContentMap, noticeElement);
    popupFeatures.innerHTML = '';
    popupFeatures.insertAdjacentHTML('beforeend', createList(noticeElement, arrData));
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
