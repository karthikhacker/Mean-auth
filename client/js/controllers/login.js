myApp.controller('AuthController',function($scope,$rootScope,Auth,AuthToken,$location,$timeout,$interval,$window){
  
  //check session
  // $scope.checkSession = function(){
  //   if(Auth.isLoggedIn()){
  //      $scope.checkingSession = true;
  //      var interval = $interval(function(){
  //        //console.log('test');
  //        var token = $window.localStorage.getItem('token');
  //        if(token === null){
  //          $interval.cancel(interval);
  //        }else{
  //           self.parseJwt = function(token){
  //              var base64Url = token.split('.')[1];
  //              var base64 = base64Url.replace('-','+').replace('_','/');
  //              return JSON.parse($window.atob(base64));
  //           }
  //           var expireTime = self.parseJwt(token); 
  //           var timestamp = Math.floor(Date.now() / 1000);
  //           //console.log(expireTime.exp);
  //           //console.log(timestamp);
  //           var timeCheck = expireTime.exp - timestamp;
  //           //console.log(timeCheck);
  //           if(timeCheck <= 0){
  //              console.log('Token expired');
  //              $scope.showModal(1);
  //              $interval.cancel(interval);
  //           }else{
  //              console.log('TOken not expired');
  //           }
  //        }
  //      },2000);
  //   }
  // }

  //$scope.checkSession();

  //show modal
  // $scope.showModal = function(option){
  //    this.choiceMade = false;
  //    this.modalTitle = undefined;
  //    this.modalBody =  undefined;

  //    if(option === 1){
      
  //    this.modalTitle = 'Timeout warning';
  //    this.modalBody = 'Your session will expire in 5mins.';
  //    $('#myModal').modal({backdrop: "static"});
     
  //    }else if(option === 2){
  //      //Logout
  //      this.modalTitle = 'Logging out';
  //      $('#myModal').modal({backdrop: "static"});
  //    }
  //    $timeout(function(){
  //      if(!this.choiceMade){
  //        console.log('Loggedout.');
  //        $scope.hideModal();
  //      }
  //    },4000);
     
  // }//show Modal

  //renewSession
  // $scope.renewSession = function(){
  //   this.choiceMade = true;
  //   console.log('Your session has been renewd.');
  //   $scope.hideModal();
  // }
  // //end session
  // $scope.endSession = function(){
  //   this.choiceMade = true;
  //   console.log('your session has ended.');
  //   $scope.hideModal();
  // }

  // //hide modal
  // $scope.hideModal = function(){
  //    $('#myModal').modal('hide');
  // }

  //isLoggedIn
  $scope.isLog = function(){
     if(Auth.isLoggedIn()){
     	return true;
     }else{
     	 return false;
     }
  }

  $rootScope.$on('$routeChangeStart',function(){
      // if(!$scope.checkSession()) $scope.checkSession();

      if(Auth.isLoggedIn()){
	  	 Auth.getUser().then(function(data){
          $scope.username = data.data.username;
          $scope.email = data.data.email;
          $scope.id = data.data.id;
          $scope.created_at = data.data.created_at;
          
	  	 });
	  	 return true;
	  }else{
	  	return false;
	  }
	
  });
 

  //Login 
  $scope.login = function(){
  	$scope.errorMsg = false;
  	var login_data = {'username':$scope.username,'password':$scope.password};
	  Auth.signin(login_data).then(function(data){
	  	if(data.data.success){
	  		$scope.successMsg = data.data.message;
	  		AuthToken.setToken(data.data.token);
	  		$timeout(function(){
	  			$location.path("/profile");
         
	  		},3000);
	  	}else{
	  		$scope.errorMsg = data.data.message;
	  	}
	  });
  }//login

  //logout
  $scope.logout = function(){
  	Auth.signout();
    $timeout(function(){
      $location.path('/login');
    },3000);
  }//logout
  
});