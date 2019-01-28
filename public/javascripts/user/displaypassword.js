var app = angular.module('movie', []);

app.controller('displayPasswordController', function ($scope, $http) {
    $scope.token =  $('#token').text();


            $http.put( '/api/user/resetpassword/'+$scope.token).then(function (res) {
                window.console.log(res)
                
                $scope.newpass=res.data.newpass;
                    
                    setCookie('email', res.data.user.Email);
                    setCookie('tenNguoiDung',res.data.user.tenNguoiDung);
                  
            
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })
        

});
