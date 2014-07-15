var socket = io.connect('http://localhost');

socket.on('tweet', function (data) {
    console.log(data);
});
