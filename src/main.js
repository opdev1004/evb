const {
    app,
    BrowserWindow,
    ipcMain,
    session,
    Menu,
    dialog,
    globalShortcut
} = require('electron');
const path = require('path');
const url = require('url');
const dataPath = app.getPath('userData');

let mainWindow;

function createWindow() {
    const iconUrl = url.format({
      pathname: path.join(__dirname, 'icons/icon.ico'),
      protocol: 'file:',
      slashes: true
     });
  
    mainWindow = new BrowserWindow({
      title: "App",
      icon: iconUrl,
      width: 1280,
      height: 720,
      minWidth: 720,
      minHeight: 720,
      frame: true,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        preload: path.resolve(__dirname, 'preload/preload.js')
      }
    });
  
    /*
    const guiURL = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/gui/index.html'),
      protocol: 'file:',
      slashes: true
    });
    
    mainWindow.loadURL(guiURL);
    */

    mainWindow.loadURL("http://localhost:8080/");
    mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);
  
    mainWindow.on('closed', function () {
      if (process.platform !== 'darwin') {
        mainWindow = null;

        app.quit();
      }
    });
  
    
    mainWindow.webContents.on('new-window', function (e, theUrl) {
      e.preventDefault();
      // https:// http://
      let targetAddr = theUrl;
      let first7 = targetAddr.substring(0,7);
      let first8 = targetAddr.substring(0,8);
      if(first7 !== "http://" && first8 !== "https://")
      {
        targetAddr = "https://" + targetAddr;
      }
      require('electron').shell.openExternal(targetAddr);
    });
}

app.on('ready',()=>{
    createWindow();
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      mainWindow = null;
      app.quit();
    }
});
  
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});