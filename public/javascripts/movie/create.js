var app = angular.module('movie', []);

app.controller('createController', function ($scope, $http) {
    $scope.taoPhim = function () {
        // thoi gian hien hanh jquery
        var ngay = $("#datepicker").datepicker("getDate").getTime();
      
        var data = {
            tenPhim: $scope.tenPhim,
            moTa: $scope.mota,
            theLoai:$scope.theloai,
            phatHanh:ngay
        }
       
        
        $http.post('/api/movie', data).then(function (res) {
            //gui note thong bao
            window.alert('Tạo phim thành công');
            console.log(res)
        })
    }

    $scope.thename = [
        {name:'Hành Động',value:'Hành Động'},
        {name:'Tình Cảm',value:'Tình Cảm'},
        {name:'Hài',value:'Hài'},
        {name:'Kinh Dị',value:'Kinh Dị'},
        {name:'Hoạt Hình',value:'Hoạt Hình'}
    ]
$scope.theloai= $scope.thename[0].value;
});