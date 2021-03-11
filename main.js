const { app, BrowserWindow } = require('electron')
const path = require('path')

app.on('ready', () => {
    console.log("it's ready~");
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 540,
        // webPreferences:{
        //     nodeIntegration: true,
        //     contextIsolation: false,
        // }
        // 以上配置 nodeIntegration: 开启node  contextIsolation: 上下文隔离(关)
        // 在5.0以后版本如果只开启nodeIntegration 那么renderer中仍无法进行node api的使用
        // 需要配合 contextIsolation: false 

        // 以下是目前的正常使用, 需要通过preload进行一次中转, 通过自定义暴露api出去给renderer进行调用
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegrationInSubFrames: true
        }
    })

    mainWindow.loadFile('index.html');

    const secondWindow = new BrowserWindow({
        width: 400,
        height: 220,
        parent: mainWindow
    })

    secondWindow.loadFile('second.html')
})