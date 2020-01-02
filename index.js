const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const MongoDB = require("./db/MongoDB.js");

const app = express();

app.set("port", process.env.PORT || 8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/build"));
app.use(bodyParser.json());

  console.log(process.env.NODE_ENV);
/**
 * Simple route to send index.html
 * also, due to react's routing behaviour,
 * there needs to be an exception for * (all the routes)
 */

/**
 * Running NodeJS as a server
 */
const server = http.createServer(app);
const io = require("socket.io")(server);

//Schedule the poll topic to be changed everyday everyday
io.on("connection", socket => {
  socket.on("initialSubscription", collectionIds => {
    try {
      collectionIds.forEach(collectionId => {
        // Join the collection room to receive all updates to this collection in real time
        socket.join(collectionId);
      });
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("subscription", collection => {
    socket.join(collection);
  });
});

//Bind io to app for access at the api level
app.io = io;
// Handles normal API routes first
require("./api/index")(app);

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});



server.listen(app.get("port"), function() {
  console.log("Express server is listening on " + app.get("port"));
});
