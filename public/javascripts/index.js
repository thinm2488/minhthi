var app = angular.module('movie', []);

app.controller('getController', function ($scope, $http) {
    $scope.tenNguoiDung=getCookie("tenNguoiDung");
    $http.get('api/movie').then(function (res) {

    // Bien chua listphim
    $scope.checkLogin= $scope.check();
      
       $scope.listphim= res.data.listPhimObj.listphim; 
       console.log(listphim);
    })

    $scope.logOut = function(){
        $http.get('/api/user/logout').then(function (res) {

              
               delete_cookie('email');
               window.location.href="/"
            })

    }
    $scope.check= function(){
        $scope.email=getCookie("email");
        if(!$scope.email){
           return false;
        }
        
            return true;
        
        
    }
  
    
   



});