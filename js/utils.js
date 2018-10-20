angular.module('fireideaz').service('Utils', [
  () => {
    function createUserId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0; // eslint-disable-line no-bitwise

        const v = c === 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line no-bitwise
        return v.toString(16);
      });
    }

    function focusElement(id) {
      $(`#${id}`)
        .find('textarea')
        .focus();
    }

    const messageTypes = [
      {
        id: 1,
        value: 'Went well',
      },
      {
        id: 2,
        value: 'To improve',
      },
      {
        id: 3,
        value: 'Action items',
      },
    ];

    function getNextId(board) {
      return board.columns.slice(-1).pop().id + 1;
    }

    function toObject(array) {
      const object = {};

      for (let i = 0; i < array.length; i += 1) {
        object[i] = {
          id: array[i].id,
          value: array[i].value,
        };
      }

      return object;
    }

    function columnClass(id) {
      return `column_${id % 6 || 6}`;
    }

    return {
      createUserId,
      focusElement,
      messageTypes,
      getNextId,
      toObject,
      columnClass,
    };
  },
]);
