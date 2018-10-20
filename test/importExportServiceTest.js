describe('ImportExportService: ', () => {
  let firebaseService;
  let importExportService;

  const board = {
    columns: [
      {
        value: 'columnName',
        id: 1,
      },
      {
        value: 'otherColumnName',
        id: 2,
      },
    ],
  };

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject((_FirebaseService_, _importExportService_) => {
    firebaseService = _FirebaseService_;
    importExportService = _importExportService_;
  }));

  describe('Export', () => {
    const messages = [
      { text: 'C3R1', type: { id: 1 }, votes: 0 },
      { text: 'C3R2', type: { id: 2 }, votes: 0 },
      { text: 'C3R3', type: { id: 2 }, votes: 0 },
    ];

    it('should get board text', () => {
      const boardText = importExportService.getBoardText(
        board,
        messages,
        'votes'
      );

      expect(boardText).to.equal(
        '<strong>columnName</strong><br />- C3R1 (0 votes) <br /><br /><strong>otherColumnName</strong><br />- C3R2 (0 votes) <br />- C3R3 (0 votes) <br />'
      );
    });

    it('should return empty board text', () => {
      const boardText = importExportService.getBoardText(
        undefined,
        messages,
        'votes'
      );

      expect(boardText).to.equal('');
    });

    it('should get pure board text', () => {
      const boardText = importExportService.getBoardPureText(
        board,
        messages,
        'votes'
      );

      expect(boardText).to.equal(
        'columnName\n- C3R1 (0 votes) \n\notherColumnName\n- C3R2 (0 votes) \n- C3R3 (0 votes) \n'
      );
    });

    it('should return empty board text', () => {
      const boardText = importExportService.getBoardPureText(
        undefined,
        messages,
        'votes'
      );

      expect(boardText).to.equal('');
    });
  });

  describe('Import', () => {
    const inputFile = {
      lastModified: 1491246451076,
      lastModifiedDate: Date.parse(
        'Mon Apr 03 2017 21:07:31 GMT+0200 (W. Europe Daylight Time)'
      ),
      name: 'import.csv',
      size: 515,
      type: 'application/vnd.ms-excel',
    };

    const importObject = {
      mapping: [],
      data: [],
    };

    const scope = {
      $apply() {},
    };

    beforeEach(() => {
      sinon.stub(firebaseService, 'getBoardColumns').returns(board.columns);
    });

    before(() => {
      sinon.spy(Papa, 'parse');
    });

    after(() => {
      Papa.parse.restore();
    });

    it('should call parse meethod', () => {
      importExportService.submitImportFile(
        inputFile,
        importObject,
        board,
        scope
      );

      expect(Papa.parse.called).to.be.true;
      expect(Papa.parse.calledWith(inputFile)).to.be.true;
    });

    it('should show error for empty file', () => {
      const emptyFile = inputFile;
      emptyFile.size = 0;

      importExportService.submitImportFile(
        inputFile,
        importObject,
        board,
        scope
      );

      expect(importObject.error).to.be.equal(
        'The file you are trying to import seems to be empty'
      );
    });

    it('should show error for malformed file', () => {
      const emptyFile = inputFile;
      emptyFile.size = 0;

      importExportService.submitImportFile('nn', importObject, board, scope);

      expect(importObject.error).to.be.not.empty;
    });

    it('should initialize clear mapping and data', () => {
      const expectedMapping = [];

      importExportService.submitImportFile(
        inputFile,
        importObject,
        board,
        scope
      );

      expect(importObject.mapping).to.deep.equal(expectedMapping);
    });

    it('should parse import data', () => {
      const expectedData = [
        ['Column 1', 'Column 2', 'Column 3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
      ];

      importExportService.submitImportFile(
        '"Column 1","Column 2","Column 3"\n"a","b","c"\n"1","2","3"',
        importObject,
        board,
        scope
      );

      expect(importObject.data).to.deep.equal(expectedData);
    });

    it('should import mapped data', () => {
      const messageDate = Date.parse(
        'Mon Apr 03 2017 21:07:31 GMT+0200 (W. Europe Daylight Time)'
      );
      const addStub = sinon.spy();
      const expectedMessages = [
        {
          text: 'C3R1',
          user_id: 'userId',
          type: { id: 1 },
          date: messageDate,
          votes: 0,
        },
        {
          text: 'C3R2',
          user_id: 'userId',
          type: { id: 1 },
          date: messageDate,
          votes: 0,
        },
      ];

      sinon.stub(firebaseService, 'getServerTimestamp', () => messageDate);

      importObject.data = [
        ['Column 1', 'Column 2', 'Column 3'],
        ['C1R1', 'C2R1', 'C3R1'],
        ['C1R2', 'C2R2', 'C3R2'],
      ];
      importObject.mapping = [
        { mapFrom: 2, mapTo: 1, name: 'columnName' },
        { mapFrom: '-1', mapTo: 2, name: 'otherColumnName' },
      ];

      importExportService.importMessages('userId', importObject, {
        $add: addStub,
      });

      expect(addStub.calledWith(expectedMessages[0])).to.be.true;
      expect(addStub.calledWith(expectedMessages[1])).to.be.true;
    });
  });
});
