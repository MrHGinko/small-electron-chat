var os = require("os");
var networkArr = os.networkInterfaces();

// 这里 以太网 取决于当前主机的网络适配器的命名,
// macOS 会是 en4(来自我同事的主机)  而我当前使用的主机则名为 以太网.
// name获取 来判断消息的来源, 以此来区分他人与自己的消息, 并体现在界面上.
// self消息框会在右边, 而他人则会在左边
const name = networkArr['以太网'][networkArr['以太网'].length - 1]?.address;
const host = "ws://192.168.4.96:8801"

console.log("hey, Your name is ", name);

const form = phone.querySelector('.phone__form');

(function () {
    var wsObj = null;

    wsObj = new WebSocket(host);   //建立连接
    wsObj.onopen = function () {  //发送请求
        console.log("OK, it's connect success ~");
        var msg = name + "已上线......"
        var type = "login";
        var obj = { "name": name, "msg": msg, "type": type };
        wsObj.send(JSON.stringify(obj));
    };

    wsObj.onmessage = function (e) {  //获取后端响应
        var data = JSON.parse(e.data);
        console.log(data, 'ws message广播数据');

        switch (data.type) {
            case 'login':
                var msg = data.msg;
                addMessageChild(msg)
                break;
            case 'chatInfo':
                var msg = data.msg;
                var getName = data.name;
                addMessageChild(msg, getName == name);
                break;

            case 'logout':
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // submit事件触发, 发送消息 但是添加子元素不在这 而在ws中
        let value = form.querySelector('input').value;
        var obj = { "name": name, "msg": value, "type": "chatInfo" };
        wsObj.send(JSON.stringify(obj));
    });

    function addMessageChild(inValue, self = true) {
        let value = inValue || form.querySelector('input').value;

        if (value) {
            // const chat = phone.querySelector('.phone__chat');
            const chat = phone.querySelector('#wrap');
            const message = document.createElement('p');
            message.classList.add('chat--message');
            self && message.classList.add('self');
            message.textContent = value;
            chat.appendChild(message);
            setTimeout(() => {
                chat.scroll(0, chat.scrollHeight - chat.offsetHeight)
            }, 60);
        }
        form.reset();
    }
})();
