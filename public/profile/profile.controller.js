(function() {

   angular
      .module('meanApp')
      .controller('profileCtrl', profileCtrl);
   profileCtrl.$inject = ['$scope', '$location', 'meanData', '$http', 'authentication', '$state', 'filepickerService'];
   
   function profileCtrl($scope,$location, meanData,$http,authentication, $state, filepickerService) {      
      $scope.reload = function(){
         meanData.getProfile()
            .success(function(data) {
               data.profileImage = 'https://cdn.filestackcontent.com/QB2JKF6STeTpI7EP6u5d';
               $scope.user = data;
               console.log('Profile Controller: ' + data.email+ 'account id'+data.accountID);
            })
            .error(function (e) {
               console.log(e);
            });
         $scope.closeAlert();
      };

      $scope.uploadUserPhoto = function () {
         filepickerService.pick({
            mimetype: 'image/*',
            language: 'en',
            services: ['COMPUTER','DROPBOX','GOOGLE_DRIVE','IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
            openTo: 'IMAGE_SEARCH'
         },
            function(data){
            console.log(JSON.stringify(data));
            $scope.user.profileImage = data;
            $scope.updateUserPhoto();
         });
      };
      $scope.updateUserPhoto = function () {
         console.log("Upload Profile Picture");
         $http.post('/api/profile/updateUserPhoto', $scope.user)
            .success(function(data){
               console.log(JSON.stringify(data));                      
            })
            .error(function(data) {
               console.log('Error: ' + data);
            });
      };
      $scope.updateUser = function () {
         $http.post('/api/profile/updateUser', $scope.user)
            .success(function(data){
               console.log(JSON.stringify(data));
               $scope.editMessage = "Profile Updated Successful!";
               document.getElementById('editAlert').classList.add("alert-success");
            })
            .error(function(data){
               console.log('Profile Controller Error on Updating User');
               console.log(data);
               $scope.editMessage = "Profile Update Failed";
               document.getElementById('editAlert').classList.add("alert-danger");
            })
         $('.alert').show();
      };
      $scope.closeAlert = function () {
         console.log("Closing");
         if ($scope.editMessage == "Profile Updated Successful!")
            document.getElementById('editAlert').classList.remove('alert-success');
         else
            document.getElementById('editAlert').classList.remove('alert-danger');
         $scope.editMessage = "";
         document.getElementById('editAlert').style.display = "none";
      }

      $scope.user = {};
      if (!authentication.isLoggedIn()) {
         $state.go("login");
      } else {
         $scope.reload();
      }
   }
})();