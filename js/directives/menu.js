

angular.module('fireideaz').directive('menu', ['VoteService', function (voteService) {
  return {
    templateUrl: 'components/menu.html',
    link($scope) {
      $scope.voteService = voteService;
    },
  };
}]);
