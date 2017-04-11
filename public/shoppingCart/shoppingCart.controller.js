(function() { 
  angular
    .module('meanApp')
    .controller('shoppingCartController', shoppingCartController);
  shoppingCartController.$inject = ['$location','$http','$scope', 'authentication', 'meanData', 'filepickerService', '$state','$window'];

  function shoppingCartController ($location, $http, $scope, authentication, meanData, filepickerService, $state,$window) {
   
    $scope.shoppingCartItems = {};
    
    // dont need to check for thic loggedin but just do it anyway for making sure
    if (authentication.isLoggedIn()){
       //user.accountId= authentication.currentUser()._id;
  
    }
    else{
      return;
    }  

    $http.post('/api/shoppingCart/get',authentication.currentUser())
      .success(function(data){
        console.log(JSON.stringify(data));
        $scope.shoppingCartItems = data;
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
    
    
    //Redirects to Paypal Payment
    $scope.makePaypalPayment = function(){
      console.log("Paypal Payment Processing");
      $http.post('/create', $scope.item)
        .success(function(data){
          console.log('Paypal Payment Success: '+JSON.stringify(data));   
          $window.location.href=data.link;
        })
        .error(function(data) {
          console.log('Paypal Payment Error: ' + data);
        });
    };// end make paypal payment


   
    
    
  }// end detailController function

})();