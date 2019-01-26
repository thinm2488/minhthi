// var app = angular.module('movie', []);
var app = angular.module('movie', []);
var formData= new FormData();
app.controller('editController', function ($scope, $http) {
    var id = $('#id').text();
    // $scope.id=res.data._id;
    // $scope.clickUpLoadFilm= function(){
    //     setCookie("movieId",id);
    //     window.location.href=$scope.id +'/edit'
    // }
    $scope.check= function(){
        $scope.email=getCookie("email");
        if(!$scope.email){
           return false;
        }
        
            return true;
    }
    
    $scope.tenNguoiDung=getCookie("tenNguoiDung");
   

        id= id,
    
    $http.get("/api/movie/"+id).then(function (res) {
        $scope.tenPhim = res.data.phim.phim.tenPhim;
        $scope.theLoai = res.data.phim.phim.theLoai;
        $scope.phatHanh = res.data.phim.phim.phatHanh;
        $scope.moTa = res.data.phim.phim.moTa;
        $scope.hinh = res.data.phim.phim.hinh;
        $scope.checkLogin=$scope.check();

        $scope.movieType = ['Hanh dong', 'Tinh cam']
        $scope.thename = [
            { name: 'Hành Động', value: 'Hành Động' },
            { name: 'Tình Cảm', value: 'Tình Cảm' },
            { name: 'Hài', value: 'Hài' },
            { name: 'Kinh Dị', value: 'Kinh Dị' },
            { name: 'Hoạt Hình', value: 'Hoạt Hình' }
        ]
        $scope.theloai = $scope.thename[0].value;

        //     $http.put("/api/movie/detail",id).then(function(res){
        //         $scope.tenPhim=res.data.phim.phim.tenPhim;
        //         $scope.theLoai=res.data.phim.phim.theLoai;
        //         $scope.phatHanh=res.data.phim.phim.phatHanh;
        //         $scope.moTa=res.data.phim.phim.moTa;
        //         $scope.hinh=res.data.phim.phim.hinh;
        //         $scope.checkLogin=res.data.checkLogin;

        //     })

        //     }).catch(function(res){
        //         console.log(res)
        //     })


       

     
    });
    
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
            window.alert('Lưu phim thành công');
            window.location.href = "/";
        }).catch(function (res) {
            console.log(res)
        })

    }

    $scope.chooseImage = function () {

        document.getElementById("fileUpdate").click()
    }


    $scope.logOut = function(){
        $http.get('/api/user/logout').then(function (res) {

               delete_cookie('email');
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

        formData.append("hinh", input.files[0]);
    }
}