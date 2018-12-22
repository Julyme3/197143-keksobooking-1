'use strict';

(function () {
  var filterForm = window.data.map.querySelector('.map__filters');

  var priceLimit = {
    'low': 10000,
    'high': 50000
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
          'middle': item.offer.price >= priceLimit.low && item.offer.price <= priceLimit.high,
          'low': item.offer.price < priceLimit.low,
          'high': item.offer.price >= priceLimit.high
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
      selectsFilters.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            filteredNotices = filterByValue(item, filterRules[item.id]);
          } else {
            filteredNotices = filterByPrice(item);
          }
        }
      });
    }

    if (checkedCheckboxes !== null) {
      checkedCheckboxes.forEach(function (item) {
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
