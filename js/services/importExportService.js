

angular
  .module('fireideaz')
<<<<<<< HEAD
  .service('ImportExportService', 
          ['FirebaseService', 'ModalService', 'CsvService', '$filter', 
          function (firebaseService, modalService, CsvService, $filter) {
    var importExportService = {};
=======
  .service('ImportExportService', ['FirebaseService', 'ModalService', '$filter', function (firebaseService, modalService, $filter) {
    const importExportService = {};
>>>>>>> d3a0a1b... [ #225 ] Apply eslint --fix to solve linting problems

    importExportService.importMessages = function (userUid, importObject, messages) {
      const data = importObject.data;
      const mapping = importObject.mapping;

      for (let importIndex = 1; importIndex < data.length; importIndex++) {
        for (let mappingIndex = 0; mappingIndex < mapping.length; mappingIndex++) {
          const mapFrom = mapping[mappingIndex].mapFrom;
          const mapTo = mapping[mappingIndex].mapTo;

          if (mapFrom === -1) {
            continue;
          }

          const cardText = data[importIndex][mapFrom];

          if (cardText) {
            messages.$add({
              text: cardText,
              user_id: userUid,
              type: {
                id: mapTo,
              },
              date: firebaseService.getServerTimestamp(),
              votes: 0,
            });
          }
        }
      }

      modalService.closeAll();
    };

    importExportService.getSortFields = function (sortField) {
      return sortField === 'votes' ? ['-votes', 'date_created'] : 'date_created';
    };

    importExportService.getBoardText = function (board, messages, sortField) {
      if (board) {
        let clipboard = '';

        $(board.columns).each((index, column) => {
          if (index === 0) {
            clipboard += `<strong>${column.value}</strong><br />`;
          } else {
            clipboard += `<br /><strong>${column.value}</strong><br />`;
          }

          const filteredArray = $filter('orderBy')(messages, importExportService.getSortFields(sortField));

          $(filteredArray).each((index2, message) => {
            if (message.type.id === column.id) {
              clipboard += `- ${message.text} (${message.votes} votes) <br />`;
            }
          });
        });

        return clipboard;
      }

      return '';
    };

    importExportService.getBoardPureText = function (board, messages, sortField) {
      if (board) {
        let clipboard = '';

        $(board.columns).each((index, column) => {
          if (index === 0) {
            clipboard += `${column.value}\n`;
          } else {
            clipboard += `\n${column.value}\n`;
          }

          const filteredArray = $filter('orderBy')(messages, importExportService.getSortFields(sortField));

          $(filteredArray).each((index2, message) => {
            if (message.type.id === column.id) {
              clipboard += `- ${message.text} (${message.votes} votes) \n`;
            }
          });
        });

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
          complete(results) {
            if (results.data.length > 0) {
              importObject.data = results.data;

              board.columns.forEach((column) => {
                importObject.mapping.push({ mapFrom: '-1', mapTo: column.id, name: column.value });
              });

              if (results.errors.length > 0) {
                importObject.error = results.errors[0].message;
              }

              scope.$apply();
            }
          },
        });
      }
    };

    importExportService.generatePdf = function (board, messages, sortField) {
      /* globals jsPDF */
      const pdf = new jsPDF();
      let currentHeight = 10;

      $(board.columns).each((index, column) => {
        if (currentHeight > pdf.internal.pageSize.height - 10) {
          pdf.addPage();
          currentHeight = 10;
        }

        pdf.setFontType('bold');
        currentHeight += 5;
        pdf.text(column.value, 10, currentHeight);
        currentHeight += 10;
        pdf.setFontType('normal');

        const filteredArray = $filter('orderBy')(messages, importExportService.getSortFields(sortField));

        $(filteredArray).each((index2, message) => {
          if (message.type.id === column.id) {
            const parsedText = pdf.splitTextToSize(`- ${message.text} (${message.votes} votes)`, 180);
            const parsedHeight = pdf.getTextDimensions(parsedText).h;
            pdf.text(parsedText, 10, currentHeight);
            currentHeight += parsedHeight;

            if (currentHeight > pdf.internal.pageSize.height - 10) {
              pdf.addPage();
              currentHeight = 10;
            }
          }
        });
      });

      pdf.save(`${board.boardId}.pdf`);
    };

    var getColumnFieldObject = function(columnId) {
      return {
        type: {
          id: columnId
        }
      };
    };

    var showCsvFileDownload = function(csvText) {
      var blob = new Blob([csvText]);
      var downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob, {type: 'text/csv'});
      downloadLink.download = 'data.csv';
      
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
      showCsvFileDownload(csvText);
    };

    return importExportService;
  }]);
