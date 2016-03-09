var app = angular.module('tate', []);

app.controller('controller', function ($scope) {




    $scope.themeList = [{
        color: "#F44336",
        active: true
    }];
    $scope.savedTheme = localStorage.getItem('theme');
    $scope.theme = (localStorage.getItem('theme') !== null) ? JSON.parse($scope.savedTheme) : $scope.themeList;
    $scope.themeStyle = (localStorage.getItem('theme') !== null) ? {
        'background-color': $scope.theme[0][0]['color']
    } : {
        'background-color': "#F44336 !important"
    };
    $scope.themeStyleSides = (localStorage.getItem('theme') !== null) ? {
        'border-left': "2px solid " + $scope.theme[0][0]['color'] + "!important",
        'border-bottom': "2px solid " + $scope.theme[0][0]['color'] + "!important"
    } : {
        'border-left': "2px solid " + "#F44336 !important",
        'border-bottom': "2px solid " + "#F44336 !important"
    };

    /**
     * Onload Event for Angular
     * @param {none} none 
     * @return {none} nonea
     */
    $scope.init = function () {

    };

    /**
     * sets current color or theme
     * @param {String} color 
     * @return {none} none
     */
    $scope.setColor = function (color) {
        console.log(color);
        $scope.removeLocalStorage('theme');
        $scope.theme = [];
        $scope.theme.push([{
            color: color,
            active: true
        }]);
        localStorage.setItem('theme', JSON.stringify($scope.theme));
        $scope.themeStyle = {
            'background-color': color

        };
        $scope.themeStyleSides = {
            'border-left': "2px solid " + color,
            'border-bottom': "2px solid " + color
        };
    }

    /**
     * Remove localstorage by key
     * @param {String} Key
     * @return {none} none
     */
    $scope.removeLocalStorage = function (key) {
        localStorage.removeItem(key);
    };







});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();


    geocodeAddress(geocoder, map);

}

function geocodeAddress(geocoder, resultsMap) {

  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
$("img").error(function () {
    $(this).unbind("error").attr("src", "https://s3.amazonaws.com/uifaces/faces/twitter/rogie/128.jpg");
});
$('.nothide').slice(19).hide();
