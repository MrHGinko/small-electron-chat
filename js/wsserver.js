var ws = require('ws');

// host为开启webSocket Server的IP地址, 本地测试可用localhost 或 本机局域网地址
// 但测试需要至少2台同局域网下主机  只需要一台主机建立服务端即可
// main.js中 启用该服务的代码 只需要一台主机调用, 其他需要注释
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
                var str = JSON.stringify({
                    "name": data.name,
                    "type": data.type,
                    "msg": `${data.name} is coming, welcome to here ~`
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

wsServer.on('close', function () {
    console.log('webServer服务端GG了~');
})