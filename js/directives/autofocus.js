

angular.module('fireideaz').directive('focus', $timeout => function (scope, element) {
  scope.$watch(
    'editing',
    () => {
      $timeout(() => {
        element[0].focus();
      }, 0, false);
    },
  );
});
