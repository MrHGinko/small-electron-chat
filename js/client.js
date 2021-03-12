var $ = function (v) {
    return document.querySelector(v);
};

(function () {
    var wsObj = null;
    var bb = $('#msg');

    //发送信息
    function sendMsg() {
        var msg = bb.value;
        var name = $("#name").value;

        if (name == "" || name == null) {
            alert("请设置您的昵称！");
            return;
        }
        if (msg == "") {
            alert("消息不能为空！");
            return;
        }
        var type = "chatInfo";
        var obj = { "name": name, "msg": msg, "type": type };
        wsObj.send(JSON.stringify(obj));
        bb.value = "";
    }

    $("#setName").addEventListener('click', function () {
        name = $("#name").value;
        if (name == "" || name == null || name == " ") {
            alert('昵称不合法！');
            return;
        }

        var name = $("#name").value;
        var msg = name + "已上线......"
        var type = "login";
        var obj = { "name": name, "msg": msg, "type": type };

        wsObj.send(JSON.stringify(obj));
    })

    wsObj = new WebSocket("ws://192.168.4.96:8801");   //建立连接
    wsObj.onopen = function () {  //发送请求
        console.log("连接状态", wsObj);
    };

    wsObj.onmessage = function (e) {  //获取后端响应
        var data = JSON.parse(e.data);
        console.log(data, 'ws message广播数据');

        switch (data.type) {
            case 'login':
                var msg = data.msg;

                break;
            case 'chatInfo':
                var name = data.name;
                var msg = data.msg;
                break;

            case 'logout':
                var msg = data.msg;
                var msg = data.msg;

                break;
            default:
                break;
        }

    };
    wsObj.onclose = function (e) {
        console.log(e, '关闭连接');
    };
    wsObj.onerror = function (e) {
        console.log("error");
    };

    $("#send").onclick = function () {
        //send:
        sendMsg();
    };
})();