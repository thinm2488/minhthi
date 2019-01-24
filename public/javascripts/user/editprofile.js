var app = angular.module('movie', []);
var formData= new FormData();

app.controller('editprofileController', function ($scope, $http) {
    
    
    $scope.checkLogin=true;
    $http.get("/api/user/profile").then(function(res){
        $scope.tenNguoiDung = res.data.userInfomation.tenNguoiDung;
        $scope.Email = res.data.userInfomation.Email;
        $scope.hinh =res.data.userInfomation.hinh;
        // $scope.checkImage=function(){
        //     if(!res.data.hinh){
        //         return true;
        //     }else{
        //         return false;
        //     }
             
        //  }
             
    });

    $scope.editProfile = function () {
       
        formData.append("tenNguoiDung",$scope.tenNguoiDung);
        formData.append("Email", $scope.Email);
    
        $http({
            method: 'PUT',
            url: '/api/user',
            data: formData,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            window.alert('Lưu thông tin thành công');
            setCookie("tenNguoiDung",res.data.user.tenNguoiDung)
            window.location.href = "/";
        }).catch(function (res) {
            console.log(res)
        })
       
    }
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
           var mess=res.data.mess;
           window.alert(mess);
           if(data.check==true){
            window.location.href="/"
           }
           
          
                 
        });
    
    }
}
    
    $scope.chooseImage=function(){
    
        document.getElementById("fileUpdateImage").click()
    }
    $scope.logOut = function(){
        $http.get('/api/user').then(function (res) {

               var mess= res.data.mess;
               window.location.href="/"
            })

    }
 
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
        formData.append("hinh",input.files[0]);
               
         
    }
}