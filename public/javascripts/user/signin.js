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
            $http.post( '/api/user/signin', data).then(function (res) {
                window.console.log(res)
              
                    
                    setCookie('email', $scope.Email);
                    setCookie('tenNguoiDung',res.data.user.tenNguoiDung);
                    window.location.href = "/"
            
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })
        }
    }
    

});
