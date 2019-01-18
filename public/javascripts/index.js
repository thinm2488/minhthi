var app = angular.module('movie', []);

app.controller('getController', function ($scope, $http) {
    $http.get('api/movie').then(function (res) {

    // Bien chua listphim
       $scope.user = res.data.user;
        $scope.listphim= res.data.listPhimObj.listphim;
        $scope.checkLogin=res.data.checkLogin;
        console.log(res)
    })

    $scope.logOut = function(){
        $http.get('/api/user').then(function (res) {

               var mess= res.data.mess
                console.log(res)
            })

    }
    
   



});