var app = angular.module('movie', []);

app.controller('detailController', function ($scope, $http) {
    var id= $('#id').text();
    // $scope.id=res.data._id;
    // $scope.clickUpLoadFilm= function(){
    //     setCookie("movieId",id);
    //     window.location.href=$scope.id +'/edit'
    // }
    $scope.checkLogin=true;
    var data= {
        id:id
    }

    $http.post("/api/movie/detail", data).then(function(res){
         $scope.thongtinphim= res.data.phim;
        
       
    }).catch(function(res){
        console.log(res)
    })


   

});

 function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }