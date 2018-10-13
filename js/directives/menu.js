'use strict';

angular.module('fireideaz').directive('menu', [
  'VoteService',
  function(voteService) {
    return {
      templateUrl: 'components/menu.html',
      link: function($scope) {
        $scope.voteService = voteService;
      },
    };
  },
]);
