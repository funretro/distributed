

angular.module('fireideaz').directive('sidebar', ['ModalService', function (modalService) {
  return {
    templateUrl: 'components/sidebar.html',
    link($scope) {
      $scope.modalService = modalService;
    },
  };
}]);
