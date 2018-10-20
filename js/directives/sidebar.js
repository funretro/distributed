angular.module('fireideaz').directive('sidebar', [
  'ModalService',
  modalService => ({
    templateUrl: 'components/sidebar.html',
    link($scope) {
      $scope.modalService = modalService;
    },
  }),
]);
