angular.module('fireideaz').service('ModalService', [
  'ngDialog',
  ngDialog => ({
    openAddNewColumn(scope) {
      ngDialog.open({
        template: 'addNewColumn',
        className: 'ngdialog-theme-plain',
        scope,
      });
    },
    openAddNewBoard(scope) {
      ngDialog.open({
        template: 'addNewBoard',
        className: 'ngdialog-theme-plain',
        scope,
      });
    },
    openDeleteCard(scope) {
      ngDialog.open({
        template: 'deleteCard',
        className: 'ngdialog-theme-plain',
        scope,
      });
    },
    openDeleteColumn(scope) {
      ngDialog.open({
        template: 'deleteColumn',
        className: 'ngdialog-theme-plain',
        scope,
      });
    },

    openMergeCards(scope) {
      ngDialog.open({
        template: 'mergeCards',
        className: 'ngdialog-theme-plain',
        scope,
      });
    },
    openImportBoard(scope) {
      scope.cleanImportData();
      ngDialog.open({
        template: 'importCards',
        className: 'ngdialog-theme-plain bigDialog',
        scope,
      });
    },
    openDeleteBoard(scope) {
      ngDialog.open({
        template: 'deleteBoard',
        className: 'ngdialog-theme-plain danger',
        scope,
      });
    },
    openDeleteCards(scope) {
      ngDialog.open({
        template: 'deleteCards',
        className: 'ngdialog-theme-plain danger',
        scope,
      });
    },
    openVoteSettings(scope) {
      ngDialog.open({
        template: 'voteSettings',
        className: 'ngdialog-theme-plain',
        scope,
      });
    },
    openCardSettings(scope) {
      ngDialog.open({
        template: 'cardSettings',
        className: 'ngdialog-theme-plain',
        scope,
      });
    },
    closeAll() {
      ngDialog.closeAll();
    },
  }),
]);
