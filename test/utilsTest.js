describe('Utils: ', function() {
  var $rootScope, $scope, $controller, $firebaseArray, board, utils;

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    inject(function($injector) {
      utils = $injector.get('Utils');
    });
  }));

  it('should create an user ID with random characters', function() {
    var count = 0.001;
    sinon.stub(Math, 'random', function() {
      count = count + 0.054;
      return count;
    });

    expect(utils.createUserId()).to.equal(
      '01234566-789a-4bcc-9ef10-11121313141516171819191a'
    );
  });

  it('should return the id number of the next column', function() {
    var columns = [{ id: 1 }];
    var board = {
      boardId: 'board',
      columns: columns,
    };

    expect(utils.getNextId(board)).to.equal(2);
  });

  it('should convert array of objects to an object', function() {
    var arrayOfObjects = [
      { id: 1, value: 'Went well' },
      { id: 2, value: 'Not good' },
    ];
    var expectedObject = {
      '0': { id: 1, value: 'Went well' },
      '1': { id: 2, value: 'Not good' },
    };

    expect(utils.toObject(arrayOfObjects)).to.deep.equal(expectedObject);
  });

  it('should return class name with type.id when id is lower than 6', function() {
    expect(utils.columnClass(1)).to.equal('column_1');
  });

  it('should return class name with type.id when id is 6', function() {
    expect(utils.columnClass(6)).to.equal('column_6');
  });

  it('should map class name to 1..6 when type.id is greater than 6', function() {
    expect(utils.columnClass(20)).to.equal('column_2');
  });
});
