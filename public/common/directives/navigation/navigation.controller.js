(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);
  navigationCtrl.$inject = ['$location','authentication'];

  function navigationCtrl($location, authentication) {
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();

    //adding logout user
    vm.logout = function(){
    	console.log("khanh logout is pressed ");
    	authentication.logout();
    	// try to fix bug: call vm.isloggedin again to clear bug of pressing logout
      vm.isLoggedIn = authentication.isLoggedIn();
      $location.path('/');
    };
  }

})();
