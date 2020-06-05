const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const LCUConnector = require('lcu-connector');
const got = require('got');
const { autoUpdater } = require('electron-updater');

const connector = new LCUConnector('');

let clientData = {};
let win;
let auth;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.removeMenu();

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
    connector.on('connect', async (lcuInfo) => {
      clientData = {
        username: lcuInfo.username,
        password: lcuInfo.password,
        address: lcuInfo.address,
        port: lcuInfo.port,
      };

      auth =
        'Basic ' +
        Buffer.from(`${clientData.username}:${clientData.password}`).toString(
          'base64'
        );

      // Get summoners basic info
      const summonerLogin = await got.get(
        `https://${clientData.address}:${clientData.port}/lol-summoner/v1/current-summoner`,
        {
          headers: {
            Authorization: auth,
          },
          rejectUnauthorized: false,
        }
      );
      win.webContents.send('summonerLogin', JSON.parse(summonerLogin.body));

      // Get summoners profile information
      const summonersProfileInfo = await got.get(
        `https://${clientData.address}:${clientData.port}/lol-summoner/v1/current-summoner/summoner-profile`,
        {
          headers: {
            Authorization: auth,
          },
          rejectUnauthorized: false,
        }
      );
      win.webContents.send(
        'summonersProfileInfo',
        JSON.parse(summonersProfileInfo.body)
      );

      const summonerRankInfo = await got.get(
        `https://${clientData.address}:${clientData.port}/lol-ranked/v1/current-ranked-stats`,
        {
          headers: {
            Authorization: auth,
          },
          rejectUnauthorized: false,
        }
      );
      win.webContents.send(
        'summonerRankInfo',
        JSON.parse(summonerRankInfo.body)
      );
    });
    connector.start();
  });
  autoUpdater.checkForUpdatesAndNotify();
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
autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
