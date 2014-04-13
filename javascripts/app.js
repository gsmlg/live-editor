//= require socket
var myApp = angular.module('myApp', [
    'ui.bootstrap',
    'ui.ace',
    'socket'
]);


myApp.controller('appCtrl', ['$scope', '$http', 'socket',
    function($scope, $http, socket) {

        $scope.editorW = 'col-md-6';

        $scope.html = '';
        $scope.css = '';
        $scope.js = '';
        $scope.jsType = 'origin';

        $scope.oneAtATime = true;

        var baseUrl = 'preview';
        $scope.preview = baseUrl;

        $scope.isShown = false;
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

        $scope.cssLoaded = function(_editor) {
            $scope.changeCssMode = function(mode) {
                _editor.getSession().setMode('ace/mode/' + mode);
            }
        }

        $scope.jsLoaded = function(_editor) {
            $scope.changeJsMode = function(mode) {
                _editor.getSession().setMode('ace/mode/' + mode);
            }
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
            var js = {
                type: $scope.jsType,
                content: $scope.js
            }
            socket.emit('js', js);
        }

        $scope.jsTypeChange = function(e) {
            $scope.jsType = e;
            $scope.changeJsMode(e);
        }


    }
]);
