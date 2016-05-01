'use strict';

angular.module('fireideaz').directive('pageFooter', [function() {
    return {
      templateUrl : 'components/footer.html',
      controller : 'MainCtrl'
    };
  }]
);
