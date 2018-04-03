myApp.service('User',function($http){
   this.create = function(user){
   	 return $http.post('/api/signup',user);
   }

   this.checkUsername = function(user){
   	  return $http.post('/api/checkusername',user);
   }
   
   this.checkEmail =  function(user){
   	  return $http.post('/api/checkemail',user);
   }

   //permissions
   // this.getUsers = function(){
   // 	 return $http.get('/api/management');
   // }

   // //delete
   // this.deleteUser = function(username){
   //    return $http.delete('/api/management/' + username);
   // }
});