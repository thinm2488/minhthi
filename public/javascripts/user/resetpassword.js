var app = angular.module('movie', []);

app.controller('resetPasswordController', function ($scope, $http) {
    $scope.checkLogin = false;
    $scope.resetpassword = function () {

        if (!$scope.Email) {
            window.alert('Chưa nhập email !')
        }
        else {
            var data = {
                Email: $scope.Email,
            }
            $http.put( '/api/user/passwordReset', data).then(function (res) {
                window.console.log(res)
            
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })
        }
    }
    

});
