var app = angular.module('movie', []);

app.controller('profileController', function ($scope, $http) {
    
    $scope.tenNguoiDung=getCookie("tenNguoiDung");
    $scope.checkLogin=true;
    $http.get(window.location.origin+"/api/user/profile").then(function(res){
         $scope.userinfomation= res.data.userInfomation;
        
        //  $scope.checkImage=function(){
        //     if(!res.data.hinh){
        //         return true;
        //     }else{
        //         return false;
        //     }
             
        //  }
        
       
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
        $http.put("/api/user/changepass",data).then(function(res){
           if(res.data.check===true){
            window.alert("Đổi mật khẩu thành công")
            window.location.href="/"
           }else{
                window.alert("Mật Khẩu cũ không đúng!")
            }
           
          
                 
        });
    
    }
}

     
    // $scope.chooseImage=function(){
    
    //     document.getElementById("fileInput").click()}
   
    $scope.logOut = function(){
        $http.get('/api/user').then(function (res) {

            
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