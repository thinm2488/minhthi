var app= angular.module('movie',[]);

app.controller('userController',function($scope,$http){

    $scope.taoUser = function(){
        var data={
            tenNguoiDung:$scope.tenNguoiDung,
            Email:$scope.Email,
            password:$scope.password,
            passWordConfim:$scope.passWordConfim

        }
        $http.post(window.location.origin+'/api/user',data).then(function(res){
            window.alert('Đăng ký thành công');
            window.location.href="/"
            console.log(res)
        })
    }
});



       
        
      