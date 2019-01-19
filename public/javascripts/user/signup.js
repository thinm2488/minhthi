var app= angular.module('movie',[]);

app.controller('userController',function($scope,$http){

    $scope.taoUser = function(){
        
        if(!$scope.tenNguoiDung){
            window.alert('Chưa nhập tên người dùng !')
        }
        else if(!$scope.Email){
            window.alert('Chưa nhập email !')
        }
        else if(!$scope.password){
            window.alert('Chưa nhập password !')
        }
        else if($scope.passWordConfim!==$scope.password){
            window.alert('Xác nhận mật khẩu không đúng !')
        }
        else{
            var data={
        
                tenNguoiDung:$scope.tenNguoiDung,
                Email:$scope.Email,
                password:$scope.password,
                passWordConfim:$scope.passWordConfim
    
            }
            
            $http.post(window.location.origin+'/api/user',data).then(function(res){
                window.alert('Đăng ký thành công');
                window.location.href="/"
            })
        }
        



        
        
    }

});



       
        
      