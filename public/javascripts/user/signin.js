var app= angular.module('movie',[]);

app.controller('userController',function($scope,$http){

    $scope.taoUser = function(){
        var data={
            tenNguoiDung:$scope.tenNguoiDung,
            Email:$scope.Email,
            passWord:$scope.passWord,
            passWordConfim:$scope.passWordConfim

        }
        $http.post(window.location.origin+'/api/user',data).then(function(res){
            window.alert('Tạo phim thành công');
            window.location.href="/"
            console.log(res)
        })
    }
});



       
        
      