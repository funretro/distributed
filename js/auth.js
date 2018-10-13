'use strict';

angular.module('fireideaz').service('Auth', [
  '$firebaseAuth',
  '$window',
  function($firebaseAuth, $window) {
    var mainAuthRef = $firebaseAuth();

    function logUser(user, callback) {
      var email = user + '@fireideaz.com';
      var password = user;

      mainAuthRef.$signOut();
      mainAuthRef.$signInWithEmailAndPassword(email, password).then(
        function(userData) {
          callback(userData);
        },
        function(error) {
          console.log('Logged user failed: ', error);
          $window.location.hash = '';
          location.reload();
        }
      );
    }

    function createUserAndLog(newUser, callback) {
      var email = newUser + '@fireideaz.com';
      var password = newUser;

      mainAuthRef.$createUserWithEmailAndPassword(email, password).then(
        function() {
          logUser(newUser, callback);
        },
        function(error) {
          console.log('Create user failed: ', error);
        }
      );
    }

    return {
      createUserAndLog: createUserAndLog,
      logUser: logUser,
    };
  },
]);
