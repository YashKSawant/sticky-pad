const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { createMainWindow, createNewPadWindow } = require('./windows');
const isDev = process.env.NODE_ENV === 'development';

app.disableHardwareAcceleration();

app.on('ready', createMainWindow);

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
    const title = BrowserWindow.getFocusedWindow()?.getTitle();
    event.returnValue = title;
});

ipcMain.on('open-new-pad-window', (event, padData) => {
    createNewPadWindow(padData);
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
