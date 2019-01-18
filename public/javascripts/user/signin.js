var app= angular.module('movie',[]);

app.controller('loginController',function($scope,$http){
    $scope.checkLogin=false;
    $scope.dangNhap = function(){
        var data={
            
            Email:$scope.Email,
            password:$scope.passWord
            

        }
        $http.post(window.location.origin+'/api/user/login',data).then(function(res){
            window.alert('Đăng nhập thành công');
            window.location.href="/"
            console.log(res)
        })
    }

});
