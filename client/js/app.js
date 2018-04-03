var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($httpProvider){
 $httpProvider.interceptors.push('AuthInterceptor');
});

myApp.run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){
  $rootScope.$on('$routeChangeStart',function(event,next,current){
      if(next.$$route.authenticated == true){
      	 //console.log('Needs to be authenticated');
      	 if(!Auth.isLoggedIn()){
      	 	event.preventDefault();
      	 	$location.path('/');
      	 }else if(next.$$route.permission){
            Auth.getPermission().then(function(data){
              if(next.$$route.permission[0] !== data.data.permission){
                 if(next.$$route.permission[1] !== data.data.permission){
                    event.preventDefault();
                    $location.path('/');
                 }
              }
            });
         }
      }else if(next.$$route.authenticated == false){
      	 //console.log('NO need to autheicated.');
      	 if(Auth.isLoggedIn()){
      	 	event.preventDefault();
      	 	$location.path('/profile');
      	 }
      }
  });
}]);

myApp.config(function($routeProvider){
 $routeProvider
 .when('/',{
 	templateUrl:'views/home.html'
 })
 .when('/login',{
 	templateUrl:'views/login.html',
 	controller:'AuthController',
 	authenticated:false
 })
 .when('/signup',{
 	templateUrl:'views/signup.html',
 	controller:'SignupController',
 	authenticated:false
 })
 .when('/profile',{
 	templateUrl:'views/profile.html',
 	authenticated:true
 })
 .when('/management',{
    templateUrl:'views/management.html',
    controller:'managementController',
    authenticated:true,
    permission:['admin','moderator']
 })
 
});