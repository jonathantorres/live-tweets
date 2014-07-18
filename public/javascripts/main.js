var serverName = $('body').data('io-host'),
    socket = io.connect(serverName),
    liveTweetsTable = $('.live-tweets');

socket.on('tweet', function (data) {
    var markup = '';
    markup += '<tr>';
    markup +=    '<td>';
    markup +=       '<img src="' + data.tweet.profileImage + '" width="75" height="75">';
    markup +=    '</td>';
    markup +=    '<td>';
    markup +=       data.tweet.username;
    markup +=    '</td>';
    markup +=    '<td>';
    markup +=       data.tweet.text;
    markup +=    '</td>';
    markup += '</tr>';

    liveTweetsTable.find('tbody').prepend(markup);
});
