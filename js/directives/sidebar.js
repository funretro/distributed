'use strict';

angular.module('fireideaz').directive('sidebar', [
  'ModalService',
  function(modalService) {
    return {
      templateUrl: 'components/sidebar.html',
      link: function($scope) {
        $scope.modalService = modalService;
      },
    };
  },
]);
