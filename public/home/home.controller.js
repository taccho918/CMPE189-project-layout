(function() { 
   angular
      .module('meanApp')
      .controller('homeCtrl', homeCtrl);
   homeCtrl.$inject = ['$scope', '$location', 'authentication'];

   function homeCtrl ($scope, $location, authentication) {
      //console.log('Home Controller is Running');
      
      //Check Logged In and Hide Sign In Form
      $scope.loggedIn = authentication.isLoggedIn();
      if ($scope.loggedIn) {
         document.getElementById('welcome_text').style.paddingRight = "0px";
      } else {
         document.getElementById('welcome_text').style.paddingRight = "300px";
      }
      $scope.form = {
         email : "",
         password : ""
      };
      //Login In Function
      $scope.signIn = function () {
         authentication
            .login($scope.form)
            .error(function(err) {
               $scope.message = "Invalid information. Please try again.";
               console.log($scope.message);
            })
            .then(function () {
               $location.path('profile');
            });
      };
   }

})();