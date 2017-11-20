

angular.module('fireideaz').directive('dialogs', ['ImportExportService', function (importExportService) {
  return {
    restrict: 'E',
    templateUrl: 'components/dialogs.html',
    link($scope) {
      $scope.importExportService = importExportService;
    },
  };
}]);
