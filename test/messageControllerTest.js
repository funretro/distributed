describe('MessageCtrl: ', function() {
  var $rootScope,
      $scope,
      $controller,
      utils,
      board,
      firebaseService,
      auth

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $controller = $injector.get('$controller');
    utils = $injector.get('Utils');
    firebaseService = $injector.get('FirebaseService');
    auth = $injector.get('Auth');

    $scope.userId = 'userId';

    $controller('MessageCtrl', {
      '$scope': $scope,
      'utils': utils,
      'firebaseService': firebaseService,
      'auth': auth
    });
  }));

  it('should open dialog to merge cards when drop an card over another card', function () {
    sinon.spy(utils, 'openDialogMergeCards');

    $scope.droppedEvent("<div class='element1'></div>", "<div class='element2'></div>");

    expect(utils.openDialogMergeCards.calledWith($scope)).to.be.true;
  });

  it('should not open dialog to merge cards when drop an card over the same card', function () {
    sinon.spy(utils, 'openDialogMergeCards');

    $scope.droppedEvent("<div class='element1'></div>", "<div class='element1'></div>");

    expect(utils.openDialogMergeCards.calledWith($scope)).to.be.false;
  });
});
