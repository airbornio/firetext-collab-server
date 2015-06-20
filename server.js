//var app = require('express')();

/*var server = app.listen(process.env.PORT || 8080, function() {
	console.log('Listening on port %d', server.address().port);
});*/

var app = require('http').createServer(function(req, res) {
	res.writeHead(404);
});

var io = require('socket.io')(app);

console.log(io.origins());

io.on('connection', function(socket) {
	socket.emit('hello', '/push/' + socket.id + '/');
	socket.on('collab-message', function(msg) {
		socket.broadcast.emit('collab-message', msg);
	});
});

var server = app.listen(process.env.PORT || 8080, function() {
	console.log('Listening on port %d', server.address().port);
});


/*app.use('/push/', bodyParser.urlencoded({type: [], extended: false, limit: 100, parameterLimit: 1}));

app.put('/push/:id/', function(req, res) {
	console.log(req.body);
	io.to(req.params.id).emit('push', {
		registrationId: req.query.registrationId,
		version: parseInt(req.body.version, 10)
	});
	res.send(200);
});*/