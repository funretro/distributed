angular.module('fireideaz').directive('focus', $timeout => (scope, element) => {
  scope.$watch('editing', () => {
    $timeout(
      () => {
        element[0].focus();
      },
      0,
      false
    );
  });
});
