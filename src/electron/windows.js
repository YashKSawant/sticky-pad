const { BrowserWindow } = require('electron');
const path = require('path');
// Using map to keep track of open pad windows
const windowRegistry = new Map(); 

/**
 * @description This method is used to create main window
 */
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 800,
        title: "Sticky Pad",
        frame: false,
        icon: path.join(__dirname, '../../public/icon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    windowRegistry.set(mainWindow.id, 'main')
    mainWindow.setMenu(null); // Remove the menu bar
    const isDev = process.env.NODE_ENV === 'development';

    // Load the app's index.html
    if (isDev) {
        mainWindow.loadURL('http://localhost:4200');
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/sticky-pad/browser/index.html'));
    }

    if (isDev) {
        // mainWindow.webContents.openDevTools();
    }
    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.send('set-win-type', 'main'); // Send to renderer
    });

    mainWindow.on('closed', () => {
        windowRegistry.delete(mainWindow.id);
    });
}

/**
 * @description This method is used to create new pad window
 * @param {*} padData 
 */
function createNewPadWindow(padData) {
    let padWindow = new BrowserWindow({
        width: 350,
        height: 500,
        modal: true,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true, // Ensure preload security
            preload: path.join(__dirname, 'preload.js') // Ensure window.electronAPI works
        }
    });

    padWindow.setMenu(null);
    padWindow.setIcon(path.join(__dirname, '../../public/icon.ico'));

    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        padWindow.loadURL('http://localhost:4200/pad');
    } else {
        padWindow.loadFile(path.join(__dirname, '../dist/sticky-pad/browser/index.html'), {
            hash: 'pad'
        });
    }

    padWindow.webContents.once('did-finish-load', () => {
        padWindow.webContents.send('init-pad', padData || {});
        padWindow.webContents.send('set-win-type', 'pad'); // Send to renderer
    });

    windowRegistry.set(padWindow.id, padWindow);

    // padWindow.webContents.openDevTools();
    // Handle window close
    padWindow.on('closed', () => {
        windowRegistry.delete(padWindow.id);
    });
}

module.exports = { createMainWindow, createNewPadWindow ,windowRegistry };
