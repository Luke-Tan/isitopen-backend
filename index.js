const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const MongoDB = require('./db/MongoDB.js')

const app = express();


app.set('port', process.env.PORT || process.env.NODE_ENV == 'staging'?3001:8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static( __dirname + '/public' ));
app.use(bodyParser.json());

/**
 * Simple route to send index.html
 * also, due to react's routing behaviour,
 * there needs to be an exception for * (all the routes)
 */
// app.get('/', function (request, response) {
// 	response.sendFile(path.resolve('./public/index.html'));
// });

// app.get('*', function (request, response) {
// 	response.sendFile(path.resolve('./public/index.html'));
// });

/**
 * Running NodeJS as a server
 */
const server = http.createServer(app);
const io = require('socket.io')(server);
let mobileSockets = {};

//Schedule the poll topic to be changed everyday everyday

io.on('connection', socket => {
	socket.on('login', subscribedCollections => {
		subscribedCollections.forEach(collection=>{
			if(mobileSockets[collection]){
				mobileSockets[collection].push(socket.id)
			} else {
				mobileSockets[collection] = [socket.id]
			}
		})
	});
})

app.io = io;
app.mobileSockets = mobileSockets

// Handles normal API routes first
require('./api/index')(app);

server.listen(app.get('port'), function() {
	console.log('Express server is listening on ' + app.get('port'));
});