# Fun Retro
Easy to use and beautiful restrospective board.

Learn more about retrospectives at [funretrospectives.com](http://funretrospectives.com)

Fun retrospective guide at [Dummies guide to retrospectives](https://github.com/gmuraleekrishna/dummies-guide-to-retrospectives)

[![Build](https://travis-ci.org/funretro/distributed.svg?branch=master)](https://travis-ci.org/funretro/distributed)
<a href="https://codeclimate.com/github/funretro/distributed"><img src="https://codeclimate.com/github/glauberramos/fireideaz/badges/gpa.svg" /></a>&nbsp;[![devDependency Status](https://david-dm.org/funretro/distributed/dev-status.svg)](https://david-dm.org/funretro/distributed#info=devDependencies)

## How to setup local environment

1. Clone the repository
2. Fun Retro is using [Firebase](http://www.firebase.com). First create an account at firebase. Then create a test project.
3. Enable sign-up using Email/Password for your project.  This can be done
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
8. Run ```npm install``` (inside the project folder)
9. Install [Gulp](http://gulpjs.com/)
10. Run ```gulp```
11. Now you can open the app on [http://localhost:4000/](http://localhost:4000/) and start creating your boards.

## Contribute to Fun Retro

Take a look on our [Contributing](https://github.com/funretro/distributed/blob/master/CONTRIBUTING.md) guide

## Running the application

1. Install [Node.js](https://nodejs.org/en/)
2. Run ```npm install``` (inside the project folder)
3. Run ```gulp```
4. Point your browser to [http://localhost:4000/](http://localhost:4000/) or open dist/index.html

## Continuous Integration

Our tests run on [TravisCI](https://travis-ci.org/funretro/distributed)

## Running the tests

1. Run ```gulp test```
2. Refactor and watch tests re-run.
3. Fix any red tests
4. Note: you can open [http://localhost:9876/debug.html](http://localhost:9876/debug.html) to run tests with a browser


## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/distributed#backer)]

<a href="https://opencollective.com/distributed/backer/0/website" target="_blank"><img src="https://opencollective.com/distributed/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/1/website" target="_blank"><img src="https://opencollective.com/distributed/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/2/website" target="_blank"><img src="https://opencollective.com/distributed/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/3/website" target="_blank"><img src="https://opencollective.com/distributed/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/4/website" target="_blank"><img src="https://opencollective.com/distributed/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/5/website" target="_blank"><img src="https://opencollective.com/distributed/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/6/website" target="_blank"><img src="https://opencollective.com/distributed/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/7/website" target="_blank"><img src="https://opencollective.com/distributed/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/8/website" target="_blank"><img src="https://opencollective.com/distributed/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/9/website" target="_blank"><img src="https://opencollective.com/distributed/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/10/website" target="_blank"><img src="https://opencollective.com/distributed/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/11/website" target="_blank"><img src="https://opencollective.com/distributed/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/12/website" target="_blank"><img src="https://opencollective.com/distributed/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/13/website" target="_blank"><img src="https://opencollective.com/distributed/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/14/website" target="_blank"><img src="https://opencollective.com/distributed/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/15/website" target="_blank"><img src="https://opencollective.com/distributed/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/16/website" target="_blank"><img src="https://opencollective.com/distributed/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/17/website" target="_blank"><img src="https://opencollective.com/distributed/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/18/website" target="_blank"><img src="https://opencollective.com/distributed/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/19/website" target="_blank"><img src="https://opencollective.com/distributed/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/20/website" target="_blank"><img src="https://opencollective.com/distributed/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/21/website" target="_blank"><img src="https://opencollective.com/distributed/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/22/website" target="_blank"><img src="https://opencollective.com/distributed/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/23/website" target="_blank"><img src="https://opencollective.com/distributed/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/24/website" target="_blank"><img src="https://opencollective.com/distributed/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/25/website" target="_blank"><img src="https://opencollective.com/distributed/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/26/website" target="_blank"><img src="https://opencollective.com/distributed/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/27/website" target="_blank"><img src="https://opencollective.com/distributed/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/28/website" target="_blank"><img src="https://opencollective.com/distributed/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/distributed/backer/29/website" target="_blank"><img src="https://opencollective.com/distributed/backer/29/avatar.svg"></a>


## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/distributed#sponsor)]

<a href="https://opencollective.com/distributed/sponsor/0/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/1/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/2/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/3/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/4/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/5/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/6/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/7/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/8/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/distributed/sponsor/9/website" target="_blank"><img src="https://opencollective.com/distributed/sponsor/9/avatar.svg"></a>
