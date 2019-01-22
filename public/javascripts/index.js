var app = angular.module('movie', []);

app.controller('getController', function ($scope, $http) {
    $http.get('api/movie').then(function (res) {

    // Bien chua listphim
       $scope.user = res.data.user;
      
       $scope.checkLogin=res.data.checkLogin;
       $scope.listphim= res.data.listPhimObj.listphim;
       
       console.log(listphim);
        
    //    for( var i=listphim[length-1];i>=0;i--){
    //    }return listphim;
    
        console.log(res)
    })

    $scope.logOut = function(){
        $http.get('/api/user').then(function (res) {

               var mess= res.data.mess;
               window.location.href="/"
            })

    }
    
    
   



});