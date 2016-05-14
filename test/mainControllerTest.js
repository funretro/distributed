describe('MainCtrl: ', function() {
  var $rootScope,
      $scope,
      $controller,
      utils,
      board,
      firebaseService,
      auth,
      modalService;

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $controller = $injector.get('$controller');
    utils = $injector.get('Utils');
    modalService = $injector.get('ModalService');
    firebaseService = $injector.get('FirebaseService');
    auth = $injector.get('Auth');

    $scope.userId = 'userId';

    $controller('MainCtrl', {
      '$scope': $scope,
      'utils': utils,
      'modalService': modalService,
      'firebaseService': firebaseService,
      'auth': auth
    });
  }));

  it('should set true to board when user sees notification', function() {
    sinon.spy(localStorage, 'setItem');

    $scope.seeNotification();

    expect(localStorage.setItem.calledWith('funretro1', true)).to.be.true;

    localStorage.setItem.restore();
  });

  it('should retrurn true if user hasn\'t seen the notification before', function() {
    sinon.stub(localStorage, 'getItem', function () { return false; });
    $scope.userId = 'userId';

    var shouldShowNotification = $scope.showNotification();

    expect(shouldShowNotification).to.be.true;

    localStorage.getItem.restore();
  });

  it('should retrurn false if user has already seen the notification', function() {
    sinon.stub(localStorage, 'getItem', function () { return true; });
    $scope.userId = 'userId';

    var shouldShowNotification = $scope.showNotification();

    expect(shouldShowNotification).to.be.false;

    localStorage.getItem.restore();
  });

  describe('Board', function () {

    it('should return true when sort board order by votes', function() {
      $scope.sortField = 'votes';

      expect($scope.getSortOrder()).to.be.true;
    });

    it('should return false when sort board order is not by votes', function() {
      $scope.sortField = 'something else';

      expect($scope.getSortOrder()).to.be.false;
    });

    it('should not strip spaces from board names', function() {
      $scope.newBoard.name = 'new name';

      $scope.boardNameChanged();

      expect($scope.newBoard.name).to.equal('new name');
    });

    it('should change the board context', function() {
      var updateSpy = sinon.spy();

      $scope.boardRef = {
        update: updateSpy
      }

      $scope.changeBoardContext();

      expect(updateSpy.called).to.be.true;
    });

    it('should create a new board', function () {
      sinon.stub(utils, 'createUserId', function () { return 'userId'; });
      var createUserSpy = sinon.spy(auth, 'createUserAndLog');
      var closeAllSpy = sinon.spy(modalService, 'closeAll');

      $scope.createNewBoard();

      expect(createUserSpy.calledWith($scope.userId)).to.be.true;
      expect(closeAllSpy.called).to.be.true;
    });

  });

  describe('Messages', function () {
    it('should delete a message', function() {
      var removeSpy = sinon.spy();
      var closeAllSpy = sinon.spy(modalService, 'closeAll');

      var message = {
        text: 'text of message',
        user_id: '139021'
      }

      $scope.messages = {
        $remove: removeSpy
      }

      $scope.deleteMessage(message);

      expect(closeAllSpy.called).to.be.true;
      expect(removeSpy.calledWith(message)).to.be.true;
    });

    it('should add a new message', function() {
      sinon.stub(firebaseService, 'getServerTimestamp', function() { return '00:00:00' });

      var addMessagePromise = { then: sinon.spy() };
      var addStub = sinon.stub().returns(addMessagePromise);

      var message = {
        text: 'text of message',
        user_id: '139021'
      }

      $scope.messages = {
        $add: addStub
      }

      $scope.addNewMessage({id: 1});

      expect(addStub.called).to.be.true;
    });
  });

  describe('Columns', function() {
    var setSpy,
        boardColumns,
        expectedColumns,
        closeAllSpy;

    beforeEach(function() {
      closeAllSpy = sinon.spy(modalService, 'closeAll');

      setSpy = sinon.spy();

      boardColumns = {
        set: setSpy
      }

      sinon.stub(utils, 'toObject', function () {
        return { column: 'column' };
      });

      $scope.board = {
        columns: [
          {
            value: 'columnName',
            id: 1
          }
        ]
      }

      sinon.stub(firebaseService, 'getBoardColumns', function () {
        return boardColumns;
      });
    });

    it('should add a new column to the board', function() {
      expectedColumns = [
        {
          value: 'columnName',
          id: 1
        },
        {
          value: 'otherColumnName',
          id: 2
        }
      ]

      sinon.stub(utils, 'getNextId', function () { return 2; });

      $scope.addNewColumn('otherColumnName');

      expect($scope.board.columns).to.deep.equal(expectedColumns);
      expect(setSpy.called).to.be.true;
      expect(closeAllSpy.called).to.be.true;
    });

    it('should change column name', function() {
      $scope.changeColumnName(1, 'new name!');

      expect($scope.board.columns[0].value).to.equal('new name!');
      expect(setSpy.called).to.be.true;
      expect(closeAllSpy.called).to.be.true;
    });

    it('should delete last column of the board', function() {
      $scope.deleteLastColumn();

      expect($scope.board.columns).to.deep.equal([]);
      expect(setSpy.called).to.be.true;
      expect(closeAllSpy.called).to.be.true;
    });
  });
});
