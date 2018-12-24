'use strict';

(function () {
  var filterForm = window.data.map.querySelector('.map__filters');

  var PriceLimit = {
    LOW: 10000,
    HIGH: 50000
  };

  var updatePins = function (notices) {
    var filteredNotices = notices.slice();

    var selectsFilters = filterForm.querySelectorAll('select');
    var checkedCheckboxes = filterForm.querySelectorAll('input[type=checkbox]:checked');

    var filterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (select, property) {
      return filteredNotices.filter(function (item) {
        return item.offer[property].toString() === select.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredNotices.filter(function (item) {
        var priceFilterValues = {
          'middle': item.offer.price >= PriceLimit.LOW && item.offer.price <= PriceLimit.HIGH,
          'low': item.offer.price < PriceLimit.LOW,
          'high': item.offer.price >= PriceLimit.HIGH
        };
        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (checkbox) {
      return filteredNotices.filter(function (item) {
        return item.offer.features.indexOf(checkbox.value) >= 0;
      });
    };

    if (selectsFilters.length !== null) {
      [].forEach.call(selectsFilters, function (item) {
        if (item.value !== 'any') {
          filteredNotices = (item.id !== 'housing-price') ? filterByValue(item, filterRules[item.id]) : filterByPrice(item);
        }
      });
    }

    if (checkedCheckboxes !== null) {
      [].forEach.call(checkedCheckboxes, function (item) {
        filteredNotices = filterByFeatures(item);
      });
    }

    if (filteredNotices.length) {
      window.pins.render(filteredNotices);
    }
  };

  window.filters = {
    updatePins: function (notices) {
      updatePins(notices);
    },
    form: filterForm
  };
})();
