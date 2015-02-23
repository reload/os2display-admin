/**
 * @file
 * Contains the ngModel module.
 */

/**
 * Setup the module.
 */
(function() {
  var app;

  app = angular.module("ngModal", []);

  /**
   * modal-dialog directive.
   *
   * This is a modified version of: https://github.com/adamalbrecht/ngModal
   *
   * html parameters:
   *   show (boolean): should the modal be visible?
   *   onClose (function): function to call on close action.
   */
  app.directive('modalDialog', [function() {
      return {
        restrict: 'E',
        scope: {
          show: '=',
          onClose: '&?'
        },
        replace: true,
        transclude: true,
        link: function(scope) {
          scope.hideModal = function() {
            return scope.show = false;
          };
          scope.$watch('show', function(newVal, oldVal) {
            if (newVal && !oldVal) {
              document.getElementsByTagName("body")[0].style.overflow = "hidden";
            } else {
              document.getElementsByTagName("body")[0].style.overflow = "";
            }
            if ((!newVal && oldVal) && (scope.onClose != null)) {
              return scope.onClose();
            }
          });
        },
        templateUrl: "app/shared/ngModal/ng-modal.html"
      };
    }
  ]);
}).call(this);
