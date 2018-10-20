describe('Utils: ', () => {
  let Utils;

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject(_Utils_ => {
    Utils = _Utils_;
  }));

  it('should create an user ID with random characters', () => {
    let count = 0.001;
    sinon.stub(Math, 'random', () => {
      count += 0.054;
      return count;
    });

    expect(Utils.createUserId()).to.equal(
      '01234566-789a-4bcc-9ef10-11121313141516171819191a'
    );
  });

  it('should return the id number of the next column', () => {
    const columns = [{ id: 1 }];
    const board = {
      boardId: 'board',
      columns,
    };

    expect(Utils.getNextId(board)).to.equal(2);
  });

  it('should convert array of objects to an object', () => {
    const arrayOfObjects = [
      { id: 1, value: 'Went well' },
      { id: 2, value: 'Not good' },
    ];
    const expectedObject = {
      '0': { id: 1, value: 'Went well' },
      '1': { id: 2, value: 'Not good' },
    };

    expect(Utils.toObject(arrayOfObjects)).to.deep.equal(expectedObject);
  });

  it('should return class name with type.id when id is lower than 6', () => {
    expect(Utils.columnClass(1)).to.equal('column_1');
  });

  it('should return class name with type.id when id is 6', () => {
    expect(Utils.columnClass(6)).to.equal('column_6');
  });

  it('should map class name to 1..6 when type.id is greater than 6', () => {
    expect(Utils.columnClass(20)).to.equal('column_2');
  });
});
