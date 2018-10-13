angular.module('fireideaz').service('CsvService', [
  () => {
    const csvService = {};
    const arrayExists = array => array !== undefined;
    const isEmptyCell = nextValue => nextValue === undefined;
    const isString = stringValue =>
      typeof stringValue === 'string' || stringValue instanceof String;

    const endodeForCsv = stringToEncode => {
      // Enocde " characters
      let encoded = stringToEncode.replace(/"/g, '""');

      // Surround string with " characters if " , or \n are present
      if (encoded.search(/("|,|\n)/g) >= 0) {
        encoded = `"${encoded}"`;
      }

      return encoded;
    };

    csvService.buildCsvText = doubleArray => {
      const longestColumn = csvService.determineLongestColumn(doubleArray);
      let csvText = '';

      // Going by row because CVS are ordered by rows
      for (let rowIndex = 0; rowIndex < longestColumn; rowIndex += 1) {
        for (
          let columnIndex = 0;
          columnIndex < longestColumn;
          columnIndex += 1
        ) {
          const column = doubleArray[columnIndex];
          if (!arrayExists(column)) {
            break;
          }

          let nextValue = column[rowIndex];
          if (isEmptyCell(nextValue)) {
            nextValue = '';
          }

          if (isString(nextValue)) {
            nextValue = endodeForCsv(nextValue);
          }

          csvText += `${nextValue},`;
        }

        csvText += '\r\n';
      }

      return csvText;
    };

    csvService.determineLongestColumn = doubleArray =>
      doubleArray.reduce(
        (prev, next) => (next.length > prev ? next.length : prev),
        doubleArray.length
      );

    return csvService;
  },
]);
