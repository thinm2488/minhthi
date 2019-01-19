var app= angular.module('movie',[]);

app.controller('loginController',function($scope,$http){
    $scope.checkLogin=false;
    $scope.dangNhap = function(){
       
        if(!$scope.Email){
            window.alert('Chưa nhập email !')
        }
        else if(!$scope.password){
            window.alert('Chưa nhập password !')
        }
        else{
            var data={
            
                Email:$scope.Email,
                password:$scope.passWord
                
    
            }
            $http.post(window.location.origin+'/api/user/login',data).then(function(res){
                window.console.log(res)
                if(res.data===true){
                    window.alert('Đăng nhập thành công');
                    window.location.href="/"
                }
                else{
                    window.alert('Sai email hoặc mật khẩu!')
                }
               
                
               
            })
            
        }
       
        
        
    }

});
