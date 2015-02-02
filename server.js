var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var port = process.env.PORT || 8080;
var _ = require('lodash');

var currentContinentData = {
    total : 0,
    continents: {
        "Europe": 0,
        "N. America": 0,
        "S. America": 0,
        "Asia": 0,
        "Africa": 0,
        "Australia": 0
    }
};

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

function randomNumber() {
    return Math.ceil((Math.random() * 1000 ) + 1)
}

function registerPooper(data) {
    console.log(data)

    currentContinentData.continents[data["continent"]]++;
    var total = currentContinentData.total;

    _.each(currentContinentData.continents, function(value, key) {
        total = total + value
    });
}

function send() {
    //var data = {
    //    total : "",
    //    continents: {
    //        "Europe": randomNumber(),
    //        "N. America": randomNumber(),
    //        "S. America": randomNumber(),
    //        "Asia": randomNumber(),
    //        "Africa": randomNumber(),
    //        "Australia": randomNumber()
    //    }
    //};

    io.emit("updatePoopinStats", currentContinentData)
}

setInterval(function(){ send(); }, 3000);

io.on('connection', function (socket) {
    console.log("connection");

    socket.on('initialConnection', function (data) {
        registerPooper(data);
        setInterval(function(){ send(); }, 3000);
    });
});

server.listen(port);