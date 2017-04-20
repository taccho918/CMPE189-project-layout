(function() { 
  angular
    .module('meanApp')
    .controller('productCtrl', productCtrl);
   productCtrl.$inject = ['$location','$http','$scope','authentication'];

    function productCtrl ($location,$http,$scope, authentication) {
      $scope.categories = ['All', 'TV','Tablet','Laptop','Smart Phone'];
      $scope.selectedCategory = $scope.categories[0];
      $scope.displayedItems = [];
      $scope.loggedIn = authentication.isLoggedIn();

      //Retrieve all the products to show on product page
      $http.get('/api/product/getAll')
        .success(function(data){
          //console.log(JSON.stringify(data));
          $scope.displayedItems = data;
        })
        .error(function(error) {
          console.log('Error: ' + error);
        });

      $scope.filter = function(category) {
        //console.log("Filtered Category: " + category);
        $scope.selectedCategory = category;
        if (category == "All") {
          $scope.displayedItems = $scope.rentItems;
          return;
        }
        $http.get()

        $http.get('/api/lendingItemCategory/get/'+category)
        .success(function(data){
          console.log(JSON.stringify(data));
          $scope.requestedItems = data;
        })
        .error(function(error) {
          console.log('Error: ' + error);
        });
      

        $scope.displayedItems = [];
        for (let i = 0; i < $scope.rentItems.length; i++) { 
          let item = $scope.rentItems[i];
          if (item.category == category)
            $scope.displayedItems.push(item);
        }
      }


      
    }// end requestController

})();