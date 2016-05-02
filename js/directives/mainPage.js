'use strict';

angular.module('fireideaz').directive('mainPage', [function() {
    return {
      restrict: 'E',
      templateUrl : 'components/mainPage.html',
      controller : 'MainCtrl'
    };
  }]
);
