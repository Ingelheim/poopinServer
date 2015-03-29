var socket = io.connect('http://rocky-spire-9621.herokuapp.com:80');
    socket.emit('webListener', { my: 'data' });

    socket.on('updatePoopinStats', function (data) {
        model.calculateNewTotals(data);
    });

