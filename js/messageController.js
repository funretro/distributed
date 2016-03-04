angular
  .module('fireideaz')
  .controller('MessageCtrl', ['$scope', '$filter', '$window', 'Utils', 'Auth', '$rootScope', 'FirebaseService',
    function($scope, $filter, $window, utils, auth, $rootScope, firebaseService) {
      $scope.utils = utils;
      $scope.userId = $window.location.hash.substring(1);

      function getMessages(userData) {
        $scope.userId = $window.location.hash.substring(1) || '499sm';
        var messagesRef = firebaseService.getMessagesRef($scope.userId);
        $scope.userUid = userData.uid;
        $scope.messages = firebaseService.newFirebaseArray(messagesRef);
      }

      if($scope.userId) {
        var messagesRef = firebaseService.getMessagesRef($scope.userId);
        auth.logUser($scope.userId, getMessages);
      }

      $scope.toggleVote = function(key, votes) {
        if(!localStorage.getItem(key)) {
          messagesRef.child(key).update({ votes: votes + 1, date: firebaseService.getServerTimestamp() });
          localStorage.setItem(key, 1);
         } else {
           messagesRef.child(key).update({ votes: votes - 1, date: firebaseService.getServerTimestamp() });
           localStorage.removeItem(key);
         }
      };
    }]
  );
