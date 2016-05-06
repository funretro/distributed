describe('MessageCtrl: ', function() {
  var $rootScope,
      $scope,
      $controller,
      modalService,
      board,
      firebaseService,
      auth

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $controller = $injector.get('$controller');
    modalService = $injector.get('ModalService');
    firebaseService = $injector.get('FirebaseService');
    auth = $injector.get('Auth');

    $scope.userId = 'userId';

    $controller('MessageCtrl', {
      '$scope': $scope,
      'modalService': modalService,
      'firebaseService': firebaseService,
      'auth': auth
    });
  }));

  it('should open dialog to merge cards when drop an card over another card', function () {
    sinon.spy(modalService, 'openMergeCards');

    $scope.droppedEvent("<div class='element1'></div>", "<div class='element2'></div>");

    expect(modalService.openMergeCards.calledWith($scope)).to.be.true;
  });

  it('should not open dialog to merge cards when drop an card over the same card', function () {
    sinon.spy(modalService, 'openMergeCards');

    $scope.droppedEvent("<div class='element1'></div>", "<div class='element1'></div>");

    expect(modalService.openMergeCards.calledWith($scope)).to.be.false;
  });
});
