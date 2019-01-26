

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
                passWordConfim:$scope.passWordConfim,
                hinh: 'user.png'
    
            }
            
            $http.post(window.location.origin+'/api/user/signup',data).then(function(res){
                console.log(res)
                setCookie('email',res.data.user.user.Email);
                setCookie('tenNguoiDung',res.data.user.user.tenNguoiDung);
                window.alert('Đăng ký thành công');
                window.location.href="/"
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })
        }
        
        


        
        
    }
   
    

});



       
        
      