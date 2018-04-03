myApp.controller('SignupController',function($scope,User,$timeout,$location){
 //signup
 $scope.signup = function(valid){
 	if(valid){
        $scope.errorMsg = false;
    var signup_data = {'username':$scope.username,'email':$scope.email,'password':$scope.password};
    User.create(signup_data).then(function(data){
         if(data.data.success){
             $scope.successMsg = data.data.message;
             $timeout(function(){
                 $location.path('/login');
             },3000)
         }else{
            $scope.errorMsg = data.data.message;
         }
    });  
    }else{
        $scope.errorMsg = "All fields are required.";
    }
 }
 
 //check username
 $scope.usernameChecker = function(){
    $scope.usernameMsg = false;
    $scope.usernameInvalid = false;
    var username = {'username':$scope.username};
    User.checkUsername(username).then(function(data){
       if(data.data.success){
         $scope.usernameInvalid = false;
         $scope.usernameMsg = data.data.message;
       }else{
         $scope.usernameInvalid = true;
         $scope.usernameMsg = data.data.message
       }
       //console.log(data);
    });
 }//check username

 //check email
 $scope.emailChecker = function(){
    $scope.emailMsg = false;
    $scope.emailInvalid = false;
     var email = {'email':$scope.email};
    User.checkEmail(email).then(function(data){
       if(data.data.success){
          $scope.emailInvalid = false;
          $scope.emailMsg = data.data.message;
       }else{
          $scope.emailInvalid = true;
          $scope.emailMsg = data.data.message;
       }
        //console.log(data);
    });
 }

});