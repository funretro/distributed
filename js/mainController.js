/* global EmojiPicker */
'use strict';

angular
  .module('fireideaz')

  .controller('MainCtrl', ['$scope', '$filter', '$window', 'Utils', 'Auth',
  '$rootScope', 'FirebaseService', 'ModalService',
    function ($scope, $filter, $window, utils, auth, $rootScope, firebaseService, modalService) {
      $scope.loading = true;
      $scope.messageTypes = utils.messageTypes;
      $scope.utils = utils;
      $scope.newBoard = {
        name: '',
        text_editing_is_private: true
      };
      $scope.userId = $window.location.hash.substring(1) || '';
      $scope.searchParams = {};
      $window.location.search.substr(1).split('&').forEach(function(pair){
        var keyValue = pair.split('=');
        $scope.searchParams[keyValue[0]] = keyValue[1];
      });
      $scope.sortField = $scope.searchParams.sort || 'date_created';
      $scope.selectedType = 1;
      $scope.import = {
        data : [],
        mapping : []
      };

      $scope.droppedEvent = function(dragEl, dropEl) {
        var drag = $('#' + dragEl);
        var drop = $('#' + dropEl);
        var dragMessageRef = firebaseService.getMessageRef($scope.userId, drag.attr('messageId'));

        dragMessageRef.once('value', function() {
          dragMessageRef.update({
            type: {
              id: drop.data('column-id')
            }
          });
        });
      };

      function getBoardAndMessages(userData) {
        $scope.userId = $window.location.hash.substring(1) || '499sm';

        var messagesRef = firebaseService.getMessagesRef($scope.userId);
        var board = firebaseService.getBoardRef($scope.userId);

        $scope.boardObject = firebaseService.getBoardObjectRef($scope.userId);

        board.on('value', function(board) {
          if (board.val() === null) {
            window.location.hash = '';
            location.reload();
          }

          $scope.board = board.val();
          $scope.maxVotes = board.val().max_votes ? board.val().max_votes : 6;
          $scope.boardId = $rootScope.boardId = board.val().boardId;
          $scope.boardContext = $rootScope.boardContext = board.val().boardContext;
          $scope.loading = false;
          setTimeout(function() {new EmojiPicker();}, 100);
        });

        $scope.boardRef = board;
        $scope.messagesRef = messagesRef;
        $scope.userUid = userData.uid;
        $scope.messages = firebaseService.newFirebaseArray(messagesRef);
        
        var author = localStorage.getItem('author');
        if(!author) {
          modalService.openAuthorSettings($scope);
        }
      }

      if ($scope.userId !== '') {
        auth.logUser($scope.userId, getBoardAndMessages);
      } else {
        $scope.loading = false;
      }

      $scope.isColumnSelected = function(type) {
        return parseInt($scope.selectedType) === parseInt(type);
      };

      $scope.isCensored = function(message, privateWritingOn) {
        return message.creating && privateWritingOn;
      };

      $scope.updatePrivateWritingToggle = function(privateWritingOn) {
        $scope.boardRef.update({
          text_editing_is_private: privateWritingOn
        });
      };

      $scope.updateEditingMessage = function(message, value) {
        message.creating = value;
        $scope.messages.$save(message);
      };

      $scope.getSortFields = function() {
        return $scope.sortField === 'votes' ? ['-votes', 'date_created'] : 'date_created';
      };

      $scope.saveMessage = function(message) {
        message.creating = false;
        var author = localStorage.getItem('author');

        if(author) {
          message.author = author;
        }

        $scope.messages.$save(message);
      };

       $scope.saveAuthor = function(author) {
        if(author) {
          localStorage.setItem('author', author);
          modalService.closeAll();
        }
      };

      function redirectToBoard() {
        window.location.href = window.location.origin +
          window.location.pathname + '#' + $scope.userId;
      }

      $scope.isBoardNameInvalid = function() {
        return !$scope.newBoard.name;
      };

      $scope.isMaxVotesValid = function() {
        return Number.isInteger($scope.newBoard.max_votes);
      };

      $scope.createNewBoard = function() {
        $scope.loading = true;
        modalService.closeAll();
        $scope.userId = utils.createUserId();

        var callback = function(userData) {
          var board = firebaseService.getBoardRef($scope.userId);
          board.set({
            boardId: $scope.newBoard.name,
            date_created: new Date().toString(),
            columns: $scope.messageTypes,
            user_id: userData.uid,
            max_votes: $scope.newBoard.max_votes || 6,
            text_editing_is_private : $scope.newBoard.text_editing_is_private
          }, function(error) {
             if (error) {
                $scope.loading = false;
             } else {
                redirectToBoard();
             }
          });

          $scope.newBoard.name = '';
        };

        auth.createUserAndLog($scope.userId, callback);
      };

      $scope.changeBoardContext = function() {
        $scope.boardRef.update({
          boardContext: $scope.boardContext
        });
      };

      $scope.changeBoardName = function(newBoardName) {
        $scope.boardRef.update({
          boardId: newBoardName
        });

        modalService.closeAll();
      };

      $scope.updateSortOrder = function() {
        var updatedFilter = $window.location.origin + $window.location.pathname + '?sort=' + $scope.sortField + $window.location.hash;
        $window.history.pushState({ path: updatedFilter }, '', updatedFilter);
      };

      $scope.addNewColumn = function(name) {
        if(typeof name === 'undefined' || name === '') {
          return;
        }

        $scope.board.columns.push({
          value: name,
          id: utils.getNextId($scope.board)
        });

        var boardColumns = firebaseService.getBoardColumns($scope.userId);
        boardColumns.set(utils.toObject($scope.board.columns));

        modalService.closeAll();
      };

      $scope.changeColumnName = function(id, newName) {
        if(typeof newName === 'undefined' || newName === '') {
          return;
        }

        $scope.board.columns.map(function(column, index, array) {
          if (column.id === id) {
            array[index].value = newName;
          }
        });

        var boardColumns = firebaseService.getBoardColumns($scope.userId);
        boardColumns.set(utils.toObject($scope.board.columns));

        modalService.closeAll();
      };

      $scope.deleteColumn = function(column) {
        $scope.board.columns = $scope.board.columns.filter(function(_column) {
            return _column.id !== column.id;
        });

        var boardColumns = firebaseService.getBoardColumns($scope.userId);
        boardColumns.set(utils.toObject($scope.board.columns));
        modalService.closeAll();
      };

      $scope.deleteMessage = function(message) {
        $scope.messages.$remove(message);

        modalService.closeAll();
      };

      function addMessageCallback(message) {
        var id = message.key;
        angular.element($('#' + id)).scope().isEditing = true;
        new EmojiPicker();
        $('#' + id).find('textarea').focus();
      }

      $scope.addNewMessage = function(type) {
        $scope.messages.$add({
          text: '',
          creating: true,
          user_id: $scope.userUid,
          type: {
            id: type.id
          },
          date: firebaseService.getServerTimestamp(),
          date_created: firebaseService.getServerTimestamp(),
          votes: 0
        }).then(addMessageCallback);
      };

      $scope.deleteCards = function() {
        $($scope.messages).each(function(index, message) {
          $scope.messages.$remove(message);
        });

        modalService.closeAll();
      };

      $scope.deleteBoard = function() {
        $scope.deleteCards();
        $scope.boardRef.ref.remove();

        modalService.closeAll();
        window.location.hash = '';
        location.reload();
      };

      $scope.submitOnEnter = function(event, method, data) {
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
          }
        }
      };

      $scope.cleanImportData = function () {
        $scope.import.data = [];
        $scope.import.mapping = [];
        $scope.import.error = '';
      };

      /* globals Clipboard */
      new Clipboard('.import-btn');

      angular.element($window).bind('hashchange', function() {
        $scope.loading = true;
        $scope.userId = $window.location.hash.substring(1) || '';
        auth.logUser($scope.userId, getBoardAndMessages);
      });
    }
  ]);
