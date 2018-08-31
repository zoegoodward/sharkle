'use strict';

const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
  // create the browser window
  mainWindow = new BrowserWindow({width: 300, height: 275, skipTaskbar: true, frame: false, transparent: true, hasShadow: false, resizable: false});

  // load the index.html of the app
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const setupTray = () => {
  let contents = mainWindow.webContents;
  // setup tray
  tray = new Tray(path.join(__dirname,'./images/icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'About', click() {
      console.log('About button clicked');
      electron.dialog.showMessageBox({
        type: 'info', 
        icon: './images/icon.png',
        title: 'Sharkle',
        message: 'Sharkle is an Electron app based on the game Night in the Woods.',
        detail: 'Author: Celestial Crumpets',
        buttons: ['Close']
      });
    }},
    
    {label: 'Website', click() {
      console.log('Website clicked');
      electron.shell.openExternal('https://github.com/crazy-calypso/sharkle');
    }},
    {type: 'separator'},
    {label: 'Invert Colours', type: 'checkbox', checked: false, click() {
      console.log('Invert Colours clicked');
      contents.executeJavaScript('invertColour()');
    }},
    {label: 'Invert Direction', type: 'checkbox', checked: false, click() {
      console.log('Invert Direction clicked');
      contents.executeJavaScript('invertDirection()');
    }},
    {type: 'separator'},
    {label: 'Exit', click() {
      console.log('Exit button clicked');
      app.quit();
    }}
  ]);
  tray.setToolTip('Hey! It\'s Sharkle!');
  tray.setPressedImage(path.join(__dirname,'./images/iconPressed.png'));
  tray.setContextMenu(contextMenu);
};

let tray = null;

app.on('ready', () => {
  createWindow();
  // hide dock icon
  if (process.platform === 'darwin') {
    app.dock.hide();
  }
  setupTray();
  console.log('Sharkle is ready to serve in menu bar.');
});

// quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});