(function () {

  angular
    .module('meanApp')
   // .controller('registerCtrl', registerCtrl);
 
   .controller('registerCtrl',['$scope','$location','authentication', function($scope, $location,authentication){
     $scope.vm = this;

    $scope.vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register($scope.vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };


   }]);

/*
  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    console.log('this is khanh test inside register controller'+ this);

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };

  }
*/
})();