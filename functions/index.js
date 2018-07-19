var functions = require('firebase-functions');
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/*
Update functions by running the command:
  firebase deploy --only functions

The function URL of newboard shown after successfully completed update operation. It may me something like the next url, but with an added parameter (?name=<board-name>) to show how it must be used:
  https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/newboard?name=<board-name>
 */
exports.newboard = functions.https.onRequest(function(req, res) {
  function createUserId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function createUserAndLog(userId, callback) {
    var email = userId + '@fireideaz.com';
    var password = userId;

    admin.auth().createUser({
      uid: userId,
      email: email,
      password: password
    })
      .then(function(userRecord) {
        callback(userRecord.uid);
      })
      .catch(function(error) {
        return error;
      });
  }

  function createNewBoard(userId) {
    var board = admin.database().ref('/boards/' + userId);
    var columns = (req.query.columns || 'Went well,To improve,Action items').split(",");
    var maxVotes = req.query.maxVotes || 6;
    var textEditingIsPrivate = true;
    if (typeof req.query.textEditingIsPrivate !== "undefined") {
      textEditingIsPrivate = req.query.textEditingIsPrivate;
    }
    board.set({
      boardId: req.query.name,
      date_created: new Date().toString(),
      columns: messageTypes = columns.map(function(value, id) {
        return {
          id: id,
          value: value
        }
      }),
      user_id: userId,
      max_votes: maxVotes,
      text_editing_is_private: textEditingIsPrivate
    }, function(error) {
      if (error) {
        return error;
      } else {
        var url = 'https://funretro.github.io/distributed/#' + userId;
        res.send(url);
      }
    });
  }

  var userId = createUserId();

  createUserAndLog(userId, createNewBoard);
});