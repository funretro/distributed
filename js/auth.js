

angular
  .module('fireideaz')
  .service('Auth', ['$firebaseAuth', function ($firebaseAuth) {
    const mainAuthRef = $firebaseAuth();

    function logUser(user, callback) {
      const email = `${user}@fireideaz.com`;
      const password = user;

      mainAuthRef.$signOut();
      mainAuthRef.$signInWithEmailAndPassword(email, password).then((userData) => {
        callback(userData);
      }, (error) => {
        console.log('Logged user failed: ', error);
        window.location.hash = '';
        location.reload();
      });
    }

    function createUserAndLog(newUser, callback) {
      const email = `${newUser}@fireideaz.com`;
      const password = newUser;

      mainAuthRef.$createUserWithEmailAndPassword(email, password).then(() => {
        logUser(newUser, callback);
      }, (error) => {
        console.log('Create user failed: ', error);
      });
    }

    return {
      createUserAndLog,
      logUser,
    };
  }]);
