angular.module('fireideaz').directive('enterClick', () => ({
  restrict: 'A',
  link(scope, elem) {
    elem.bind('keydown', event => {
      if (event.keyCode === 13 && event.shiftKey) {
        event.preventDefault();
        $(elem[0])
          .find('button')
          .focus();
        $(elem[0])
          .find('button')
          .click();
      }
    });
  },
}));
