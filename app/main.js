'use strict';

// Import electron
const electron = require('electron');
const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');
const url = require('url');

// Declare window and tray objects
let window = null;
let tray = null;

// Get platform
let platform = process.platform;

// Don't show the app in the doc on Mac OS
if (platform === 'darwin') {
  app.dock.hide();
}

// Determine appropriate icon for platform
let trayImage;
let imageFolder = __dirname + '/images/icons/';

if (platform === 'darwin') {
  trayImage = imageFolder + 'osx/icon.png';
} else if (platform === 'win32') {
  trayImage = imageFolder + 'win/icon.ico';
}

// Create main window
const createWindow = () => {
  // Create the browser window
  window = new BrowserWindow({width: 300, height: 290, frame: false, resizable: false, hasShadow: false, transparent: true, fullscreenable: false, maximizable: false, skipTaskbar: true});

  // load the index.html of the app
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object
    window = null;
  });
};

// Create tray menu
const createTray = () => {
  tray = new Tray(path.join(trayImage));  
  let contextMenu = Menu.buildFromTemplate([
    {
      label: 'About',  click() {
        electron.dialog.showMessageBox({
          type: 'info',
          icon: imageFolder + 'about.png',
          title: 'Sharkle',
          message: 'Electron Sharkle',
          detail: 'Sharkle is an Electron app based on the game Night in the Woods.\nAuthor: Zoe Goodward',
          buttons: ['Close']
        });
      }           
    },
    {
      label: 'Website', click() {
        electron.shell.openExternal('https://github.com/crazy-calypso/sharkle');
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Invert Colour', type: 'checkbox', checked: false, click() {
        window.webContents.executeJavaScript('invertColour()');
      }
    },
    {
      label: 'Invert Direction', type: 'checkbox', checked: false, click() {
        window.webContents.executeJavaScript('invertDirection()');
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit', click() {
        app.quit();
      }
    }
  ]);
  if (platform === 'darwin') {
    tray.setPressedImage(imageFolder + 'osx/iconPressed.png');
  }
  tray.setToolTip('Hey! It\'s Sharkle!');
  tray.setContextMenu(contextMenu);
};

app.on('ready', () => {
  createTray();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});