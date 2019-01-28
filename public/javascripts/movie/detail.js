var app = angular.module('movie', []);

app.controller('detailController', function ($scope, $http) {
    $scope.id= $('#id').text();
    // $scope.id=res.data._id;
    // $scope.clickUpLoadFilm= function(){
    //     setCookie("movieId",id);
    //     window.location.href=$scope.id +'/edit'
    // }
    $scope.tenNguoiDung=getCookie("tenNguoiDung");
    var email= getCookie("email");
    
        id=$scope.id,
        
    
    

    $http.get("/api/movie/"+ id).then(function(res){
         $scope.thongtinphim= res.data.phim;
         $scope.checkLogin=$scope.check();
         $scope.user=res.data.user;
         $scope.checkuser= function(){
         if(res.data.phim.phim.nguoiTao===email)
         {
             return true;
         }else{
             return false;
         }
         
        }

        
         

         

       
    }).catch(function(res){
        console.log(res)
        window.alert(res.data.errorMessage);
    })
   
    $scope.xoaPhim= function(){
        $http.delete("/api/movie/"+id).then(function(res){

           
            window.location.href="/";
            
            window.alert('Xóa phim thành công!');
            
       }).catch(function(res){
        console.log(res)
        window.alert(res.data.errorMessage);
    })
       
    }
    
        $scope.suaPhim = function () {

            var ngay = $("#datepicker").datepicker("getDate").getTime();
            formData.append("tenPhim", $scope.tenPhim);
            formData.append("moTa", $scope.moTa);
            formData.append("theLoai", $scope.theLoai);
            formData.append("phatHanh", ngay);
            formData.append("id",id);

            $http({
                method: 'PUT',
                url: '/api/movie',
                data: formData,
                headers: { 'Content-Type': undefined }
            }).then(function (res) {
                $scope.checkLogin=check();
                window.alert('Lưu phim thành công');
                window.location.href = "/";
            }).catch(function(res){
                console.log(res)
                window.alert(res.data.errorMessage);
            })

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

//  function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }