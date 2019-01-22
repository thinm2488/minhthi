var app = angular.module('movie', []);

app.controller('detailController', function ($scope, $http) {
    $scope.id= $('#id').text();
    // $scope.id=res.data._id;
    // $scope.clickUpLoadFilm= function(){
    //     setCookie("movieId",id);
    //     window.location.href=$scope.id +'/edit'
    // }
    
    var data= {
        id:$scope.id,
    
    }

    $http.post("/api/movie/detail", data).then(function(res){
         $scope.thongtinphim= res.data.phim;
         $scope.checkLogin=res.data.checkLogin;
         $scope.user=res.data.user;
         

         

       
    }).catch(function(res){
        console.log(res)
    })
   
    $scope.xoaPhim= function(){
        $http.post("/api/movie/xoadetail", data).then(function(res){
            $scope.checkLogin=res.data.checkLogin;
            var mess= res.data.result.mess;
            window.alert(mess);
            window.location.href="/";;
            
       }).catch(function(res){
           console.log(res)
       })
       
    }
    

   

});

//  function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }