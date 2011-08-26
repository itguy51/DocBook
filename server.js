  var app = require('express').createServer()
  , io = require('socket.io').listen(app)
  , ueberDB = require("ueberDB");

var db = new ueberDB.database("sqlite", {filename:"active/data.db"});
db.init(function (err)
{
  if(err) 
  {
    console.error(err);
    process.exit(1);
  }

  //set a object as a value
  //can be done without a callback, cause the value is immediately in the buffer
 
  
  //get the object
  


app.listen(2004);

app.get('/e/:teg', function (req, res) {
  //res.sendfile(__dirname + '/index.html');
  res.render('index.ejs', {
        layout:false,
        locals: {padid : req.params.teg }
    });

});
app.get('/static/:file', function(req, res){
res.sendfile(__dirname + '/static/' + req.params.file + '');
});
app.get('/static/stylesheets/:file', function(req, res){
res.sendfile(__dirname + '/static/stylesheets/' + req.params.file + '');
});
app.get('/static/lib/:file', function(req, res){
res.sendfile(__dirname + '/static/lib/' + req.params.file + '');
});
app.get('/', function(req, res){
res.sendfile(__dirname + '/home.html');
});
app.get('/p/:teg', function (req, res) {
  //res.sendfile(__dirname + '/index.html');
  res.render('view.ejs', {
        layout:false,
        locals: {padid : req.params.teg }
    });

});
io.sockets.on('connection', function (socket) {
  var json = null;
  var padid = null;
    socket.on('gettext', function (data) {
       db.get(data.ident, function(err, value){
        var json = {data: value.html, ident: data.ident};
            socket.emit('databuffer', json);
            
       });
       });

  io.sockets.emit('connls', { status: 'ok' });
  socket.on('postdata', function (data) {
       db.set(data.ident, {html: data.data});

    socket.broadcast.emit('databuffer', json);

  });
});
});
