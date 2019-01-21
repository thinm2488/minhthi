var app = angular.module('movie', []);
var formData= new FormData();
var movieId=getCookie("movieId");

app.controller('editController', function ($scope, $http) {
    var id= $('#id').text();
    $scope.checkLogin=true;
    $scope.tenPhim= res.data.tenPhim,
    $scope.moTa= res.data.mota,
    $scope.theLoai=$scope.data.theloai,
    phatHanh=$scope.data.ngay,
    hinh=$scope.data.hinh
    //option
    $scope.movieType = ['Hanh dong', 'Tinh cam']
    $scope.thename = [
        {name:'Hành Động',value:'Hành Động'},
        {name:'Tình Cảm',value:'Tình Cảm'},
        {name:'Hài',value:'Hài'},
        {name:'Kinh Dị',value:'Kinh Dị'},
        {name:'Hoạt Hình',value:'Hoạt Hình'}
    ]
$scope.theloai= $scope.thename[0].value;
$scope.clickUpImage= function(){
    document.getElementById('fileInput').click()
}

// $scope.chooseImage=function(){
    
//     document.getElementById("fileInput").click()
// }


// });

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             $('#img')
//                 .attr('src', e.target.result);
//         };

//         reader.readAsDataURL(input.files[0]);
       
//              formData.append("hinh",input.files[0]);
        
       
        
//     }
// }


// $scope.clickUploadFilm = function () {
//     if (!$scope.filmName) {
//       document.getElementById('filmName').setCustomValidity('Vui lòng nhập tên phim')
//       return
//     } else {
//       document.getElementById('filmName').setCustomValidity('')
//     }
//     var date = new Date($('#datePicker').datepicker('getDate'))
//     let data = {
//       _id: filmId,
//       name: $scope.filmName,
//       genre: $scope.filmGenre,
//       releaseDate: date.getTime(),
//       content: $scope.filmContent,
//       creatorId: userid
//     }

})
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
 function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }