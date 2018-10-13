angular.module('fireideaz').directive('dialogs', [
  'ImportExportService',
  importExportService => ({
    restrict: 'E',
    templateUrl: 'components/dialogs.html',
    link($scope) {
      $scope.importExportService = importExportService;
    },
  }),
]);
