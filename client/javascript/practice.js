var app = angular.module('app', []);

app.controller('mainController', function($scope){

	$scope.rooms = [
		{roomNo: 'K - 811', bed: '6'},
		{roomNo: 'J - 939', bed: '3'}
	];

	$scope.calculate = function(){
		$scope.rooms.push({roomNo: $scope.roomNo, bed: $scope.bed});
		$scope.roomNo = '';
		$scope.bed = '';
	};

});


