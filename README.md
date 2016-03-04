# Fun Retrospectives
Easy to use and beautiful restrospective board.

Learn more about retrospectives at [funretrospectives.com](http://funretrospectives.com)

[![Build](https://snap-ci.com/funretro/distributed/branch/master/build_image)](https://snap-ci.com/funretro/distributed/branch/master)
<a href="https://codeclimate.com/github/glauberramos/fireideaz"><img src="https://codeclimate.com/github/glauberramos/fireideaz/badges/gpa.svg" /></a>&nbsp;[![devDependency Status](https://david-dm.org/funretro/distributed/dev-status.svg)](https://david-dm.org/funretro/distributed#info=devDependencies)

## User interface

![Fun retrospectives screenshot](http://i.imgur.com/iY1zc2Y.png)

## How to setup local environment

1. Clone the repository
2. Install [Node.js](https://nodejs.org/en/)
3. Run ```npm install``` (inside the project folder)
4. Run ```gulp```
5. Funretrospectives is using [Firebase](www.firebase.com). First create an account at firebase. Then create an test app
6. After creating the app on Firebase you can save the new url (ex: https://funretrotest.firebaseio.com/) and replace the variable ```firebaseUrl``` inside ```js/firebaseService.js```
7. Now you can open the app on [http://localhost:4000/](http://localhost:4000/) and start creating your boards. You will notice that the app has this architecture on firebase:
![Fun retrospectives architecture](https://i.imgur.com/etYgDia.png)

## How to colaborate to the project
1. All things being developed are managed on github issues. We are currently using labels for Bug and Priority. Please fell free to get any one of those two. Create as many pull requests you want.

## Running the application

1. Install [Node.js](https://nodejs.org/en/)
2. Run ```npm install``` (inside the project folder)
3. Run ```gulp```
4. Point your browser to [http://localhost:4000/](http://localhost:4000/) or open index.html

## Running the tests

1. Run ```gulp test```