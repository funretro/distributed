'use strict';

angular.module('fireideaz').service('CsvService', [
  () => {
    const csvService = {};

    const arrayExists = array => {
      return array !== undefined;
    };

    const isEmptyCell = nextValue => {
      return nextValue === undefined;
    };

    const isString = stringValue => {
      return typeof stringValue === 'string' || stringValue instanceof String;
    };

    const endodeForCsv = stringToEncode => {
      // Enocde " characters
      stringToEncode = stringToEncode.replace(/"/g, '""');

      // Surround string with " characters if " , or \n are present
      if (stringToEncode.search(/("|,|\n)/g) >= 0) {
        stringToEncode = '"' + stringToEncode + '"';
      }

      return stringToEncode;
    };

    csvService.buildCsvText = doubleArray => {
      const csvText = '';

      const longestColumn = csvService.determineLongestColumn(doubleArray);

      // Going by row because CSVs are ordered by rows
      for (const rowIndex = 0; rowIndex < longestColumn; rowIndex++) {
        for (
          const columnIndex = 0;
          columnIndex < longestColumn;
          columnIndex++
        ) {
          const column = doubleArray[columnIndex];
          if (!arrayExists(column)) {
            break;
          }

          const nextValue = column[rowIndex];
          if (isEmptyCell(nextValue)) {
            nextValue = '';
          }

          if (isString(nextValue)) {
            nextValue = endodeForCsv(nextValue);
          }

          csvText += nextValue + ',';
        }

        csvText += '\r\n';
      }

      return csvText;
    };

    csvService.determineLongestColumn = doubleArray => {
      return doubleArray.reduce((prev, next) => {
        return next.length > prev ? next.length : prev;
      }, doubleArray.length);
    };

    return csvService;
  },
]);
