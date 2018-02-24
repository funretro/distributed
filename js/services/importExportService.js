'use strict';

angular
  .module('fireideaz', ['toastr'])
  .service('ImportExportService',
          ['FirebaseService', 'ModalService', 'CsvService', 'toastr', '$filter',
          function (firebaseService, modalService, CsvService, toastr, $filter) {
    var importExportService = {};

    importExportService.importMessages = function (userUid, importObject, messages) {
      var data = importObject.data;
      var mapping = importObject.mapping;

      for (var importIndex = 1; importIndex < data.length; importIndex++) {
        for (var mappingIndex = 0; mappingIndex < mapping.length; mappingIndex++) {
          var mapFrom = mapping[mappingIndex].mapFrom;
          var mapTo = mapping[mappingIndex].mapTo;

          if (mapFrom === -1) {
           continue;
         }

          var cardText = data[importIndex][mapFrom];

          if (cardText) {
             messages.$add({
             text: cardText,
             user_id: userUid,
             type: {
               id: mapTo
             },
             date: firebaseService.getServerTimestamp(),
             votes: 0});
          }
        }
      }

      modalService.closeAll();
    };

    importExportService.getSortFields = function(sortField) {
      return sortField === 'votes' ? ['-votes', 'date_created'] : 'date_created';
    };

    importExportService.getBoardText = function(board, messages, sortField) {
      if (board) {
        var clipboard = '';

        $(board.columns).each(function(index, column) {
          if (index === 0) {
            clipboard += '<strong>' + column.value + '</strong><br />';
          } else {
            clipboard += '<br /><strong>' + column.value + '</strong><br />';
          }

          var filteredArray = $filter('orderBy')(messages, importExportService.getSortFields(sortField));

          $(filteredArray).each(function(index2, message) {
            if (message.type.id === column.id) {
              clipboard += '- ' + message.text + ' (' + message.votes + ' votes) <br />';
            }
          });
        });

        return clipboard;
      }

      return '';
    };

    importExportService.getBoardPureText = function(board, messages, sortField) {
      if (board) {
        var clipboard = '';

        $(board.columns).each(function(index, column) {
          if (index === 0) {
            clipboard += column.value + '\n';
          } else {
            clipboard += '\n' + column.value + '\n';
          }

          var filteredArray = $filter('orderBy')(messages, importExportService.getSortFields(sortField));

          $(filteredArray).each(function(index2, message) {
            if (message.type.id === column.id) {
              clipboard += '- ' + message.text + ' (' + message.votes + ' votes) \n';
            }
          });
        });

        toastr.success('Copied To Clipboard');
        return clipboard;
      }

      return '';
    };

    importExportService.submitImportFile = function (file, importObject, board, scope) {
      importObject.mapping = [];
      importObject.data = [];

      if (file) {
        if (file.size === 0) {
          importObject.error = 'The file you are trying to import seems to be empty';
          return;
        }

        /* globals Papa */
        Papa.parse(file, {
          complete: function(results) {
            if (results.data.length > 0) {
              importObject.data = results.data;

              board.columns.forEach (function (column){
                importObject.mapping.push({ mapFrom: '-1', mapTo: column.id, name: column.value });
              });

              if (results.errors.length > 0) {
                 importObject.error = results.errors[0].message;
              }

              scope.$apply();
            }
          }
        });
      }
    };

    importExportService.generatePdf = function(board, messages, sortField) {
      /* globals jsPDF */
      var pdf = new jsPDF();
      var currentHeight = 10;

      $(board.columns).each(function(index, column) {
        if (currentHeight > pdf.internal.pageSize.height - 10) {
          pdf.addPage();
          currentHeight = 10;
        }

        pdf.setFontType('bold');
        currentHeight = currentHeight + 5;
        pdf.text(column.value, 10, currentHeight);
        currentHeight = currentHeight + 10;
        pdf.setFontType('normal');

        var filteredArray = $filter('orderBy')(messages, importExportService.getSortFields(sortField));

        $(filteredArray).each(function(index2, message) {
          if (message.type.id === column.id) {
            var parsedText = pdf.splitTextToSize('- ' + message.text + ' (' + message.votes + ' votes)', 180);
            var parsedHeight = pdf.getTextDimensions(parsedText).h;
            pdf.text(parsedText, 10, currentHeight);
            currentHeight = currentHeight + parsedHeight;

            if (currentHeight > pdf.internal.pageSize.height - 10) {
              pdf.addPage();
              currentHeight = 10;
            }
          }
        });
      });

      pdf.save(board.boardId + '.pdf');
    };

    var getColumnFieldObject = function(columnId) {
      return {
        type: {
          id: columnId
        }
      };
    };

    var showCsvFileDownload = function(csvText, fileName) {
      var blob = new Blob([csvText]);
      var downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob, {type: 'text/csv'});
      downloadLink.download = fileName;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    importExportService.generateCsv = function(board, messages, sortField) {

      var columns = board.columns.map(function(column, columnIndex) {
        // Using index + 1 because column IDs start from 1
        var columnMessages = $filter('filter')(messages, getColumnFieldObject(columnIndex + 1));
        var sortedColumnMessages = $filter('orderBy')(columnMessages, importExportService.getSortFields(sortField));

        var messagesText = sortedColumnMessages.map(function(message) {
          return message.text;
        });

        var columnArray = [column.value].concat(messagesText);

        return columnArray;
      });

      var csvText = CsvService.buildCsvText(columns);
      showCsvFileDownload(csvText, board.boardId + '.csv');
    };

    return importExportService;
  }]);
