angular.module('fireideaz').service('ImportExportService', [
  'FirebaseService',
  'ModalService',
  'CsvService',
  '$filter',
  '$window',
  '$document',
  function(
    firebaseService,
    modalService,
    CsvService,
    $filter,
    $window,
    $document
  ) {
    const importExportService = {};

    importExportService.importMessages = function(
      userUid,
      { data, mapping: messageMappings },
      messages
    ) {
      for (let importIndex = 1; importIndex < data.length; importIndex += 1) {
        for (
          let mappingIndex = 0;
          mappingIndex < messageMappings.length;
          mappingIndex += 1
        ) {
          const mapping = messageMappings[mappingIndex];
          const { mapFrom, mapTo } = mapping;

          if (mapFrom !== -1) {
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
      }

      modalService.closeAll();
    };

    importExportService.getSortFields = sortField =>
      sortField === 'votes' ? ['-votes', 'date_created'] : 'date_created';

    importExportService.getBoardText = (board, messages, sortField) => {
      if (board) {
        let clipboard = '';

        $(board.columns).each((index, column) => {
          if (index === 0) {
            clipboard += `<strong>${column.value}</strong><br />`;
          } else {
            clipboard += `<br /><strong>${column.value}</strong><br />`;
          }

          const filteredArray = $filter('orderBy')(
            messages,
            importExportService.getSortFields(sortField)
          );

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

    importExportService.getBoardPureText = function(
      board,
      messages,
      sortField
    ) {
      if (board) {
        let clipboard = '';

        $(board.columns).each((index, column) => {
          if (index === 0) {
            clipboard += `${column.value}\n`;
          } else {
            clipboard += `\n${column.value}\n`;
          }

          const filteredArray = $filter('orderBy')(
            messages,
            importExportService.getSortFields(sortField)
          );

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

    importExportService.submitImportFile = function(
      file,
      importObject,
      board,
      scope
    ) {
      const mapping = { importObject };
      let data = { importObject };
      let error;
      if (file) {
        if (file.size === 0) {
          error = 'The file you are trying to import seems to be empty';
          /* eslint-disable no-param-reassign */
          importObject = { ...importObject, ...{ error } };
          return;
        }

        /* globals Papa */
        Papa.parse(file, {
          complete(results) {
            if (results.data.length > 0) {
              data = { results };

              board.columns.forEach(column => {
                mapping.push({
                  mapFrom: '-1',
                  mapTo: column.id,
                  name: column.value,
                });
              });

              if (results.errors.length > 0) {
                error = results.errors[0].message;
              }

              /* eslint-disable no-param-reassign */
              importObject = { ...importObject, ...{ mapping, data, error } };
              scope.$apply();
            }
          },
        });
      }
    };

    importExportService.generatePdf = (board, messages, sortField) => {
      /* eslint-disable new-cap */
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

        const filteredArray = $filter('orderBy')(
          messages,
          importExportService.getSortFields(sortField)
        );

        $(filteredArray).each((index2, message) => {
          if (message.type.id === column.id) {
            const parsedText = pdf.splitTextToSize(
              `- ${message.text} (${message.votes} votes)`,
              180
            );
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

    const getColumnFieldObject = columnId => ({
      type: {
        id: columnId,
      },
    });

    const showCsvFileDownload = (csvText, fileName) => {
      const blob = new Blob([csvText]);
      const downloadLink = $document.createElement('a');
      downloadLink.href = $window.URL.createObjectURL(blob, {
        type: 'text/csv',
      });
      downloadLink.download = fileName;

      $document.body.appendChild(downloadLink);
      downloadLink.click();
      $document.body.removeChild(downloadLink);
    };

    importExportService.generateCsv = (board, messages, sortField) => {
      const columns = board.columns.map(column => {
        // Updated to use column.id, as columns could be any number when changed.
        const columnMessages = $filter('filter')(
          messages,
          getColumnFieldObject(column.id)
        );
        const sortedColumnMessages = $filter('orderBy')(
          columnMessages,
          importExportService.getSortFields(sortField)
        );

        const messagesText = sortedColumnMessages.map(message => message.text);

        const columnArray = [column.value].concat(messagesText);

        return columnArray;
      });

      const csvText = CsvService.buildCsvText(columns);
      showCsvFileDownload(csvText, `${board.boardId}.csv`);
    };

    return importExportService;
  },
]);
