var ws = require('ws');

var wsServer = new ws.Server({
    host: "192.168.4.96",
    port: "8801",
});

console.log('Oops, its work on port 8801');

wsServer.boardcast = function (str) {
    wsServer.clients.forEach(function (client) {
        client.send(str);
    });
}

wsServer.on('connection', function (ws) {
    ws.on('message', function (obj) {
        var data = JSON.parse(obj);
        switch (data.type) {
            case 'login':
                console.log('Oops, someone is coming, who is he/she ?');
                var str = JSON.stringify({
                    "name": data.name,
                    "type": data.type
                });
                wsServer.boardcast(str);
                break;
            case 'chatInfo':
                var str = JSON.stringify({
                    "name": data.name,
                    "msg": data.msg,
                    "type": data.type
                });
                wsServer.boardcast(str);
                break;
            default: break;
        }
    });

    ws.on('close', function (obj) {
        try {
            console.log('from server: close');
            console.log(this);

            var str = JSON.stringify({
                "msg": "someone is log out, say goodbye, good luck! ......",
                "type": "logout"
            });
            wsServer.boardcast(str);
        }
        catch (e) {
            console.log(e);
        }
    });
})