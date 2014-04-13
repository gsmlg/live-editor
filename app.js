var express = require('express'),
    socketio = require('socket.io'),
    http = require('http'),
    app = express(),
    _ = require('lodash'),
    server = http.createServer(app),
    io = socketio.listen(server),
    Mincer = require('mincer');

app.use(require('body-parser')());

app.use(express.static(__dirname + '/public'));

var environment = new Mincer.Environment();
environment.appendPath(__dirname + '/bower_components');
environment.appendPath(__dirname + '/javascripts');
environment.appendPath(__dirname + '/stylesheets');

app.use('/assets', Mincer.createServer(environment));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    key: 'sid',
    cookie: {
        secure: true
    }
}));

app.get('/', function(req, res, next) {
    res.render('index.html', doc)
});

var doc = {
    development: false,
    html: '',
    css: '',
    js: ''
};

app.post('/', function(req, res, next) {
    _.extend(doc, _.pick(req.body, ['html', 'css', 'js']));
    res.send(200, 'Got it!');
});

app.get('/preview', function(req, res, next) {
    res.render('preview.html', doc)
});

io.sockets.on('connection', function(socket) {
    socket.emit('news', {
        hello: 'world'
    });
    socket.on('html', function(html) {
        doc.html = html;
        socket.broadcast.emit('renderHtml', html);
    });
    socket.on('css', function(css) {
        doc.css = css;
        socket.broadcast.emit('renderCss', css);
    });
    socket.on('js', function(js) {
        doc.js = js;
        var t = +new Date();
        socket.broadcast.emit('renderJs', t);
    });
});

app.get('/js.js', function(req, res, next) {
    res.set('Content-Type', 'application/javascript');
    res.send(200, 'try{\n' + doc.js + '\n}catch(e){}');
});

server.listen(8000);
