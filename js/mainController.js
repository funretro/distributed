angular
  .module('fireideaz')

  .controller('MainController', [
    '$scope',
    '$location',
    '$window',
    'Utils',
    'Auth',
    '$rootScope',
    'FirebaseService',
    'ModalService',
    'FEATURES',
    '$timeout',
    (
      $scope,
      $location,
      $window,
      utils,
      auth,
      $rootScope,
      firebaseService,
      modalService,
      FEATURES,
      $timeout
    ) => {
      $scope.loading = true;
      $scope.messageTypes = utils.messageTypes;
      $scope.utils = utils;
      $scope.newBoard = {
        name: '',
        text_editing_is_private: true,
      };
      $scope.features = FEATURES;
      $scope.userId = $window.location.hash.substring(1) || '';
      $scope.searchParams = {};
      $location
        .search()
        .substr(1)
        .split('&')
        .forEach(pair => {
          const keyValue = pair.split('=');
          const searchParam = keyValue[0];

          /* eslint-disable prefer-destructuring */
          $scope.searchParams[searchParam] = keyValue[1];
        });
      $scope.sortField = $scope.searchParams.sort || 'date_created';
      $scope.selectedType = 1;
      $scope.import = {
        data: [],
        mapping: [],
      };

      $scope.droppedEvent = (dragEl, dropEl) => {
        const drag = $(`#${dragEl}`);
        const drop = $(`#${dropEl}`);
        const dragMessageRef = firebaseService.getMessageRef(
          $scope.userId,
          drag.attr('messageId')
        );

        dragMessageRef.once('value', () => {
          dragMessageRef.update({
            type: {
              id: drop.data('column-id'),
            },
          });
        });
      };

      const getBoardAndMessages = userData => {
        $scope.userId = $location.hash().substring(1) || '499sm';

        const messagesRef = firebaseService.getMessagesRef($scope.userId);
        const boardRef = firebaseService.getBoardRef($scope.userId);

        $scope.boardObject = firebaseService.getBoardObjectRef($scope.userId);

        boardRef.on('value', boardData => {
          if (boardData.val() === null) {
            $location.hash('');
            $location.reload();
          }

          $scope.board = boardData.val();
          $scope.maxVotes = boardData.val().max_votes
            ? boardData.val().max_votes
            : 6;
          /* eslint-disable no-param-reassign */
          $rootScope.boardId = boardData.val().boardId;
          /* eslint-disable no-param-reassign */
          $rootScope.boardContext = boardData.val().boardContext;
          $scope.boardId = { $rootScope };
          $scope.boardContext = { $rootScope };
          $scope.loading = false;
          $scope.hideVote = boardData.val().hide_vote;
          $timeout(() => {
            /* eslint-disable no-new */
            new EmojiPicker();
          }, 100);
        });

        $scope.boardRef = boardRef;
        $scope.messagesRef = messagesRef;
        $scope.userUid = userData.uid;
        $scope.messages = firebaseService.newFirebaseArray(messagesRef);
      };

      if ($scope.userId !== '') {
        auth.logUser($scope.userId, getBoardAndMessages);
      } else {
        $scope.loading = false;
      }

      $scope.isColumnSelected = type =>
        parseInt($scope.selectedType, 0) === parseInt(type, 0);

      $scope.isCensored = (message, privateWritingOn) =>
        message.creating && privateWritingOn;

      $scope.updatePrivateWritingToggle = privateWritingOn => {
        $scope.boardRef.update({
          text_editing_is_private: privateWritingOn,
        });
      };

      $scope.updateEditingMessage = (message, value) => {
        const updatedMessage = {
          ...message,
          ...{ creating: value },
        };
        $scope.messages.$save(updatedMessage);
      };

      $scope.saveMessage = message => {
        const messageSaved = {
          ...message,
          ...{ creating: false },
        };
        $scope.messages.$save(messageSaved);
      };

      $scope.getSortFields = () =>
        $scope.sortField === 'votes'
          ? ['-votes', 'date_created']
          : 'date_created';
      const redirectToBoard = () => {
        $location.href(
          `${$location.location.origin + $location.pathname()}#${$scope.userId}`
        );
      };

      $scope.isBoardNameInvalid = () => !$scope.newBoard.name;

      $scope.isMaxVotesValid = () =>
        Number.isInteger($scope.newBoard.max_votes);

      $scope.createNewBoard = () => {
        $scope.loading = true;
        modalService.closeAll();
        $scope.userId = utils.createUserId();

        const callback = userData => {
          const board = firebaseService.getBoardRef($scope.userId);
          board.set(
            {
              boardId: $scope.newBoard.name,
              date_created: new Date().toString(),
              columns: $scope.messageTypes,
              user_id: userData.uid,
              max_votes: $scope.newBoard.max_votes || 6,
              text_editing_is_private: $scope.newBoard.text_editing_is_private,
            },
            error => {
              if (error) {
                $scope.loading = false;
              } else {
                redirectToBoard();
              }
            }
          );

          $scope.newBoard.name = '';
        };

        auth.createUserAndLog($scope.userId, callback);
      };

      $scope.changeBoardContext = () => {
        $scope.boardRef.update({
          boardContext: $scope.boardContext,
        });
      };

      $scope.changeBoardName = newBoardName => {
        $scope.boardRef.update({
          boardId: newBoardName,
        });

        modalService.closeAll();
      };

      $scope.updateSortOrder = () => {
        const updatedFilter = `${$location.origin() +
          $location.pathname()}?sort=${$scope.sortField}${$location.hash()}`;
        $window.history.pushState({ path: updatedFilter }, '', updatedFilter);
      };

      $scope.addNewColumn = name => {
        if (typeof name === 'undefined' || name === '') {
          return;
        }

        $scope.board.columns.push({
          value: name,
          id: utils.getNextId($scope.board),
        });

        const boardColumns = firebaseService.getBoardColumns($scope.userId);
        boardColumns.set(utils.toObject($scope.board.columns));

        modalService.closeAll();
      };

      $scope.changeColumnName = (id, newName) => {
        if (typeof newName === 'undefined' || newName === '') {
          return;
        }

        $scope.board.columns.forEach(({ id: columnId }, index) => {
          if (columnId === id) {
            $scope.board.columns[index].value = newName;
          }
        });

        const boardColumns = firebaseService.getBoardColumns($scope.userId);
        boardColumns.set(utils.toObject($scope.board.columns));

        modalService.closeAll();
      };

      $scope.deleteColumn = column => {
        $scope.board.columns = $scope.board.columns.filter(
          _column => _column.id !== column.id
        );

        const boardColumns = firebaseService.getBoardColumns($scope.userId);
        boardColumns.set(utils.toObject($scope.board.columns));
        modalService.closeAll();
      };

      $scope.deleteMessage = message => {
        $scope.messages.$remove(message);

        modalService.closeAll();
      };

      const addMessageCallback = message => {
        const id = message.key;
        angular.element($(`#${id}`)).scope().isEditing = true;
        /* eslint-disable no-new */
        new EmojiPicker();
        $(`#${id}`)
          .find('textarea')
          .focus();
      };

      $scope.addNewMessage = type => {
        $scope.messages
          .$add({
            text: '',
            creating: true,
            user_id: $scope.userUid,
            type: {
              id: type.id,
            },
            date: firebaseService.getServerTimestamp(),
            date_created: firebaseService.getServerTimestamp(),
            votes: 0,
          })
          .then(addMessageCallback);
      };

      $scope.deleteCards = () => {
        $($scope.messages).each((index, message) => {
          $scope.messages.$remove(message);
        });

        modalService.closeAll();
      };

      $scope.deleteBoard = () => {
        $scope.deleteCards();
        $scope.boardRef.ref.remove();

        modalService.closeAll();
        $location.hash('');
        $location.reload();
      };

      $scope.submitOnEnter = (event, method, data) => {
        if (event.keyCode === 13) {
          switch (method) {
            case 'createNewBoard':
              if (!$scope.isBoardNameInvalid()) {
                $scope.createNewBoard();
              }

              break;
            case 'addNewColumn':
              if (data) {
                $scope.addNewColumn(data);
                $scope.newColumn = '';
              }

              break;
            default:
              break;
          }
        }
      };

      $scope.cleanImportData = () => {
        $scope.import.data = [];
        $scope.import.mapping = [];
        $scope.import.error = '';
      };

      /* eslint-disable no-new */
      new Clipboard('.import-btn');

      angular.element($window).bind('hashchange', () => {
        $scope.loading = true;
        $scope.userId = $location.hash().substring(1) || '';
        auth.logUser($scope.userId, getBoardAndMessages);
      });
    },
  ]);
