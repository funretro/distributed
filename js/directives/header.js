angular.module('fireideaz').directive('pageHeader', [
  'ModalService',
  modalService => ({
    templateUrl: 'components/header.html',
    link($scope) {
      $scope.modalService = modalService;
    },
  }),
]);
