describe('CsvService: ', function() {
  var $rootScope, $scope, csvService;

  var square = [[1, 2], [3, 4]];

  var fewColumnsManyRows = [[1, 2, 3, 4], [5, 6]];

  var fewRowsManyColumns = [[1, 2], [3, 4], [5], [6]];

  var specialCharacters = [
    ['"Quotes"', 'Wait, a comma?', 'Newline\nCinema', '"Hey",\nall together'],
  ];

  beforeEach(angular.mock.module('fireideaz'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    inject(function($injector) {
      csvService = $injector.get('CsvService');
    });
  }));

  describe('BuildCsvText', function() {
    it('should output a comma and a new line when empty', function() {
      var csvText = csvService.buildCsvText([[]]);
      expect(csvText).to.equal(',\r\n');
    });

    it('should output valid csv when there are no cards and only one column', function() {
      var csvText = csvService.buildCsvText([[1]]);
      expect(csvText).to.equal('1,\r\n');
    });

    it('should outputs correct csv for a square grid', function() {
      var csvText = csvService.buildCsvText(square);
      expect(csvText).to.equal('1,3,\r\n2,4,\r\n');
    });

    it('should return square board when grid is few columns and many rows', function() {
      var csvText = csvService.buildCsvText(fewColumnsManyRows);
      expect(csvText).to.equal('1,5,\r\n2,6,\r\n3,,\r\n4,,\r\n');
    });

    it('should return square board when grid is few rows and many columns', function() {
      var csvText = csvService.buildCsvText(fewRowsManyColumns);
      expect(csvText).to.equal('1,3,5,6,\r\n2,4,,,\r\n,,,,\r\n,,,,\r\n');
    });

    it('should encode special characters', function() {
      var csvText = csvService.buildCsvText(specialCharacters);
      expect(csvText).to.equal(
        '"""Quotes""",\r\n"Wait, a comma?",\r\n"Newline\nCinema",\r\n"""Hey"",\nall together",\r\n'
      );
    });
  });

  describe('DetermineLongestLength', function() {
    it('should find the highest length for a square', function() {
      var longestLength = csvService.determineLongestColumn(square);
      expect(longestLength).to.equal(2);
    });

    it('should find the highest length for few columns and many rows', function() {
      var longestLength = csvService.determineLongestColumn(fewColumnsManyRows);
      expect(longestLength).to.equal(4);
    });

    it('should find the highest length for few rows and many columns', function() {
      var longestLength = csvService.determineLongestColumn(fewRowsManyColumns);
      expect(longestLength).to.equal(4);
    });
  });
});
