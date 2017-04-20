(function() { 
  angular
    .module('meanApp')
    .controller('detailController', detailController);
  detailController.$inject = ['$location','$http','$scope','$stateParams', 'authentication', 'meanData', 'filepickerService', '$state','$window'];

  function detailController ($location, $http, $scope, $stateParams, authentication, meanData, filepickerService, $state,$window) {
   
    $scope.item = {};
    $scope.cartQuantity = 1;
    let id = $stateParams.random;

    $http.get('/api/product/getOne/'+id)
      .success(function(data){
        console.log(JSON.stringify(data));
        $scope.item = data;
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


    // add item to shopping cart
    /*need these inputs: productId, accountId, quantity, price 
     * 
     */

    $scope.addToShoppingCart =  function(){
      if ($scope.cartQuantity>$scope.item.quantity){
        $window.alert("Please Input Quantity Less Than The Available Number");
        return;
      }

      if (authentication.isLoggedIn()){
        var item = {
                accountId: authentication.currentUser()._id,
                productId: $scope.item.productId,
                price: $scope.item.price,
                quantity: $scope.cartQuantity,
                name: $scope.item.name,
                image: $scope.item.image1URL
              };
          console.log('before adding to shopping cart successfully: '); 
        $http.post('/api/shoppingCart/add',item)
            .success(function(data){
              console.log('adding to shopping cart successfully: '+data);   
              $window.alert("successfully Add Item to Your shoppingCart");
            })
            .error(function(data) {
              console.log('adding to shoppin g cart error: ' + data);
            });// end $http call
      }// end if 
      else{
        $window.alert("Please Signup or Signin To Add Item To Your Cart");
        return;
      }

      
    }; //end add to shopping cart 
    function initMap(){
      var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: {lat: 37.712, lng: -122.092}
            });
    }
    // not in use yet
     initMap();
    
  }// end detailController function

})();