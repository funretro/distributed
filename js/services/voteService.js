'use strict';

angular.module('fireideaz').service('VoteService', [
  'FirebaseService',
  function(firebaseService) {
    var voteService = {};

    voteService.getNumberOfVotesOnMessage = function(userId, messageId) {
      return new Array(this.returnNumberOfVotesOnMessage(userId, messageId));
    };

    voteService.returnNumberOfVotesOnMessage = function(userId, messageKey) {
      var userVotes = localStorage.getItem(userId)
        ? JSON.parse(localStorage.getItem(userId))
        : {};

      return userVotes[messageKey] ? userVotes[messageKey] : 0;
    };

    voteService.returnNumberOfVotes = function(userId, messagesIds) {
      var userVotes = localStorage.getItem(userId)
        ? JSON.parse(localStorage.getItem(userId))
        : {};

      var totalVotes = Object.keys(userVotes)
        .map(function(messageKey) {
          return messagesIds.indexOf(messageKey) >= 0
            ? userVotes[messageKey]
            : 0;
        })
        .reduce(function(a, b) {
          return a + b;
        }, 0);

      return localStorage.getItem(userId) ? totalVotes : 0;
    };

    voteService.extractMessageIds = function(messages) {
      return messages
        ? messages.map(function(message) {
            return message.$id;
          })
        : [];
    };

    voteService.remainingVotes = function(userId, maxVotes, messages) {
      var messagesIds = voteService.extractMessageIds(messages);

      return maxVotes - voteService.returnNumberOfVotes(userId, messagesIds) > 0
        ? maxVotes - voteService.returnNumberOfVotes(userId, messagesIds)
        : 0;
    };

    voteService.increaseMessageVotes = function(userId, messageKey) {
      if (localStorage.getItem(userId)) {
        var boardVotes = JSON.parse(localStorage.getItem(userId));

        if (boardVotes[messageKey]) {
          boardVotes[messageKey] = parseInt(boardVotes[messageKey] + 1);
          localStorage.setItem(userId, JSON.stringify(boardVotes));
        } else {
          boardVotes[messageKey] = 1;
          localStorage.setItem(userId, JSON.stringify(boardVotes));
        }
      } else {
        var newObject = {};
        newObject[messageKey] = 1;
        localStorage.setItem(userId, JSON.stringify(newObject));
      }
    };

    voteService.decreaseMessageVotes = function(userId, messageKey) {
      if (localStorage.getItem(userId)) {
        var boardVotes = JSON.parse(localStorage.getItem(userId));

        if (boardVotes[messageKey] <= 1) {
          delete boardVotes[messageKey];
        } else {
          boardVotes[messageKey] = boardVotes[messageKey] - 1;
        }

        localStorage.setItem(userId, JSON.stringify(boardVotes));
      }
    };

    voteService.mergeMessages = function(userId, dragMessage, dropMessage) {
      var dragMessageVoteCount = voteService.returnNumberOfVotesOnMessage(
        userId,
        dragMessage
      );
      var dropMessageVoteCount = voteService.returnNumberOfVotesOnMessage(
        userId,
        dropMessage
      );
      var boardVotes = JSON.parse(localStorage.getItem(userId));

      if (dragMessageVoteCount > 0) {
        boardVotes[dropMessage] = dragMessageVoteCount + dropMessageVoteCount;
        delete boardVotes[dragMessage];

        localStorage.setItem(userId, JSON.stringify(boardVotes));
      }
    };

    voteService.canUnvoteMessage = function(userId, messageKey) {
      return localStorage.getItem(userId) &&
        JSON.parse(localStorage.getItem(userId))[messageKey]
        ? true
        : false;
    };

    voteService.isAbleToVote = function(userId, maxVotes, messages) {
      return voteService.remainingVotes(userId, maxVotes, messages) > 0;
    };

    voteService.incrementMaxVotes = function(userId, maxVotes) {
      var boardRef = firebaseService.getBoardRef(userId);

      if (maxVotes < 99) {
        boardRef.update({
          max_votes: maxVotes + 1,
        });
      }
    };

    voteService.decrementMaxVotes = function(userId, maxVotes) {
      var boardRef = firebaseService.getBoardRef(userId);

      boardRef.update({
        max_votes: Math.min(Math.max(maxVotes - 1, 1), 100),
      });
    };

    voteService.vote = function(userId, maxVotes, messages, messageKey, votes) {
      if (voteService.isAbleToVote(userId, maxVotes, messages)) {
        var messagesRef = firebaseService.getMessagesRef(userId);

        messagesRef.child(messageKey).update({
          votes: votes + 1,
          date: firebaseService.getServerTimestamp(),
        });

        this.increaseMessageVotes(userId, messageKey);
      }
    };

    voteService.unvote = function(userId, messageKey, votes) {
      if (voteService.canUnvoteMessage(userId, messageKey)) {
        var messagesRef = firebaseService.getMessagesRef(userId);
        var newVotes = votes >= 1 ? votes - 1 : 0;

        messagesRef.child(messageKey).update({
          votes: newVotes,
          date: firebaseService.getServerTimestamp(),
        });

        voteService.decreaseMessageVotes(userId, messageKey);
      }
    };

    voteService.hideVote = function(userId, hideVote) {
      var boardRef = firebaseService.getBoardRef(userId);
      boardRef.update({
        hide_vote: hideVote,
      });
    };

    return voteService;
  },
]);
