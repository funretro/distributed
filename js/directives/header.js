

angular.module('fireideaz').directive('pageHeader', ['ModalService', function (modalService) {
  return {
    templateUrl: 'components/header.html',
    link($scope) {
      $scope.modalService = modalService;
    },
  };
}]);
