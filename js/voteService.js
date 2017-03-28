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

    function increaseMessageVotes(key) {
      if (localStorage.getItem(key)) {
        localStorage.setItem(key, parseInt(localStorage.getItem(key)) + 1);
      } else {
        localStorage.setItem(key, 1);
      }
    }

    function increaseUserVotes(userId) {
      localStorage.setItem(userId, this.returnNumberOfVotes(userId) + 1);
    }

    function decreaseMessageVotes(key) {
      if (localStorage.getItem(key) === 1) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, parseInt(localStorage.getItem(key)) - 1);
      }
    }

    function decreaseUserVotes(userId) {
      localStorage.setItem(userId, this.returnNumberOfVotes(userId) - 1);
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

    function messageVotesByCurrentUser (key)
    {
      return (localStorage.getItem(key)) ? localStorage.getItem(key) : 0 ;
    }

    return {
      returnNumberOfVotes: returnNumberOfVotes,
      increaseMessageVotes: increaseMessageVotes,
      increaseUserVotes: increaseUserVotes,
      decreaseMessageVotes: decreaseMessageVotes,
      decreaseUserVotes: decreaseUserVotes,
      remainingVotes: remainingVotes,
      canUnvoteMessage: canUnvoteMessage,
      haveVotedOnMessage: haveVotedOnMessage,
      isAbleToVote: isAbleToVote,
      messageVotesByCurrentUser: messageVotesByCurrentUser
    };
  }]);
