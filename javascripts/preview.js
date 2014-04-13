//= require socket.js

var myAppPreview = angular.module('myAppPreview', [
    'socket'
]);

myAppPreview.controller('appPreview', ['$scope', '$http', 'socket', '$sce',
    function($scope, $http, socket, $sce) {
        socket.on('renderHtml', function(html) {
            document.body.innerHTML = html;
        });

        socket.on('renderCss', function(css) {
            flashCss(css);
        });

        var cssi = 0;

        function flashCss(data) {
            var s = document.getElementById('css-' + cssi);
            var sn = document.createElement('style');
            cssi++;
            sn.id = 'css-' + cssi;
            sn.type = 'text/css';
            sn.innerHTML = data;
            s.parentNode.insertBefore(sn, s);
            s.parentNode.removeChild(s);
        }
        socket.on('renderJs', function(timer) {
            flashJs(timer);
        });

        var jsi = 0;

        function flashJs(t) {
            var s = document.getElementById('js-' + jsi);
            var sn = document.createElement('script');
            jsi++;
            sn.id = 'js-' + jsi;
            sn.type = 'text/javascript';
            sn.src = 'js.js?_t=' + t;
            s.parentNode.insertBefore(sn, s);
            s.parentNode.removeChild(s);
        }
    }
]);
