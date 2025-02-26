const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { createMainWindow, createNewPadWindow } = require('./windows');
const isDev = process.env.NODE_ENV === 'development';

app.disableHardwareAcceleration();

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

//#region  IPC event listeners 
ipcMain.on('get-window-title', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    event.returnValue = window ? window.getTitle() : 'Unknown';
});

ipcMain.on('open-new-pad-window', (event, padData) => {
    createNewPadWindow(padData);
});

ipcMain.on('minimize-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window) window.minimize();
});

ipcMain.on('maximize-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window) {
        if (window.isMaximized()) {
            window.unmaximize();
        } else {
            window.maximize();
        }
    }
});

ipcMain.on('close-window', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window) window.close();
});
//#endregion

// Preload paths if required
app.whenReady().then(() => {
    if (isDev) {
        console.log('Running in Development Mode');
    } else {
        console.log('Running in Production Mode');
    }
});
