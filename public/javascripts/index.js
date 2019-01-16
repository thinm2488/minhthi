var app = angular.module('movie', []);

app.controller('getController', function ($scope, $http) {
    $http.get('api/movie').then(function (res) {

    // Bien chua listphim
        $scope.listphim= res.data.listphim.listphim;
        console.log(res)
    })

});