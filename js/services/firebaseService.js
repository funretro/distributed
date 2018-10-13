angular.module('fireideaz').service('FirebaseService', [
  'firebase',
  '$firebaseArray',
  '$firebaseObject',
  (firebase, $firebaseArray, $firebaseObject) => {
    function newFirebaseArray(messagesRef) {
      return $firebaseArray(messagesRef);
    }

    function getServerTimestamp() {
      return firebase.database.ServerValue.TIMESTAMP;
    }

    function getMessagesRef(userId) {
      return firebase.database().ref(`/messages/${userId}`);
    }

    function getMessageRef(userId, messageId) {
      return firebase.database().ref(`/messages/${userId}/${messageId}`);
    }

    function getBoardRef(userId) {
      return firebase.database().ref(`/boards/${userId}`);
    }

    function getBoardObjectRef(userId) {
      return $firebaseObject(firebase.database().ref(`/boards/${userId}`));
    }

    function getBoardColumns(userId) {
      return firebase.database().ref(`/boards/${userId}/columns`);
    }

    return {
      newFirebaseArray,
      getServerTimestamp,
      getMessagesRef,
      getMessageRef,
      getBoardRef,
      getBoardObjectRef,
      getBoardColumns,
    };
  },
]);
