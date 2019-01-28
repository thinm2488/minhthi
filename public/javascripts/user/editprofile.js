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
            url: window.location.origin+'/api/user',
            data: formData,
            headers: { 'Content-Type': undefined }
        }).then(function (res) {
            window.alert('Lưu thông tin thành công');
            setCookie("tenNguoiDung",res.data.user.tenNguoiDung)
            window.location.href = "/";
        }).catch(function (res) {
            console.log(res)
            window.alert(res.data.errorMessage);
        })
       
    }
   
    
    $scope.chooseImage=function(){
    
        document.getElementById("fileUpdateImage").click()
    }
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