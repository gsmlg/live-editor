//= require socket
var myApp = angular.module('myApp', [
    'ui.bootstrap',
    'ui.ace',
    'ngRoute',
    'socket'
]);


myApp.controller('appCtrl', ['$scope', '$http', 'socket',
    function($scope, $http, socket) {

        $scope.editorW = 'col-md-6';

        $scope.html = '';
        $scope.css = '';
        $scope.js = '';

        $scope.oneAtATime = true;

        var baseUrl = 'preview';
        $scope.preview = baseUrl;

        $scope.isShown = true;
        $scope.showPreview = function() {
            if ($scope.isShown) {
                $scope.preview = '/404';
                $scope.isShown = false;
                $scope.editorW = 'col-md-12';
            } else {
                $scope.preview = baseUrl;
                $scope.isShown = true;
                $scope.editorW = 'col-md-6';
            }
        }

        $scope.openPreview = function() {
            window.open(baseUrl);
        }

        $scope.htmlLoaded = function() {
            $scope.html_isopen = true;
        }

        $scope.cssLoaded = function() {

        }

        $scope.jsLoaded = function() {

        }

        $scope.htmlChange = function(e) {
            $scope.html = e[1].getValue();
            socket.emit('html', $scope.html);
        }

        $scope.cssChange = function(e) {
            $scope.css = e[1].getValue();
            socket.emit('css', $scope.css);
        }

        $scope.jsChange = function(e) {
            $scope.js = e[1].getValue();
            socket.emit('js', $scope.js);
        }


    }
]);
