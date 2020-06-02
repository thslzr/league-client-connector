const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const LCUConnector = require('lcu-connector');
const got = require('got');

const connector = new LCUConnector('');

let clientData = {};

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // Open the DevTools.
  // win.webContents.openDevTools();

  win.webContents.on('did-finish-load', () => {
    console.log('Electron-finished-loading');
    win.webContents.send(
      'Electron-finished-loading',
      'Test send function from electron'
    );
    connector.on('connect', async (lcuInfo) => {
      clientData = {
        username: lcuInfo.username,
        password: lcuInfo.password,
        address: lcuInfo.address,
        port: lcuInfo.port,
      };
    });
    connector.start();
  });

  ipcMain.on('button-click', async (event, arg) => {
    const auth =
      'Basic ' +
      new Buffer(`${clientData.username}:${clientData.password}`).toString(
        'base64'
      );

    const response = await got.get(
      `https://${clientData.address}:${clientData.port}/lol-summoner/v1/current-summoner`,
      {
        headers: {
          Authorization: auth,
        },
        rejectUnauthorized: false,
      }
    );
    win.webContents.send('summoner-data', JSON.parse(response.body));
    console.log(response);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.