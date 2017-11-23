

angular.module('fireideaz').directive('mainPage', ['ModalService', function (modalService) {
  return {
    restrict: 'E',
    templateUrl: 'components/mainPage.html',
    link($scope) {
      $scope.modalService = modalService;
    },
  };
}]);
