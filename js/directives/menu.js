angular.module('fireideaz').directive('menu', [
  'VoteService',
  voteService => ({
    templateUrl: 'components/menu.html',
    link($scope) {
      $scope.voteService = voteService;
    },
  }),
]);
