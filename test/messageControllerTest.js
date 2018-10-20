describe('MessageController: ', () => {
  let $rootScope;

  let $scope;

  let $controller;

  let modalService;

  let firebaseService;
  let auth;

  beforeEach(() => {
    angular.mock.module('fireideaz');

    inject($injector => {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller = $injector.get('$controller');
      modalService = $injector.get('ModalService');
      firebaseService = $injector.get('FirebaseService');
      auth = $injector.get('Auth');

      $scope.userId = 'userId';

      $controller('MessageController', {
        $scope,
        modalService,
        firebaseService,
        auth,
      });
    });
  });

  it('should open dialog to merge cards when drop an card over another card', () => {
    sinon.spy(modalService, 'openMergeCards');

    $scope.dropCardOnCard(
      '<div class="element1"></div>',
      '<div class="element2"></div>'
    );

    expect(modalService.openMergeCards.calledWith($scope)).to.be.true;
  });

  it('should not open dialog to merge cards when drop an card over the same card', () => {
    sinon.spy(modalService, 'openMergeCards');

    $scope.dropCardOnCard(
      '<div class="element1"></div>',
      '<div class="element1"></div>'
    );

    expect(modalService.openMergeCards.calledWith($scope)).to.be.false;
  });
});
