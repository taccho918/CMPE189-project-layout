(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);
  navigationCtrl.$inject = ['$location','authentication','$interval','$http'];

  function navigationCtrl($location, authentication,$interval,$http) {
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
    // initial call http to get number of items in shoping cart
    $http.post('/api/shoppingCart/get',authentication.currentUser())
                .success(function(data){
                  vm.numberShoppingCartItems = Object.keys(data).length;
                  console.log(JSON.stringify(data) + "lenght: "+ Object.keys(data).length);
                  
                })
                .error(function(error) {
                  console.log('Error: ' + error);
                });// end http post call
      // this call to update number of items in shopping cart every 4 second
      /*
      $interval(function(){
            $http.post('/api/shoppingCart/get',authentication.currentUser())
                .success(function(data){
                  vm.numberShoppingCartItems = Object.keys(data).length;
                  console.log(JSON.stringify(data) + "lenght: "+ Object.keys(data).length);
                  
                })
                .error(function(error) {
                  console.log('Error: ' + error);
                });// end http post call
            console.log("this is working")
      }, 4000); // end interval call
      */


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
