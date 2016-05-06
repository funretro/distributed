'use strict';

angular
  .module('fireideaz')
  .service('ModalService', ['ngDialog', function(ngDialog) {
    return {
      openAddNewColumn: function(scope) {
        ngDialog.open({
          template: 'addNewColumn',
          className: 'ngdialog-theme-plain',
          scope: scope
        });
      },
      openAddNewBoard: function(scope) {
        ngDialog.open({
          template: 'addNewBoard',
          className: 'ngdialog-theme-plain',
          scope: scope
        });
      },
      openDeleteCard: function(scope) {
        ngDialog.open({
          template: 'deleteCard',
          className: 'ngdialog-theme-plain',
          scope: scope
        });
      },
      openDeleteColumn: function(scope) {
        ngDialog.open({
          template: 'deleteColumn',
          className: 'ngdialog-theme-plain',
          scope: scope
        });
      },

      openMergeCards: function(scope) {
        ngDialog.open({
          template: 'mergeCards',
          className: 'ngdialog-theme-plain',
          scope: scope
        });
      },
      openCopyBoard: function(scope) {
        ngDialog.open({
          template: 'copyBoard',
          className: 'ngdialog-theme-plain bigDialog',
          scope: scope
        });
      },
      openDeleteCards: function(scope) {
        ngDialog.open({
          template: 'deleteCards',
          className: 'ngdialog-theme-plain danger',
          scope: scope
        });
      },
      closeAll: function() {
        ngDialog.closeAll();
      }
    };
  }]);
