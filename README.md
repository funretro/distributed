# Fun Retro

Easy to use and beautiful restrospective board.

Learn more about retrospectives at [funretrospectives.com](http://funretrospectives.com)

[![Build](https://travis-ci.org/funretro/distributed.svg?branch=master)](https://travis-ci.org/funretro/distributed)
<a href="https://codeclimate.com/github/funretro/distributed"><img src="https://codeclimate.com/github/glauberramos/fireideaz/badges/gpa.svg" /></a>&nbsp;[![devDependency Status](https://david-dm.org/funretro/distributed/dev-status.svg)](https://david-dm.org/funretro/distributed#info=devDependencies)

## How to setup local environment

1. Clone the repository
2. Fun Retro is using [Firebase](http://www.firebase.com). First create an account at firebase. Then create a test project.
3. Enable sign-up using Email/Password for your project. This can be done
   through the 'Authentication' tab for the project.
4. Change the file on js/vendor/firebaseInitialization.js and replace the values with your project values

```
var config = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGE_ID"
};

firebase.initializeApp(config);
```

5. The app uses firebase auth and creates a new user when you attempt to create a new board. So, once the app is running, head over to your firebase console `Authentication` section and enable auth using email & password. After change it should look like this [screenshot](https://drive.google.com/file/d/1u5qzuXeyERstqK0i6zR02uyP8ZdLK8ob/view?usp=sharing)
6. If you don't want to file to be tracked by git just run this command on the project home folder:

```
git update-index --assume-unchanged js/vendor/firebaseInitialization.js
```

7. Install [Node.js](https://nodejs.org/en/)
8. Run `npm install` (inside the project folder)
9. Run `npm start`
10. Now you can open the app on [http://localhost:4000/](http://localhost:4000/) and start creating your boards.

## Contribute to Fun Retro

Take a look on our [Contributing](https://github.com/funretro/distributed/blob/master/CONTRIBUTING.md) guide

## Continuous Integration

Our tests run on [TravisCI](https://travis-ci.org/funretro/distributed)

## Running the tests

1. Run `npm test:watch`
2. Refactor and watch tests re-run.
3. Fix any red tests
4. Note: you can open [http://localhost:9876/debug.html](http://localhost:9876/debug.html) to run tests with a browser
