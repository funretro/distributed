angular.module('fireideaz').controller('MessageController', [
  '$scope',
  '$window',
  'FirebaseService',
  'ModalService',
  ($scope, $window, firebaseService, modalService) => {
    $scope.modalService = modalService;
    $scope.userId = $window.location.hash.substring(1);

    $scope.dropCardOnCard = (dragEl, dropEl) => {
      if (dragEl !== dropEl) {
        $scope.dragEl = dragEl;
        $scope.dropEl = dropEl;

        modalService.openMergeCards($scope);
      }
    };

    $scope.dropped = (dragEl, dropEl) => {
      const drag = $(`#${dragEl}`);
      const drop = $(`#${dropEl}`);
      const firstCardId = drag.attr('messageId');
      const secondCardId = drop.attr('messageId');
      const firstCardReference = firebaseService.getMessageRef(
        $scope.userId,
        firstCardId
      );
      const secondCardReference = firebaseService.getMessageRef(
        $scope.userId,
        secondCardId
      );

      secondCardReference.once('value', firstCard => {
        firstCardReference.once('value', secondCard => {
          secondCardReference.update({
            text: firstCard.val().text + '\n' + secondCard.val().text,
            votes: firstCard.val().votes + secondCard.val().votes,
          });

          mergeCardVotes(firstCardId, secondCardId);
          firstCardReference.remove();
          modalService.closeAll();
        });
      });
    };
  },
]);
