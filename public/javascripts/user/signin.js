var app = angular.module('movie', []);

app.controller('loginController', function ($scope, $http) {
    $scope.checkLogin = false;
    $scope.dangNhap = function () {

        if (!$scope.Email) {
            window.alert('Chưa nhập email !')
        }
        else if ($scope.password = '') {
            window.alert('Chưa nhập password !')
        }
        else {
            var data = {
                Email: $scope.Email,
                password: $scope.passWord
            }
            $http.post(window.location.origin + '/api/user/signin', data).then(function (res) {
                window.console.log(res)
                setCookie("nguoiTao",Email);
                if (res.data === true) {
                    window.location.href = "/"
                }
                else {
                    window.alert('Sai email hoặc mật khẩu!')
                }
            }).catch(function(res){
                console.log(res)
            })
        }
    }

});
