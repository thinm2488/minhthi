var app = angular.module('movie', []);
var formData= new FormData();

app.controller('createController', function ($scope, $http) {

    $scope.tenNguoiDung=getCookie("tenNguoiDung");
    $scope.checkLogin=true;
    $scope.taoPhim = function () {
        // thoi gian hien hanh jquery
        // $scope.tempImage = '../../images/img'
        var email=getCookie("email");    
        var ngay = $("#datepicker").datepicker("getDate").getTime();
        
        formData.append("tenPhim",$scope.tenPhim);
        formData.append("moTa",$scope.moTa);
        formData.append("theLoai",$scope.theLoai);
        formData.append("phatHanh",ngay);
        formData.append("nguoiTao",email)
        
        
        
        $http({
            method  : 'POST',
            url     : '/api/movie',
            data    : formData,
            headers : { 'Content-Type': undefined } 
           }).then(function(res){
                $scope.checkLogin=res.data.checkLogin;
                window.alert('Tạo phim thành công');
                window.location.href="/";
           }).catch(function(res){
            console.log(res)
        })

      
        // var data = {
        //     tenPhim: $scope.tenPhim,
        //     moTa: $scope.mota,
        //     theLoai:$scope.theloai,
        //     phatHanh:ngay
        // }
       
        
        // $http.post('/api/movie', data).then(function (res) {
        //     //gui note thong bao
        //     window.alert('Tạo phim thành công');
        //     window.location.href="/"
        //     console.log(res)
        // })
    }
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

$scope.chooseImage=function(){
    
    document.getElementById("fileInput").click()
}

$scope.logOut = function(){
    $http.get('/api/user').then(function (res) {

           var mess= res.data.mess;
           window.location.href="/"
        })

}
});

function readURL(input) {
    if (input.files  && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
       
             formData.append("hinh",input.files[0]); 
    }
}