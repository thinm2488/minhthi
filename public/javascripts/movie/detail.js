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
    var data= {
        id:$scope.id,
        email
    
    }

    $http.post("/api/movie/detail", data).then(function(res){
         $scope.thongtinphim= res.data.phim;
         $scope.checkLogin=res.data.checkLogin;
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
    })
  
   
    $scope.xoaPhim= function(){
        $http.post("/api/movie/xoadetail", data).then(function(res){
            $scope.checkLogin=res.data.checkLogin;
            window.alert('Xóa phim thành công!');
            window.location.href="/";
            
       }).catch(function(res){
           console.log(res)
       })
       
    }
    

    $scope.logOut = function(){
        $http.get('/api/user').then(function (res) {

               
               window.location.href="/"
            })

    } 

});

//  function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }