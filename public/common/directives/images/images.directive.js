(function () {

  angular
    .module('meanApp')
    .directive('images', images);

  function images () {
    return {
      restrict: 'EA',
      templateUrl: 'public/common/directives/images/images.template.html',
      controller: 'imagesCtrl',
      scope: true, // creates its own local scope
      link: function(scope, element, attributes) {
        attributes.$observe('pictures', function(data) {
          if (!data) {
            scope.pictures = {};
            scope.mainPic = "";
          } else {
            scope.pictures = angular.fromJson(data);
            scope.mainPic = scope.pictures[0].url;
          }
        })
      }
    };
  }

})();