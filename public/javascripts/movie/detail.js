var app = angular.module('movie', []);

app.controller('detailController', function ($scope, $http) {
    var id= $('#id').text();

    var data= {
        id:id
    }

    $http.post("/api/movie/detail", data).then(function(res){
         $scope.thongtinphim= res.data.phim.phim;
        console.log(res)
       
    })

   

});