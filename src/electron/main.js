const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { createMainWindow, createNewPadWindow, windowRegistry } = require('./windows');
const { registerShortcuts } = require('./shortcuts');
const isDev = process.env.NODE_ENV === 'development';

app.disableHardwareAcceleration();

app.whenReady().then(() => {
    createMainWindow();
    registerShortcuts();
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

ipcMain.on('toggle-pin', (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (!window) return;
    
    // to get main window ID
    const winType = windowRegistry.get(window.id); 
    if (winType === 'main') {
        return; // Do nothing for the main window
    }

    //pinned logic
    const isCurrentlyPinned = window.isAlwaysOnTop();
    const newPinnedState = !isCurrentlyPinned; // Toggle pin state
    window.setAlwaysOnTop(newPinnedState);
    window.setOpacity(newPinnedState ? 0.8 : 1);
    event.sender.send('pin-state-changed', newPinnedState); // Send updated state

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
