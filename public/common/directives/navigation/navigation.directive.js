(function () {

  angular
    .module('meanApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'public/common/directives/navigation/navigation.template.html',
      controller: 'navigationCtrl as navvm'
    };
  }

})();