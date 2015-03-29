var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 8080;
var _ = require('lodash');

var currentPoopinCount = {
    "total": 0,
    "continents": {
        "Europe": 0,
        "N. America": 0,
        "S. America": 0,
        "Asia": 0,
        "Africa": 0,
        "Australia": 0
    }
};

var socketsPerContinent = {
    "Europe": [],
    "N. America": [],
    "S. America": [],
    "Asia": [],
    "Africa": [],
    "Australia": []
};


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

function recalculateTotals() {
    _.each(socketsPerContinent, function (value, continent) {
        currentPoopinCount.continents[continent] = value.length;
    });
}

function recalculateTotalsFor(continent) {
    currentPoopinCount.continents[continent] = socketsPerContinent[continent].length;
}

function recalculateTotal() {
    var total = 0;

    _.each(currentPoopinCount.continents, function (value, key) {
        total = total + value;
    });

    currentPoopinCount.total = total
}

function registerPooper(data, mySocket) {
    var continent = data["continent"];
    var socketUid = mySocket.id;

    socketsPerContinent[continent].push(socketUid);

    recalculateTotals();
    recalculateTotal();
}

function deRegisterPooper(data, mySocket) {
    var continent = data["continent"];
    var socketUid = mySocket.id;

    _.remove(socketsPerContinent[continent], function(n) {return n === socketUid;});

    recalculateTotalsFor(continent);
    recalculateTotal();
}

function send() {
    io.emit("updatePoopinStats", currentPoopinCount)
}

setInterval(function () {
    send();
}, 3000);

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on('webListener', function (data) {
            console.log("initial connection of webListener");
//            registerPooper(data, socket);
        });

    socket.on('initialConnection', function (data) {
        console.log("initial connection");
        registerPooper(data, socket);
    });

    socket.on('disconnecting', function (data) {
        console.log("connection lost");
        deRegisterPooper(data, socket)
    });
});


console.log("listening onf " + port)
server.listen(port);