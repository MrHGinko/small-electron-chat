// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge } = require('electron');

// 需要通过preload 暴露出去给renderer使用
// renderer在5.0以后版本, 已经不能直接使用node的api了
contextBridge.exposeInMainWorld('myAPI', {
    sayHello: () => {
        document.write('hello Dev!');
        console.log(process);
        alert('process: ' + process.version);
    }
})
