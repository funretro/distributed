angular.module('fireideaz').directive('mainPage', [
  'ModalService',
  modalService => ({
    restrict: 'E',
    templateUrl: 'components/mainPage.html',
    link($scope) {
      $scope.modalService = modalService;
    },
  }),
]);
