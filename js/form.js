'use strict';

(function () {
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
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var inputCoordinate = function (offsetTop, pinX, pinY) {
    var currentX = pinX || window.data.mainPin.style.left;
    var currentY = pinY || window.data.mainPin.style.top;
    var positionX = Math.round(parseInt(currentX, 10) + window.data.pin.WIDTH / 2);
    var positionY = Math.round(parseInt(currentY, 10) + offsetTop);
    inputAddress.value = positionX + ', ' + positionY;
  };

  // поля Тип жилья - цена
  var onTypeHousesChange = function () {
    var currentValue = type.value;
    price.placeholder = window.data.notice.TYPES_HOUSES[currentValue].min;
  };

  var onRoomNumberChange = function () {

    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  };

  onRoomNumberChange(); // сразу прячем неподходящие options для Кол-ва гостей

  roomNumber.addEventListener('change', onRoomNumberChange);
  type.addEventListener('change', onTypeHousesChange);

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  // Кастомные сообщения об ошибке
  function CustomValidation() { }
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

      if (validity.rangeOverflow) {
        var max = input.max;
        this.addInvalidity('Максимальное значение — 1 000 000 ' + max + '.');
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
    var errors = document.querySelectorAll('.error-message'); // сообщения об ошибке
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
  };

  // var errorHandler = function () {
  //
  // };

  var onSubmitForm = function (evt) {
    evt.preventDefault();
    //debugger;
    window.backend.upload(new FormData(form), function (response) {
      debugger;
      console.log('done');
    });
    var isValid = true;
    removeErrorMsg();

    [].forEach.call(inputs, function (item) {
      item.style.boxShadow = 'none';

      if (item.checkValidity() === false) {
        isValid = false;
        item.style.boxShadow = '0 0 2px 2px #ff6547';
        var inputCustomValidation = new CustomValidation();
        inputCustomValidation.checkValidity(item);
        var customValidityMessage = inputCustomValidation.getInvalidities();
        item.setCustomValidity(customValidityMessage);

        var customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
        item.insertAdjacentHTML('afterEnd', '<p class="error-message" style="color: red;">' + customValidityMessageForHTML + '</p>');
      }
    });

    if (isValid) {
      form.submit();
      form.reset();
    }
  };

  var getdefaultStateSelectBox = function () {

    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        if (item.hidden) {
          item.hidden = false;
        }
      });
    }
  };

  var doHiddenElement = function (element, hiddenClass) {
    element.classList.add(hiddenClass);
  };

  var changeFieldsetStatus = function (state) {
    Array.from(fieldsets).forEach(function (item) {
      item.disabled = state;
    });
  };

  var getDefaultMapState = function () {
    doHiddenElement(window.data.map, 'map--faded');
    doHiddenElement(form, 'ad-form--disabled');
    changeFieldsetStatus(true);
    inputCoordinate(window.data.pin.HEIGHT / 2, window.data.pin.INITIAL_X, window.data.pin.INITIAL_Y);
    window.data.mainPin.style.left = window.data.pin.INITIAL_X + 'px';
    window.data.mainPin.style.top = window.data.pin.INITIAL_Y + 'px';
    window.data.mainPin.addEventListener('mouseup', window.dragNdrop.onMainPinMouseDownActivate);
  };
  var onClickReset = function (evt) {
    evt.preventDefault();
    form.reset();
    getDefaultMapState();
    var defaultType = type[type.selectedIndex].value;
    price.placeholder = window.data.notice.TYPES_HOUSES[defaultType].min;
    getdefaultStateSelectBox();
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
    resetBtn: resetBtn,
    getDefaultMapState: getDefaultMapState
  };
})();
