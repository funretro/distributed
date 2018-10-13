'use strict';

angular.module('fireideaz').directive('dialogs', [
  'ImportExportService',
  function(importExportService) {
    return {
      restrict: 'E',
      templateUrl: 'components/dialogs.html',
      link: function($scope) {
        $scope.importExportService = importExportService;
      },
    };
  },
]);
