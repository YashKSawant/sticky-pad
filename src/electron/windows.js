const { BrowserWindow, app } = require('electron');
const path = require('path');

const windowRegistry = new Map(); // Store window types by ID

let mainWindow = null;

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
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    windowRegistry.set(mainWindow.id, 'main')
    mainWindow.setMenu(null); // Remove the menu bar
    const isDev = process.env.NODE_ENV === 'development';

    const appPath = isDev
        ? 'http://localhost:4200'
        : `file://${path.join(app.getAppPath(), 'dist', 'sticky-pad', 'browser', 'index.html')}`;
    mainWindow.loadURL(appPath);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.send('set-win-type', 'main'); // Send to renderer
    });

    mainWindow.on('closed', () => {
        windowRegistry.delete(mainWindow.id);
        mainWindow = null;
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

    const isDev = !app.isPackaged;
    const padURL = isDev
        ? 'http://localhost:4200/pad'
        : `file://${path.join(app.getAppPath(), 'dist', 'sticky-pad', 'browser', 'index.html')}#pad`;

    padWindow.loadURL(padURL, {
        extraHeaders: 'pragma: no-cache\n'
    });
    padWindow.webContents.once('did-finish-load', () => {
        padWindow.webContents.send('init-pad', padData || {});
        padWindow.webContents.send('set-win-type', 'pad'); // Send to renderer
    });

    windowRegistry.set(padWindow.id, 'pad');

    if (isDev) {
        padWindow.webContents.openDevTools();
    }
    // Handle window close
    padWindow.on('closed', () => {
        windowRegistry.delete(padWindow.id);
    });
}

module.exports = { createMainWindow, createNewPadWindow ,windowRegistry };
