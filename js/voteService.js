'use strict';

angular
  .module('fireideaz')
  .service('VoteService', [function () {
    function returnNumberOfVotes(userId) {
      return localStorage.getItem(userId) ? parseInt(localStorage.getItem(userId)) : 0;
    }

    function remainingVotes(maxVotes, userId) {
      return (maxVotes - this.returnNumberOfVotes(userId)) > 0
        ? maxVotes - this.returnNumberOfVotes(userId)
        : 0;
    }

    function increaseMessageVotes(userId, messageKey) {
      if (localStorage.getItem(userId)) {
        var boardVotes = JSON.parse(localStorage.getItem(userId));

        if (boardVotes[messageKey]) {
          boardVotes[messageKey] = parseInt(boardVotes[messageKey] + 1);
          localStorage.setItem(userId, JSON.stringify(boardVotes));
        } else {
          boardVotes[messageKey] = 1
          localStorage.setItem(userId, JSON.stringify(boardVotes));
        }
      } else {
        var newObject = {};
        newObject[messageKey] = 1;
        localStorage.setItem(userId, JSON.stringify(newObject));
      }
    }

    function decreaseMessageVotes(userId, messageKey) {
      if (localStorage.getItem(userId)) {
        var boardVotes = JSON.parse(localStorage.getItem(userId));

        if (boardVotes[messageKey] === 1) {
            delete boardVotes[messageKey];
        } else {
          boardVotes[messageKey] = boardVotes[messageKey] - 1;
        }

        localStorage.setItem(userId, JSON.stringify(boardVotes));
      }
    }

    function canUnvoteMessage(key, votes) {
      return localStorage.getItem(key) > 0 && votes > 0;
    }

    function haveVotedOnMessage(key) {
      return parseInt(localStorage.getItem(key)) > 0;
    }

    function isAbleToVote(userId, maxVotes) {
      return localStorage.getItem(userId) < maxVotes;
    }

    return {
      returnNumberOfVotes: returnNumberOfVotes,
      increaseMessageVotes: increaseMessageVotes,
      decreaseMessageVotes: decreaseMessageVotes,
      remainingVotes: remainingVotes,
      canUnvoteMessage: canUnvoteMessage,
      haveVotedOnMessage: haveVotedOnMessage,
      isAbleToVote: isAbleToVote
    };
  }]);
