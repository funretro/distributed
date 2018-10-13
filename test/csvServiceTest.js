describe('CsvService: ', () => {
  const square = [[1, 2], [3, 4]];
  const fewColumnsManyRows = [[1, 2, 3, 4], [5, 6]];
  const fewRowsManyColumns = [[1, 2], [3, 4], [5], [6]];
  const specialCharacters = [
    ['"Quotes"', 'Wait, a comma?', 'Newline\nCinema', '"Hey",\nall together'],
  ];
  let csvService;

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject(_CsvService_ => {
    csvService = _CsvService_;
  }));

  describe('BuildCsvText', () => {
    it('should output a comma and a new line when empty', () => {
      const csvText = csvService.buildCsvText([[]]);
      expect(csvText).to.equal(',\r\n');
    });

    it('should output valid csv when there are no cards and only one column', () => {
      const csvText = csvService.buildCsvText([[1]]);
      expect(csvText).to.equal('1,\r\n');
    });

    it('should outputs correct csv for a square grid', () => {
      const csvText = csvService.buildCsvText(square);
      expect(csvText).to.equal('1,3,\r\n2,4,\r\n');
    });

    it('should return square board when grid is few columns and many rows', () => {
      const csvText = csvService.buildCsvText(fewColumnsManyRows);
      expect(csvText).to.equal('1,5,\r\n2,6,\r\n3,,\r\n4,,\r\n');
    });

    it('should return square board when grid is few rows and many columns', () => {
      const csvText = csvService.buildCsvText(fewRowsManyColumns);
      expect(csvText).to.equal('1,3,5,6,\r\n2,4,,,\r\n,,,,\r\n,,,,\r\n');
    });

    it('should encode special characters', () => {
      const csvText = csvService.buildCsvText(specialCharacters);
      expect(csvText).to.equal(
        '"""Quotes""",\r\n"Wait, a comma?",\r\n"Newline\nCinema",\r\n"""Hey"",\nall together",\r\n'
      );
    });
  });

  describe('DetermineLongestLength', () => {
    it('should find the highest length for a square', () => {
      const longestLength = csvService.determineLongestColumn(square);
      expect(longestLength).to.equal(2);
    });

    it('should find the highest length for few columns and many rows', () => {
      const longestLength = csvService.determineLongestColumn(
        fewColumnsManyRows
      );
      expect(longestLength).to.equal(4);
    });

    it('should find the highest length for few rows and many columns', () => {
      const longestLength = csvService.determineLongestColumn(
        fewRowsManyColumns
      );
      expect(longestLength).to.equal(4);
    });
  });
});
