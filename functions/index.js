const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

/*
Update functions by running the command:
  firebase deploy --only functions

The function URL of newboard shown after successfully completed update operation. It may me something like the next url, but with an added parameter (?name=<board-name>) to show how it must be used:
  https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/newboard?name=<board-name>
 */
exports.newboard = functions.https.onRequest((req, res) => {
  function createUserId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0; // eslint-disable-line no-bitwise

      const v = c === 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line no-bitwise
      return v.toString(16);
    });
  }

  function createUserAndLog(userId, callback) {
    const email = `${userId}@fireideaz.com`;
    const password = userId;

    admin
      .auth()
      .createUser({
        uid: userId,
        email,
        password,
      })
      .then(userRecord => {
        callback(userRecord.uid);
      })
      .catch(error => error);
  }

  function createNewBoard(userId) {
    const board = admin.database().ref(`/boards/${userId}`);

    board.set(
      {
        boardId: req.query.name,
        date_created: new Date().toString(),
        columns: (messageTypes = [
          {
            id: 1,
            value: 'Went well',
          },
          {
            id: 2,
            value: 'To improve',
          },
          {
            id: 3,
            value: 'Action items',
          },
        ]),
        user_id: userId,
        max_votes: 6,
        text_editing_is_private: true,
      },
      error => {
        if (error) {
          return error; // eslint-disable-line consistent-return
        }
        const url = `https://funretro.github.io/distributed/#${userId}`;
        res.send(url);
      }
    );
  }

  const userId = createUserId();

  createUserAndLog(userId, createNewBoard);
});
