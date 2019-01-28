var app = angular.module('movie', []);

app.controller('profileController', function ($scope, $http) {
    
    $scope.tenNguoiDung=getCookie("tenNguoiDung");
    $scope.checkLogin=true;
    $http.get(window.location.origin+"/api/user/profile").then(function(res){
         $scope.userinfomation= res.data.userInfomation;

        }).catch(function(res){
        console.log(res)
    })
    $scope.changePassword=function(){
        if(!$scope.oldPassword){
            window.alert('Chưa nhập password !')
        }
        else if($scope.confirmPassword!==$scope.newPassword){
            window.alert('Xác nhận mật khẩu không đúng !')
        }
        else{
            $scope.Email=getCookie("email");
        var data={
            oldPassword:$scope.oldPassword,
            newPassword:$scope.newPassword,
            Email:$scope.Email
        }
        $http.put("/api/user/password",data).then(function(res){
            window.alert("Đổi mật khẩu thành công")
            window.location.href="/"
        }).catch(function(res){
            console.log(res)
            window.alert(res.data.errorMessage);
        })
    
    }
}

     
    // $scope.chooseImage=function(){
    
    //     document.getElementById("fileInput").click()}
   
    $scope.logOut = function(){
        $http.get('/api/user/logout').then(function (res) {

            
               delete_cookie('email');
               window.location.href="/"
            })

    }
    $scope.check= function(){
        $scope.email=getCookie("email");
        if(!$scope.email){
           return false;
        }
        
            return true;
        
        
    }
});
// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             $('#img')
//                 .attr('src', e.target.result);
//         };

//         reader.readAsDataURL(input.files[0]);
//         formData.append("hinh",input.files[0]);
               
         
//     }
// }