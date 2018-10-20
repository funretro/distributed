angular.module('fireideaz').controller('MessageController', [
  '$scope',
  '$window',
  'FirebaseService',
  'ModalService',
  'VoteService',
  ($scope, $window, FirebaseService, ModalService, VoteService) => {
    $scope.modalService = ModalService;
    $scope.userId = $window.location.hash.substring(1);

    const mergeCardVotes = (first, second) => {
      VoteService.mergeMessages($scope.userId, first, second);
    };

    $scope.dropCardOnCard = (dragEl, dropEl) => {
      if (dragEl !== dropEl) {
        $scope.dragEl = dragEl;
        $scope.dropEl = dropEl;

        ModalService.openMergeCards($scope);
      }
    };

    $scope.dropped = (dragEl, dropEl) => {
      const drag = $(`#${dragEl}`);
      const drop = $(`#${dropEl}`);
      const firstCardId = drag.attr('messageId');
      const secondCardId = drop.attr('messageId');
      const firstCardReference = FirebaseService.getMessageRef(
        $scope.userId,
        firstCardId
      );
      const secondCardReference = FirebaseService.getMessageRef(
        $scope.userId,
        secondCardId
      );

      secondCardReference.once('value', firstCard => {
        firstCardReference.once('value', secondCard => {
          const text = `${firstCard.val().text}\n${secondCard.val().text}`;
          secondCardReference.update({
            text,
            votes: firstCard.val().votes + secondCard.val().votes,
          });

          mergeCardVotes(firstCardId, secondCardId);
          firstCardReference.remove();
          ModalService.closeAll();
        });
      });
    };
  },
]);
