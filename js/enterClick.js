'use strict';

angular
  .module('fireideaz')
  .directive('enterClick', function () {
    return {
      restrict: 'A',
      link: function (scope, elem) {
        elem.on('keydown', function (event) {
          var ENTER_KEY = 13;
          if (event.keyCode === ENTER_KEY && event.shiftKey) {
            event.preventDefault();
            var submitButton = $(elem[0]).find('[type="submit"]');
            submitButton.focus();
            submitButton.click();
          }
        });
      }
    };
  });
