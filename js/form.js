'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  var RoomsCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var form = document.querySelector('.ad-form');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var inputs = form.querySelectorAll('input');
  var submit = form.querySelector('.ad-form__submit');
  var resetBtn = form.querySelector('.ad-form__reset');
  var inputAddress = form.querySelector('#address');
  var fieldsets = form.querySelectorAll('fieldset');

  var inputCoordinate = function (offsetTop, pinX, pinY) {
    var currentX = pinX || window.data.mainPin.style.left;
    var currentY = pinY || window.data.mainPin.style.top;
    var positionX = Math.round(parseInt(currentX, 10) + window.data.pin.WIDTH / 2);
    var positionY = Math.round(parseInt(currentY, 10) + offsetTop);
    inputAddress.value = positionX + ', ' + positionY;
  };

  var onTypeHousesChange = function () {
    var currentValue = type.value;
    price.placeholder = window.data.notice.TYPES_HOUSES[currentValue].min;
    price.min = window.data.notice.TYPES_HOUSES[currentValue].min;
  };

  var onRoomNumberChange = function () {

    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (RoomsCapacity[roomNumber.value][0] === item.value);
        item.hidden = !(RoomsCapacity[roomNumber.value].indexOf(item.value) >= 0);
      });
    }
  };
  onTypeHousesChange();
  onRoomNumberChange();

  roomNumber.addEventListener('change', onRoomNumberChange);
  type.addEventListener('change', onTypeHousesChange);

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var CustomValidation = function () { };
  CustomValidation.prototype = {

    invalidities: [],

    checkValidity: function (input) {
      var validity = input.validity;

      if (validity.tooLong) {
        this.addInvalidity('Максимальная длина — 100 символов.');
      }

      if (validity.tooShort) {
        this.addInvalidity('Минимальная длина — 30 символов.');
      }

      if (validity.rangeUnderflow) {
        var min = input.min;
        this.addInvalidity('Минимальное значение — ' + min + ' руб.');
      }

      if (validity.rangeOverflow) {
        var max = input.max;
        this.addInvalidity('Максимальное значение — ' + max + ' руб.');
      }

      if (validity.valueMissing) {
        this.addInvalidity('Это поле обязательно для заполнения.');
      }
    },

    addInvalidity: function (message) {
      this.invalidities = [];
      this.invalidities.push(message);
    },

    getInvalidities: function () {
      return this.invalidities.join('. \n');
    },

    getInvaliditiesForHTML: function () {
      return this.invalidities.join('. <br>');
    }
  };

  var removeErrorMsg = function () {
    var errors = document.querySelectorAll('.error-message');
    if (errors) {
      [].forEach.call(errors, function (error) {
        error.remove();
      });
    }

    [].forEach.call(inputs, function (item) {
      item.style.boxShadow = 'none';
    });
  };

  var successHandler = function () {
    var successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMsgElement = successMsgTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMsgElement);
    window.map.getDefaultMapState();

    var removeSuccessMsg = function () {
      successMsgElement.remove();
    };

    document.addEventListener('click', function () {
      removeSuccessMsg();
    });

    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, removeSuccessMsg);
    });
  };

  var onSubmitForm = function (evt) {
    evt.preventDefault();
    var isValid = true;
    removeErrorMsg();

    [].forEach.call(inputs, function (item) {
      item.style.boxShadow = 'none';
      if (item.checkValidity() === false) {
        isValid = false;
        item.style.boxShadow = '0 0 2px 2px #ff6547';
        var inputCustomValidation = new CustomValidation();
        inputCustomValidation.checkValidity(item);
        var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
        item.insertAdjacentHTML('afterEnd', '<p class="error-message" style="color: red;">' + customValidityMessageForHTML + '</p>');
      }
    });

    if (isValid) {
      window.backend.sendServerRequest(URL, 'POST', successHandler, window.utils.errorHandler, new FormData(form));
      form.reset();
    }
  };

  var getDefaultStateSelectBox = function () {

    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        if (item.hidden) {
          item.hidden = false;
        }
      });
    }
  };

  var changeFieldsetStatus = function (state) {
    [].forEach.call(fieldsets, function (item) {
      item.disabled = state;
    });
  };

  var onClickReset = function (evt) {
    evt.preventDefault();
    form.reset();
    window.map.getDefaultMapState();
    var defaultType = type[type.selectedIndex].value;
    price.placeholder = window.data.notice.TYPES_HOUSES[defaultType].min;
    getDefaultStateSelectBox();
    removeErrorMsg();
  };

  resetBtn.addEventListener('click', onClickReset);
  submit.addEventListener('click', onSubmitForm);

  form.addEventListener('input', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      evt.target.style.boxShadow = 'none';
    }
  });

  inputCoordinate(window.data.pin.HEIGHT / 2);

  window.form = {
    inputCoordinate: inputCoordinate,
    changeFieldsetStatus: changeFieldsetStatus,
    resetBtn: resetBtn
  };
})();
