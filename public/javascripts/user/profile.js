var app = angular.module('movie', []);

app.controller('profileController', function ($scope, $http) {
    
    
    $scope.checkLogin=true;
    $http.get(window.location.origin+"/api/user/profile").then(function(res){
         $scope.userinfomation= res.data;
        
       
    }).catch(function(res){
        console.log(res)
    })
     
    // $scope.chooseImage=function(){
    
    //     document.getElementById("fileInput").click()}
   

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