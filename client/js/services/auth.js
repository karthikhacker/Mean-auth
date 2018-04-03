myApp.factory('Auth',function($http,AuthToken){
  var authFactory = {};

  //signin
  authFactory.signin = function(user){
  	 return $http.post('/api/signin',user);
  }//signin

  //isLoggedIn
  authFactory.isLoggedIn = function(){
     if(AuthToken.getToken()){
     	return true;
     }else{
     	return false;
     }
  }//isLoggedIn

  //getUser
  authFactory.getUser = function(){
  	 if(AuthToken.getToken()){
  	 	return $http.get('/api/profile');
  	 }else{
  	 	return $q.reject({message:'User has not token'});
  	 }
  }

  //Signout
  authFactory.signout = function(){
  	 AuthToken.setToken();
  }

  //user permission
  // authFactory.getPermission = function(){
  //    return $http.get('/api/permission');
  // }

  return authFactory;
});

myApp.factory('AuthToken',function($window){
  var tokenFactory = {};
  //get token 
  tokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  }//token factory

  //set token
  tokenFactory.setToken = function(token){
  	 if(token){
  	 	$window.localStorage.setItem('token',token);
  	 }else{
  	 	$window.localStorage.removeItem('token');
  	 }
  }
  return tokenFactory;
});

myApp.factory('AuthInterceptor',function(AuthToken){
   var interceptorFactory = {};
   interceptorFactory.request = function(config){
     var token = AuthToken.getToken();
     if(token){
       config.headers['x-access-token'] = token;
     }
     return config;
   }
   return interceptorFactory;
});