

angular
  .module('fireideaz')
  .controller('MessageCtrl', ['$scope', '$filter',
    '$window', 'Auth', '$rootScope', 'FirebaseService', 'ModalService', 'VoteService',
    function ($scope, $filter, $window, auth, $rootScope, firebaseService, modalService, voteService) {
      $scope.modalService = modalService;
      $scope.userId = $window.location.hash.substring(1);

      $scope.dropCardOnCard = function (dragEl, dropEl) {
        if (dragEl !== dropEl) {
          $scope.dragEl = dragEl;
          $scope.dropEl = dropEl;

          modalService.openMergeCards($scope);
        }
      };

      $scope.dropped = function (dragEl, dropEl) {
        const drag = $(`#${dragEl}`);
        const drop = $(`#${dropEl}`);

        const dropMessageRef = firebaseService.getMessageRef($scope.userId, drop.attr('messageId'));
        const dragMessageRef = firebaseService.getMessageRef($scope.userId, drag.attr('messageId'));

        dropMessageRef.once('value', (dropMessage) => {
          dragMessageRef.once('value', (dragMessage) => {
            dropMessageRef.update({
              text: `${dropMessage.val().text}\n${dragMessage.val().text}`,
              votes: dropMessage.val().votes + dragMessage.val().votes,
            });

            voteService.mergeMessages($scope.userId, drag.attr('messageId'), drop.attr('messageId'));

            dragMessageRef.remove();
            modalService.closeAll();
          });
        });
      };
    }]);
