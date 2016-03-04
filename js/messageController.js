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

      $scope.droppedEvent = function(dragEl, dropEl) {
        if(dragEl !== dropEl) {
          $scope.dragEl = dragEl;
          $scope.dropEl = dropEl;

          utils.openDialogMergeCards($scope);
        }
      };

      $scope.dropped = function(dragEl, dropEl) {
        var drag = $('#' + dragEl);
        var drop = $('#' + dropEl);

        var dropMessageRef = firebaseService.getMessageRef($scope.userId, drop.attr('messageId'));
        var dragMessageRef = firebaseService.getMessageRef($scope.userId, drag.attr('messageId'));

        dropMessageRef.once('value', function(dropMessage) {
          dragMessageRef.once('value', function(dragMessage) {
            dropMessageRef.update({
              text: dropMessage.val().text + ' | ' + dragMessage.val().text
            });

            dragMessageRef.remove();
            utils.closeAll();
          });
        });
      };

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
